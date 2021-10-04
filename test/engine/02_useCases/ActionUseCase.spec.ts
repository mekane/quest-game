import {ActionUseCase} from "../../../src/engine/02_useCases/ActionUseCase"
import {Repository} from "../../../src/engine/dataStore/Repository";
import {Game} from "../../../src/engine/01_entities/Game";
import {SpyRepository} from "../dataStore/SpyRepository";

describe('The Action Use Case', () => {
    it(`returns an error status if the game is not found in repository`, () => {
        const actionUseCase = new ActionUseCase(new Repository<Game>())

        const result = actionUseCase.execute('NOT FOUND')
        expect(result).toEqual({success: false, message: "No game found for id 'NOT FOUND'"})

        const result2 = actionUseCase.execute('ALSO NOT FOUND')
        expect(result2).toEqual({success: false, message: "No game found for id 'ALSO NOT FOUND'"})
    })

    it('loads the specified game from the repository', () => {
        const spy = new SpyRepository<Game>();
        const actionUseCase = new ActionUseCase(spy);

        actionUseCase.execute('TestId');
        expect(spy.getGetCalled()).toEqual(1);
    })
})
