import {writable} from "svelte/store";
import type {LegoSet} from "./DataStructures";

export const selectedSetId = writable<string>();

export const sets = writable<LegoSet[]>([]);

export const addSetActionRunning = writable(false);
