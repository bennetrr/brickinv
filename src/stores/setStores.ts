import {writable} from "svelte/store";

import type {LegoSetsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";

export const sets = writable<Array<LegoSetsResponse<{UsersResponse}>>>([]);
