using Rebrickable.Models;

namespace Rebrickable;

public class RebrickableApi(string apiKey)
{
    private string _rebrickableApiKey = apiKey;
    private string _rebrickableApiUrl = "https://rebrickable.com/api/v3/lego/";

    public async Task<RebrickableSet> GetRebrickableSet(string setId)
    {
        return new RebrickableSet();
    }
    
    public async Task<IEnumerable<RebrickablePart>> GetRebrickableParts(string partId)
    {
        return new List<RebrickablePart>();
    }
    
    public async Task<RebrickableSetMinifigs> GetRebrickableMinifigs(string colorId)
    {
        return new RebrickableSetMinifigs();
    }
}
