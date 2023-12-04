using Bennetr.Lego.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.Lego.Api.Controllers;

[Route("sets")]
[ApiController]
public class LegoSetsController : ControllerBase
{
    private readonly LegoContext _context;

    public LegoSetsController(LegoContext context)
    {
        _context = context;
    }

    // GET: api/LegoSets
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<LegoSet>>> GetLegoSets()
    {
        if (_context.LegoSets == null) return NotFound();
        return await _context.LegoSets.ToListAsync();
    }

    // GET: api/LegoSets/5
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<LegoSet>> GetLegoSet(string id)
    {
        if (_context.LegoSets == null) return NotFound();
        var legoSet = await _context.LegoSets.FindAsync(id);

        if (legoSet == null) return NotFound();

        return legoSet;
    }

    // PUT: api/LegoSets/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutLegoSet(string id, LegoSet legoSet)
    {
        if (id != legoSet.Id) return BadRequest();

        _context.Entry(legoSet).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!LegoSetExists(id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // POST: api/LegoSets
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<LegoSet>> PostLegoSet(LegoSet legoSet)
    {
        if (_context.LegoSets == null) return Problem("Entity set 'LegoContext.LegoSets'  is null.");
        _context.LegoSets.Add(legoSet);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (LegoSetExists(legoSet.Id))
                return Conflict();
            throw;
        }

        return CreatedAtAction(nameof(GetLegoSet), new { id = legoSet.Id }, legoSet);
    }

    // DELETE: api/LegoSets/5
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteLegoSet(string id)
    {
        if (_context.LegoSets == null) return NotFound();
        var legoSet = await _context.LegoSets.FindAsync(id);
        if (legoSet == null) return NotFound();

        _context.LegoSets.Remove(legoSet);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool LegoSetExists(string id)
    {
        return (_context.LegoSets?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
