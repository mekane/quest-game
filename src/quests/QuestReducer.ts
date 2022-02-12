import {Game} from "@entities/Game";
import {ActionSpecifier} from "@useCases/ActionUseCase";
import {Quest} from "@entities/Quest";

export type Reducer = (questData: Quest, action: ActionSpecifier) => Quest;

export interface QuestMap {
    [index: string]: Reducer
}

export class QuestReducer {
    constructor(public readonly questMap: QuestMap) {
    }

    public apply(gameData: Game, action: ActionSpecifier): Game {
        const newGame = gameData;

        Object.keys(this.questMap).forEach(questName => {
            const reducer = this.questMap[questName];
            newGame.quest[questName] = reducer(gameData.quest[questName], action)
        })

        return newGame;
    }
}
