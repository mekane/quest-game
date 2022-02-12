import {Repository} from "@repositories/Repository";
import {Game, GameId} from "@entities/Game";
import {UseCase} from "./UseCase";

export interface ActionSpecifier {
    type: string, //TODO: enum of action types
    options?: {}
}

type ActionReducer = (game: Game, action: ActionSpecifier) => Game;

export class ActionUseCase extends UseCase {
    private gameRepo: Repository<Game>;
    private actionReducer: ActionReducer;

    constructor(gameRepository: Repository<Game>, questReducer: ActionReducer) {
        super();

        this.gameRepo = gameRepository;
        this.actionReducer = questReducer;
    }

    execute(gameId: GameId, action: ActionSpecifier) {

        const game: Game = this.gameRepo.getDataFor('games', gameId)

        if (game) {
            const newData = this.actionReducer(game, action)

            try {
                this.gameRepo.putDataFor('games', newData)
            } catch (e) {
                return {
                    success: false,
                    message: "Error saving action results: " + e.message
                }
            }

            return {
                success: true,
                message: "Action applied" //TODO: more specific message
            }

        } else {
            return {
                success: false,
                message: `No game found for id '${gameId}'`
            }
        }
    }
}
