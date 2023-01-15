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
    releaseYear: string;
    totalPartCount: number;
    imageUrl: string;
    toSell: boolean;
    addedByUserName: string;
    parts: LegoPart[];
}