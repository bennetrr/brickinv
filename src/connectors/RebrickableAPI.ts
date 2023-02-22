import axios, {type AxiosInstance} from "axios";
import type {LegoPart, LegoSet} from "../interfaces/DataStructures";
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
        return null;
    }

    async getLegoSetParts(setNumber: string): Promise<LegoPartsRecord[]> {
        return null;
    }

    // async getLegoSet(setNumber: string): Promise<RebrickableSet> {
    //     const response = await this.ax.get(`sets/${setNumber}`);
    //     return response.data;
    // }
    //
    // async getLegoSetParts(setNumber: string): Promise<RebrickableSetParts> {
    //     const response = await this.ax.get(`sets/${setNumber}/parts?page_size=10000`);
    //     return response.data;
    // }
    //
    // async getLegoSetMinifigs(setNumber: string): Promise<RebrickableSetMinifigs> {
    //     const response = await this.ax.get(`sets/${setNumber}/minifigs?page_size=10000`);
    //     return response.data;
    // }
    //
    // async getLegoSetData(setNumber: string): Promise<LegoSet> {
    //     const setData = await this.getLegoSet(setNumber);
    //     const partData = await this.getLegoSetParts(setNumber);
    //     const minifigData = await this.getLegoSetMinifigs(setNumber);
    //
    //     const partList: LegoPart[] = partData.results.map<LegoPart>(part => ({
    //         partNumber: part.part.part_num,
    //         partName: part.part.name,
    //         colorName: part.color.name,
    //         imageUrl: part.part.part_img_url,
    //         partCount: part.quantity,
    //         presentPartCount: 0
    //     }));
    //
    //     const minifigList: LegoPart[] = minifigData.results.map<LegoPart>(part => ({
    //         partNumber: part.set_num,
    //         partName: part.set_name,
    //         imageUrl: part.set_img_url,
    //         partCount: part.quantity,
    //         presentPartCount: 0
    //     }));
    //
    //     const data: LegoSet = {
    //         setNumber: setNumber,
    //         setName: setData.name,
    //         totalPartCount: setData.num_parts,
    //         releaseYear: setData.year,
    //         imageUrl: setData.set_img_url,
    //         toSell: null,
    //         addedByUserName: null,
    //         parts: [...minifigList, ...partList]
    //     };
    //
    //     return data;
    // }
}