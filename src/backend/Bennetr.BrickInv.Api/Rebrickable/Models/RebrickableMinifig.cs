namespace Rebrickable.Models;

public class RebrickableSetMinifigs
{
    public int count { get; set; }
    public string next { get; set; }
    public string previous { get; set; }
    public IEnumerable<RebrickableMinifig> results { get; set; }
}

public class RebrickableMinifig
{
    public int id { get; set; }
    public string set_num { get; set; }
    public string set_name { get; set; }
    public int quantity { get; set; }
    public string set_img_url { get; set; }
}
