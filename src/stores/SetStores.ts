import {writable} from "svelte/store";

import type {LegoSetsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";

export const sets = writable<Array<LegoSetsResponse<{added_by_user: UsersResponse}>>>([]);

export const openedSet = writable<string>(null);
