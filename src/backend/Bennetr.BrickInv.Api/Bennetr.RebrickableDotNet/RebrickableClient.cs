using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Bennetr.RebrickableDotNet.Models.Minifigs;
using Bennetr.RebrickableDotNet.Models.Parts;
using Bennetr.RebrickableDotNet.Models.Sets;
using CachingFramework.Redis.Contracts.Providers;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;

namespace Bennetr.RebrickableDotNet;

public class RebrickableClient(ICacheProvider cache) : IRebrickableClient
{
    private static readonly Uri RebrickableApiUrl = new("https://rebrickable.com/api/v3/lego/");

    private readonly HttpClient _httpClient = new()
    {
        BaseAddress = RebrickableApiUrl,
        DefaultRequestHeaders =
        {
            Accept = { new MediaTypeWithQualityHeaderValue("application/json") }
        }
    };

    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
    };

    public async Task<Set> GetSetAsync(string apiKey, string setId)
    {
        return await MakeRequest<Set>(apiKey, $"sets/{setId}/");
    }

    public async Task<IEnumerable<SetPart>> GetSetPartsAsync(string apiKey, string setId)
    {
        var url = $"sets/{setId}/parts/";
        var result = new List<SetPart>();

        do
        {
            var response = await MakeRequest<SetParts>(apiKey, url);
            result.AddRange(response.Results);
            url = response.Next;
        }
        while (url != null);

        return result;
    }

    public async Task<IEnumerable<Minifig>> GetSetMinifigsAsync(string apiKey, string setId)
    {
        var url = $"sets/{setId}/minifigs/";
        var result = new List<Minifig>();

        do
        {
            var response = await MakeRequest<SetMinifigs>(apiKey, url);
            result.AddRange(response.Results);
            url = response.Next;
        }
        while (url != null);

        return result;
    }

    public async Task<Size?> GetImageDimensionsAsync(string? url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return null;
        }

        if (await cache.KeyExistsAsync($"imgsize:${url}"))
        {
            return await cache.GetObjectAsync<Size>($"imgsize:${url}");
        }

        var request = new HttpRequestMessage(HttpMethod.Get, url);
        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        await using var stream = new MemoryStream();
        await response.Content.CopyToAsync(stream);
        stream.Seek(0, SeekOrigin.Begin);
        var image = await Image.IdentifyAsync(stream);

        await cache.SetObjectAsync($"imgsize:${url}", image.Size, TimeSpan.FromHours(6));
        return image.Size;
    }

    private async Task<TResult> MakeRequest<TResult>(string apiKey, string url)
    {
        if (await cache.KeyExistsAsync($"rebrickable:${url}"))
        {
            return await cache.GetObjectAsync<TResult>($"rebrickable:${url}");
        }

        var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Add("Authorization", $"key {apiKey}");
        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<TResult>(_jsonSerializerOptions)
            ?? throw new FormatException("Unable to parse response from Rebrickable API");

        await cache.SetObjectAsync($"rebrickable:${url}", result, TimeSpan.FromHours(6));
        return result;
    }
}
