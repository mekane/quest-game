import {ActionUseCase} from "../../../src/engine/02_useCases/ActionUseCase"
import {Repository} from "../../../src/engine/dataStore/Repository";
import {Game} from "../../../src/engine/01_entities/Game";

describe('The ActionUseCase Use Case', () => {
    it(`returns an error status if the game is not found in repository`, () => {
        const actionUseCase = new ActionUseCase(new Repository<Game>());

        const result = actionUseCase.execute({gameId: 'NOT FOUND'})
        expect(result).toEqual({success: false, message: "No game found for id 'NOT FOUND'"})
    })
})
