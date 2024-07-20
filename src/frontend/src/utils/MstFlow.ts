export type Flow<TYield, TReturn> = Generator<Promise<TYield>, TReturn, TYield>;
