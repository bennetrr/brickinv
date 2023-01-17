import axios from "axios";

export interface RebrickableSet {
    set_num: string;
    name: string;
    year: number;
    theme_id: number;
    num_parts: number;
    set_img_url: string;
    set_url: string;
    last_modified_dt: string;
}

export async function getLegoSet(setNumber: string): RebrickableSet {
    axios
        .get(`https://rebrickable.com/api/v3/lego/sets/${setNumber}/`, {
                headers: {Authorization: `key ${process.env.REBRICKABLE_API_KEY}`}
            })
        .then(
            
        )
}
