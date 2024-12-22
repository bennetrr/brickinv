using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;

namespace Bennetr.BrickInv.Api.Extensions;

public static class HttpContextExtensions
{
    private static readonly JwtSecurityTokenHandler JwtHandler = new();

    public static async Task<string> GetOrganizationOrUserId(this HttpContext httpContext)
    {
        var token = await httpContext.GetTokenAsync("Bearer", "access_token");
        var jwt = JwtHandler.ReadJwtToken(token);

        try
        {
            return jwt.Claims.First(claim => claim.Type == "org_id").Value;
        }
        catch (InvalidOperationException)
        {
            return jwt.Subject;
        }
    }
}
