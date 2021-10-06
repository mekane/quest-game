import {ActionUseCase} from "../../../src/engine/02_useCases/ActionUseCase"
import {Game} from "../../../src/engine/01_entities/Game";
import {SpyRepository} from "../dataStore/SpyRepository";
import {MockRepository} from "../dataStore/MockRepository";

const stubReducer = (data, action) => data;

describe('The Action Use Case', () => {
    it(`returns an error status if the game is not found in repository`, () => {
        const actionUseCase = new ActionUseCase(new SpyRepository<Game>(), stubReducer)

        const result = actionUseCase.execute('NOT FOUND', null)
        expect(result).toEqual({success: false, message: "No game found for id 'NOT FOUND'"})

        const result2 = actionUseCase.execute('ALSO NOT FOUND', null)
        expect(result2).toEqual({success: false, message: "No game found for id 'ALSO NOT FOUND'"})
    })

    it('loads the specified game from the repository', () => {
        const spy = new SpyRepository<Game>();
        const actionUseCase = new ActionUseCase(spy, stubReducer);

        actionUseCase.execute('TestId', {type: ''});
        expect(spy.getGetCalled()).toEqual(1);
    })

    it('calls the injected quest reducer with the provided action and gameId', () => {
        let observedAction = '';
        let observedGameData = '';
        const gameReducer = (data, action) => {
            observedGameData = data;
            observedAction = action;
            return data;
        }
        const testGame = {id: 'testId', name: 'game', quest: {}};
        const mockRepository = new MockRepository<Game>();
        mockRepository.putDataFor('games', testGame);
        const actionUseCase = new ActionUseCase(mockRepository, gameReducer)

        const testAction = {type: 'test'}

        const result = actionUseCase.execute(testGame.id, testAction)
        expect(result.success).toEqual(true)
        expect(observedGameData).toEqual(testGame)
        expect(observedAction).toEqual(testAction)
    })
})
