import {Quest} from "./Quest";

export interface Game {
  id: string,
  name: string,
  quest: {
       [index: string]: Quest
  }
}
