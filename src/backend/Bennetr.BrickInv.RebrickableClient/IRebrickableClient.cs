using Bennetr.BrickInv.RebrickableClient.Models.Minifigs;
using Bennetr.BrickInv.RebrickableClient.Models.Parts;
using Bennetr.BrickInv.RebrickableClient.Models.Sets;
using SixLabors.ImageSharp;

namespace Bennetr.BrickInv.RebrickableClient;

public interface IRebrickableClient
{
    Task<Set> GetSetAsync(string apiKey, string setId);

    Task<IEnumerable<SetPart>> GetSetPartsAsync(string apiKey, string setId);

    Task<IEnumerable<Minifig>> GetSetMinifigsAsync(string apiKey, string setId);

    Task<Size?> GetImageDimensionsAsync(string? url);
}
