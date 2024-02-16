using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Bennetr.RebrickableDotNet.Models.Minifigs;
using Bennetr.RebrickableDotNet.Models.Parts;
using Bennetr.RebrickableDotNet.Models.Sets;

namespace Bennetr.RebrickableDotNet;

public interface IRebrickableClient
{
    Task<Set> GetSetAsync(string apiKey, string setId);

    Task<SetParts> GetSetPartsAsync(string apiKey, string setId);

    Task<SetMinifigs> GetSetMinifigsAsync(string apiKey, string setId);
}
