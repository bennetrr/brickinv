using System.Net;
using System.Net.Mime;
using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Options;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.Api.Utilities;
using Bennetr.RebrickableDotNet;
using Bennetr.RebrickableDotNet.Models.Minifigs;
using Bennetr.RebrickableDotNet.Models.Parts;
using Bennetr.RebrickableDotNet.Models.Sets;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Part = Bennetr.BrickInv.Api.Models.Part;

namespace Bennetr.BrickInv.Api.Controllers;

[Route("[controller]s")]
[ApiController]
[Authorize]
public partial class SetController(
    BrickInvContext context,
    IRebrickableClient rebrickable,
    IOptions<AppOptions> options) : ControllerBase
{
    private readonly AppOptions _options = options.Value;

    /// <summary>
    ///     Return all sets from groups where the current user is the owner or a member.
    /// </summary>
    /// <response code="200">Returns all sets.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SetDto>>> GetSets()
    {
        var organizationOrUserId = await AuthorizationUtilities.GetOrganizationOrUserId(HttpContext);

        var sets = await context.Sets
            .Where(x => x.OrganizationOrUserId == organizationOrUserId)
            .ToListAsync();

        return sets.Adapt<List<SetDto>>();
    }

    /// <summary>
    ///     Return the set with the specified id.
    /// </summary>
    /// <response code="200">Returns the set with the specified id.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the set was not found.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{setId}")]
    public async Task<ActionResult<SetDto>> GetSet([FromRoute] string setId)
    {
        var organizationOrUserId = await AuthorizationUtilities.GetOrganizationOrUserId(HttpContext);

        var set = await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.OrganizationOrUserId == organizationOrUserId)
            .FirstAsync();

        return set.Adapt<SetDto>();
    }

    /// <summary>
    ///     Create a set by fetching the information from Rebrickable.
    /// </summary>
    /// <remarks>
    ///     The LEGO set IDs are simple numbers, but the Rebrickable set ID always has a suffix like `-1`.
    ///     Since the suffix is not printed on the LEGO instructions, most users will omit it when creating a new set.
    ///     This POST endpoint checks if the submitted ID already has a suffix, and if not, append `-1` to it.
    ///     The application wide API key for Rebrickable can be overridden by the group and by the user.
    ///     In case both group and user specified an API key, the key of the user is used.
    /// </remarks>
    /// <response code="201">Returns the created set.</response>
    /// <response code="401">
    ///     If the authentication token is not valid.
    /// </response>
    /// <response code="404">With message `rebrickableSetNotFound`: If the set was not found on Rebrickable.</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPost]
    public async Task<ActionResult<SetDto>> CreateSet([FromBody] CreateSetRequest request)
    {
        // Prepare the set id
        var setId = request.SetId.Trim();
        setId = setId.Contains('-') ? setId : $"{setId}-1";

        // Get the set from Rebrickable
        Set rebrickableSet;
        SetParts rebrickableParts;
        SetMinifigs rebrickableMinifigs;

        try
        {
            rebrickableSet = await rebrickable.GetSetAsync(_options.RebrickableApiKey, setId);
            rebrickableParts = await rebrickable.GetSetPartsAsync(_options.RebrickableApiKey, setId);
            rebrickableMinifigs = await rebrickable.GetSetMinifigsAsync(_options.RebrickableApiKey, setId);
        }
        catch (HttpRequestException exc)
        {
            if (exc.StatusCode == HttpStatusCode.NotFound) return NotFound("rebrickableSetNotFound");

            throw;
        }

        var organizationOrUserId = await AuthorizationUtilities.GetOrganizationOrUserId(HttpContext);

        var set = new Models.Set
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.Now,
            Updated = DateTime.Now,
            SetId = rebrickableSet.SetNum,
            SetName = rebrickableSet.Name,
            ReleaseYear = rebrickableSet.Year,
            ImageUri = new Uri(rebrickableSet.SetImgUrl),
            PresentParts = 0,
            Finished = false,
            ForSale = request.ForSale,
            OrganizationOrUserId = organizationOrUserId
        };

        var parts = rebrickableParts.Results
            .Where(x => !x.IsSpare)
            .Select(x => new Part
            {
                Id = Guid.NewGuid().ToString(),
                Set = set,
                Created = DateTime.Now,
                Updated = DateTime.Now,
                PartId = x.Part.PartNum,
                PartName = x.Part.Name,
                PartColor = x.Color.Name,
                ImageUri = x.Part.PartImgUrl is null ? null : new Uri(x.Part.PartImgUrl),
                TotalCount = x.Quantity,
                PresentCount = 0
            })
            .Concat(rebrickableMinifigs.Results.Select(x => new Part
                {
                    Id = Guid.NewGuid().ToString(),
                    Set = set,
                    Created = DateTime.Now,
                    Updated = DateTime.Now,
                    PartId = x.SetNum,
                    PartName = x.SetName,
                    ImageUri = new Uri(x.SetImgUrl),
                    TotalCount = x.Quantity,
                    PresentCount = 0
                }))
            .ToList();

        set.TotalParts = parts.Select(x => x.TotalCount).Sum();

        context.Sets.Add(set);
        context.Parts.AddRange(parts);
        await context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetSet),
            new { setId = set.Id },
            set.Adapt<SetDto>()
        );
    }

    /// <summary>
    ///     Delete the set with the specified id and its parts.
    /// </summary>
    /// <response code="204">If the set was deleted successfully.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the set was not found.</response>
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpDelete("{setId}")]
    public async Task<IActionResult> DeleteSet([FromRoute] string setId)
    {
        var organizationOrUserId = await AuthorizationUtilities.GetOrganizationOrUserId(HttpContext);

        var set = await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.OrganizationOrUserId == organizationOrUserId)
            .FirstAsync();

        context.Sets.Remove(set);

        var parts = await context.Parts
            .Where(x => x.Set.Id == setId)
            .ToListAsync();

        context.Parts.RemoveRange(parts);

        await context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    ///     Update the set with the specified id.
    /// </summary>
    /// <response code="202">Returns the updated set.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the set was not found.</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType<SetDto>(StatusCodes.Status202Accepted)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPatch("{setId}")]
    public async Task<ActionResult<SetDto>> UpdateSet([FromRoute] string setId, [FromBody] UpdateSetRequest request)
    {
        var organizationOrUserId = await AuthorizationUtilities.GetOrganizationOrUserId(HttpContext);

        var set = await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.OrganizationOrUserId == organizationOrUserId)
            .FirstAsync();

        set.Updated = DateTime.Now;
        set.ForSale = request.ForSale;

        await context.SaveChangesAsync();
        return AcceptedAtAction(
            nameof(GetSet),
            new { setId = set.Id },
            set.Adapt<SetDto>()
        );
    }
}
