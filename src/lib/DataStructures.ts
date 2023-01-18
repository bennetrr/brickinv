import {pb} from "./PocketBase";

export interface LegoSet {
    id?: string;
    setNumber: string;
    setName: string;
    releaseYear: number;
    totalPartCount: number;
    imageUrl: string;
    toSell: boolean;
    addedByUserName: string;
    parts: LegoPart[];
}

export interface LegoPart {
    partNumber: string;
    partName: string;
    imageUrl: string;
    colorName?: string;
    partCount: number;
    presentPartCount: number;
}

async function getUserIdFromName(username: string): Promise<string> {
    const user = await pb.collection("users").getFirstListItem(`username="${username}"`);
    return user.id;
}

async function getUsernameFromUserId(userId: string): Promise<string> {
    const user = await pb.collection("users").getOne(userId);
    return user.username;
}

export async function mapLegoSetToPocketBase(setData: LegoSet): Promise<any> {
    const data = {
        set_number: setData.setNumber,
        set_name: setData.setName,
        part_count: setData.totalPartCount,
        image_url: setData.imageUrl,
        to_sell: setData.toSell,
        added_by_user: await getUserIdFromName(setData.addedByUserName),
        release_year: setData.releaseYear,
        parts: setData.parts
    };
    return data;
}

export async function mapPocketBaseToLegoSet(setData: any): Promise<LegoSet> {
    const data = {
        id: setData.id,
        setNumber: setData.set_number,
        setName: setData.set_name,
        totalPartCount: setData.part_count,
        imageUrl: setData.image_url,
        toSell: setData.to_sell,
        addedByUserName: await getUsernameFromUserId(setData.added_by_user),
        releaseYear: setData.release_year,
        parts: setData.parts
    };
    return data;
}
