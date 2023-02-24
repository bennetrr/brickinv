/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	LegoParts = "lego_parts",
	LegoSets = "lego_sets",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type LegoPartsRecord = {
	part_number: string
	part_name: string
	image_url: string
	total_count: number
	present_count?: number
	color_name?: string
	set: RecordIdString
}

export type LegoSetsRecord = {
	set_number: string
	set_name: string
	release_year: number
	image_url: string
	to_sell?: boolean
	total_parts: number
	present_parts?: number
	added_by_user: RecordIdString
}

export type UsersRecord = {
	rebrickable_api_key: string
}

// Response types include system fields and match responses from the PocketBase API
export type LegoPartsResponse<Texpand = unknown> = LegoPartsRecord & BaseSystemFields<Texpand>
export type LegoSetsResponse<Texpand = unknown> = LegoSetsRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	lego_parts: LegoPartsRecord
	lego_sets: LegoSetsRecord
	users: UsersRecord
}