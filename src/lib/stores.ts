// Select one set to show the part list
import {writable} from "svelte/store";
import type {LegoSet} from "./DataStructures";

export const selectedSetId = writable<string>();

export const sets = writable<LegoSet[]>([]);
