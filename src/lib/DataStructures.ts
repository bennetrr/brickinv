export interface LegoPart {
    partNumber: string;
    partName: string;
    imageUrl: string;
    partCount: number;
    presentPartCount: number;
}

export interface LegoSet {
    setNumber: string;
    setName: string;
    releaseYear: number;
    totalPartCount: number;
    imageUrl: string;
    toSell: boolean;
    addedByUserName: string;
    parts: LegoPart[];
}

/*
export function mapToLegoPart(): LegoPart {

}
export function mapToLegoSet(): LegoSet {

}*/
