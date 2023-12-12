namespace Rebrickable.Models;

public class RebrickableSetParts
{
    public int count { get; set; }
    public string next { get; set; }
    public string previous { get; set; }
    public IEnumerable<RebrickablePart> results { get; set; }
}

public class RebrickablePart
{
    public int id { get; set; }
    public int inv_part_id { get; set; }
    public Part part { get; set; }
    public Color color { get; set; }
    public string set_num { get; set; }
    public int quantity { get; set; }
    public bool is_spare { get; set; }
    public string element_id { get; set; }
    public int num_sets { get; set; }
}

public class Part
{
    public string part_num { get; set; }
    public string name { get; set; }
    public int part_cat_id { get; set; }
    public int year_from { get; set; }
    public int year_to { get; set; }
    public string part_url { get; set; }
    public string part_img_url { get; set; }
    public string[] prints { get; set; }
    public string[] molds { get; set; }
    public string[] alternates { get; set; }
    public object external_ids { get; set; }
    public string print_of { get; set; }
}

public class Color
{
    public int id { get; set; }
    public string name { get; set; }
    public string rgb { get; set; }
    public bool is_trans { get; set; }
}
