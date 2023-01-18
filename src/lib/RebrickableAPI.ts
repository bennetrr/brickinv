import axios, {type AxiosInstance} from "axios";
import type {LegoPart, LegoSet} from "./DataStructures";

interface RebrickableSet {
    set_num: string;
    name: string;
    year: number;
    theme_id: number;
    num_parts: number;
    set_img_url: string;
    set_url: string;
    last_modified_dt: string;
}

interface RebrickableSetParts {
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

interface RebrickableSetMinifigs {
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

export default class RebrickableApi {
    private readonly apiKey: string;
    private ax: AxiosInstance;

    constructor(apiKey: string) {
        this.apiKey = apiKey;

        this.ax = axios.create({
            baseURL: "https://rebrickable.com/api/v3/lego/",
            headers: {
                Authorization: `key ${this.apiKey}`,
                Accept: "application/json"
            }
        });
    }

    async getLegoSet(setNumber: string): Promise<RebrickableSet> {
        const response = await this.ax.get(`sets/${setNumber}`);
        return response.data;
    }

    async getLegoSetParts(setNumber: string): Promise<RebrickableSetParts> {
        const response = await this.ax.get(`sets/${setNumber}/parts?page_size=10000`);
        return response.data;
    }

    async getLegoSetMinifigs(setNumber: string): Promise<RebrickableSetMinifigs> {
        const response = await this.ax.get(`sets/${setNumber}/minifigs?page_size=10000`);
        return response.data;
    }

    async getLegoSetData(setNumber: string): Promise<LegoSet> {
        const setData = await this.getLegoSet(setNumber);
        const partData = await this.getLegoSetParts(setNumber);
        const minifigData = await this.getLegoSetMinifigs(setNumber);

        const partList: LegoPart[] = partData.results.map<LegoPart>(part => ({
            partNumber: part.part.part_num,
            partName: part.part.name,
            colorName: part.color.name,
            imageUrl: part.part.part_img_url,
            partCount: part.quantity,
            presentPartCount: 0
        }));

        const minifigList: LegoPart[] = minifigData.results.map<LegoPart>(part => ({
            partNumber: part.set_num,
            partName: part.set_name,
            imageUrl: part.set_img_url,
            partCount: part.quantity,
            presentPartCount: 0
        }));

        const data: LegoSet = {
            setNumber: setNumber,
            setName: setData.name,
            totalPartCount: setData.num_parts,
            releaseYear: setData.year,
            imageUrl: setData.set_img_url,
            toSell: null,
            addedByUserName: null,
            parts: [...minifigList, ...partList]
        };

        return data;
    }
}