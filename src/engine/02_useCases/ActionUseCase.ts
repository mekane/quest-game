import {Repository} from "../dataStore/Repository";
import {Game, GameId} from "../01_entities/Game";
import {UseCase} from "./UseCase";

export interface ActionSpecifier {
    type: string, //TODO: enum of action types
    options?: {}
}

export class ActionUseCase extends UseCase {
    private gameRepo;
    private actionReducer;

    constructor(gameRepository: Repository<Game>, questReducer: (game:Game, action:ActionSpecifier) => Game) {
        super();

        this.gameRepo = gameRepository;
        this.actionReducer = questReducer;
    }

    execute(gameId: GameId, action: ActionSpecifier) {

        const game: Game = this.gameRepo.getDataFor('games', gameId)

        if (game) {
            this.actionReducer(game,  action)

            //store result

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