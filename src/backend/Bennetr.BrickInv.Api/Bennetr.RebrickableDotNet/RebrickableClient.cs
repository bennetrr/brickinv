using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Bennetr.RebrickableDotNet.Models.Minifigs;
using Bennetr.RebrickableDotNet.Models.Parts;
using Bennetr.RebrickableDotNet.Models.Sets;

namespace Bennetr.RebrickableDotNet;

public class RebrickableClient
{
    private readonly HttpClient _httpClient;

    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
    };

    private readonly Uri _rebrickableApiUrl = new("https://rebrickable.com/api/v3/lego/");

    public RebrickableClient()
    {
        _httpClient = new HttpClient
        {
            BaseAddress = _rebrickableApiUrl,
            DefaultRequestHeaders =
            {
                Accept = { new MediaTypeWithQualityHeaderValue("application/json") }
            }
        };
    }

    private async Task<TResult> MakeRequest<TResult>(string apiKey, string url)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Add("Authorization", $"key {apiKey}");

        var result = await _httpClient.SendAsync(request);
        result.EnsureSuccessStatusCode();
        return await result.Content.ReadFromJsonAsync<TResult>(_jsonSerializerOptions) ?? throw new InvalidOperationException();
    }

    public async Task<Set> GetSetAsync(string apiKey, string setId)
    {
        return await MakeRequest<Set>(apiKey, $"sets/{setId}/");
    }

    public async Task<SetParts> GetSetPartsAsync(string apiKey, string setId)
    {
        return await MakeRequest<SetParts>(apiKey, $"sets/{setId}/parts/?page_size=10000"); // TODO: Pagination
    }

    public async Task<SetMinifigs> GetSetMinifigsAsync(string apiKey, string setId)
    {
        return await MakeRequest<SetMinifigs>(apiKey, $"sets/{setId}/minifigs/?page_size=10000"); // TODO: Pagination
    }
}
