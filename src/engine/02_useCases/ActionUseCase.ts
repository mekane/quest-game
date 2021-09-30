import {Repository} from "../dataStore/Repository";
import {Game} from "../01_entities/Game";
import {UseCase} from "./UseCase";

export class ActionUseCase extends UseCase {
    constructor(gameRepository: Repository<Game>) {
        super();
    }

    execute(foo) {
        return {
            success: false,
            message: "No game found for id 'NOT FOUND'"
        }
    }
}