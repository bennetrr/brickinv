using Bennetr.RebrickableDotNet.Models.Minifigs;
using Bennetr.RebrickableDotNet.Models.Parts;
using Bennetr.RebrickableDotNet.Models.Sets;
using SixLabors.ImageSharp;

namespace Bennetr.RebrickableDotNet;

public interface IRebrickableClient
{
    Task<Set> GetSetAsync(string apiKey, string setId);

    Task<IEnumerable<SetPart>> GetSetPartsAsync(string apiKey, string setId);

    Task<IEnumerable<Minifig>> GetSetMinifigsAsync(string apiKey, string setId);

    Task<Size?> GetImageDimensionsAsync(string? url);
}
