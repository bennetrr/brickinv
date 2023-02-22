import {writable} from "svelte/store";

import type {LegoSet} from "../interfaces/DataStructures";

export const selectedSetId = writable<string>();

export const addSetActionRunning = writable(false);
