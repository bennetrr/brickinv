namespace Bennetr.BrickInv.Api.Requests;

public class CreateSetRequest
{
    public string SetId { get; set; } = string.Empty;

    public bool ForSale { get; set; }
}
