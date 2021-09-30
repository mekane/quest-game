import {Quest} from "./Quest";

export type GameId = string;

export interface Game {
    id: GameId,
    name: string,
    quest: {
        [index: string]: Quest
    }
}
