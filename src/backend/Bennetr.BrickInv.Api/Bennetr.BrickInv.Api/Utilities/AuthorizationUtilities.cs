using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;

namespace Bennetr.BrickInv.Api.Utilities;

public class AuthorizationUtilities
{
    private static readonly HttpContext? HttpContext = new HttpContextAccessor().HttpContext;
    private static readonly JwtSecurityTokenHandler JwtHandler = new();

    public static async Task<string> GetOrganizationOrUserId()
    {
        if (HttpContext == null) throw new Exception("GetOrganizationOrUserId called outside of a HTTP context");

        var token = await HttpContext.GetTokenAsync("Bearer", "access_token");
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
