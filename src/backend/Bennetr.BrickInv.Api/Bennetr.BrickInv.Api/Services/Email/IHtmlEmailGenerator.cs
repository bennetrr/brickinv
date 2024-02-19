namespace Bennetr.BrickInv.Api.Services.Email;

public interface IHtmlEmailGenerator
{
    string Generate(string body, string footerAdditions);
}
