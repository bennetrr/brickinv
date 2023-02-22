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

export interface RebrickableSetParts {
    count: number;
    next?: string;
    previous?: string;
    results: RebrickablePart[];
}

interface RebrickablePart {
    id: number;
    inv_part_id: number;
    part: {
        part_num: string;
        name: string;
        part_cat_id: number;
        year_from: number;
        year_to: number;
        part_url: string;
        part_img_url: string;
        prints: string[];
        molds?: string[];
        alternates?: string[];
        external_ids: any;
        print_of?: string;
    };
    color: {
        id: number;
        name: string;
        rgb: string;
        is_trans: boolean;
    };
    set_num: string;
    quantity: number;
    is_spare: boolean;
    element_id: string;
    num_sets: number;
}

export interface RebrickableSetMinifigs {
    count: number;
    next?: string;
    previous?: string;
    results: RebrickableMinifig[];
}

interface RebrickableMinifig {
    id: number;
    set_num: string;
    set_name: string;
    quantity: number;
    set_img_url: string;
}
