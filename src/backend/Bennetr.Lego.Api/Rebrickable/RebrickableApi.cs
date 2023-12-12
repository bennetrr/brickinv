using System.Net.Http.Headers;
using System.Net.Http.Json;
using Rebrickable.Models;

namespace Rebrickable;

public class RebrickableApi
{
    private readonly HttpClient _httpClient;
    private readonly Uri _rebrickableApiUrl = new("https://rebrickable.com/api/v3/lego/");

    public RebrickableApi()
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

    public async Task<RebrickableSet> GetRebrickableSet(string apiKey, string setId)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, $"sets/{setId}/");
        request.Headers.Add("Authorization", $"key {apiKey}");

        var result = await _httpClient.SendAsync(request);
        result.EnsureSuccessStatusCode();
        return await result.Content.ReadFromJsonAsync<RebrickableSet>() ?? throw new InvalidOperationException();
    }

    public async Task<RebrickableSetParts> GetRebrickableParts(string apiKey, string setId)
    {
        var request =
            new HttpRequestMessage(HttpMethod.Get, $"sets/{setId}/parts/?page_size=10000"); // TODO: Pagination
        request.Headers.Add("Authorization", $"key {apiKey}");

        var result = await _httpClient.SendAsync(request);
        result.EnsureSuccessStatusCode();
        return await result.Content.ReadFromJsonAsync<RebrickableSetParts>() ?? throw new InvalidOperationException();
    }

    public async Task<RebrickableSetMinifigs> GetRebrickableMinifigs(string apiKey, string setId)
    {
        var request =
            new HttpRequestMessage(HttpMethod.Get, $"sets/{setId}/minifigs/?page_size=10000"); // TODO: Pagination
        request.Headers.Add("Authorization", $"key {apiKey}");

        var result = await _httpClient.SendAsync(request);
        result.EnsureSuccessStatusCode();
        return await result.Content.ReadFromJsonAsync<RebrickableSetMinifigs>() ??
               throw new InvalidOperationException();
    }
}
