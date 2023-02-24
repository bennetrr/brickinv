import axios, {type AxiosInstance} from "axios";

import type {RebrickableSet, RebrickableSetMinifigs, RebrickableSetParts} from "../interfaces/RebrickableAPI";
import type {LegoPartsRecord, LegoSetsRecord} from "../interfaces/PocketBaseTypes";

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

    async getLegoSetInformation(setNumber: string): Promise<LegoSetsRecord> {
        const response = await this.ax.get<RebrickableSet>(`sets/${setNumber}/`);
        const responseData = response.data;

        const data: LegoSetsRecord = {
            set_number: setNumber,
            set_name: responseData.name,
            image_url: responseData.set_img_url,
            release_year: responseData.year,
            to_sell: undefined,
            total_parts: undefined,
            added_by_user: undefined,
            present_parts: undefined
        };

        return data;
    }

    async getLegoSetParts(setNumber: string): Promise<LegoPartsRecord[]> {
        const partsResponse = await this.ax.get<RebrickableSetParts>(`sets/${setNumber}/parts/?page_size=10000`);
        const partsResponseData = partsResponse.data.results;

        const minifigsResponse = await this.ax.get<RebrickableSetMinifigs>(`sets/${setNumber}/minifigs/?page_size=10000`);
        const minifigsResponseData = minifigsResponse.data.results;

        const partsData: LegoPartsRecord[] = partsResponseData.map(part => ({
            part_number: part.part.part_num,
            part_name: part.part.name,
            color_name: part.color.name,
            image_url: part.part.part_img_url,
            total_count: part.quantity,
            present_count: undefined,
            set: undefined
        }));

        const minifigsData: LegoPartsRecord[] = minifigsResponseData.map(minifig => ({
            part_number: minifig.set_num,
            part_name: minifig.set_name,
            image_url: minifig.set_img_url,
            total_count: minifig.quantity,
            color_name: undefined,
            set: undefined,
            present_count: undefined
        }));

        const data = [...minifigsData, ...partsData];
        return data;
    }
}
