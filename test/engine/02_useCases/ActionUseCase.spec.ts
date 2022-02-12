import {ActionUseCase} from "../../../src/engine/02_useCases/ActionUseCase"
import {Game} from "@entities/Game";
import {SpyRepository} from "../03_repositories/SpyRepository";
import {MockRepository} from "../03_repositories/MockRepository";

const stubReducer = (data, action) => data;

describe('The Action Use Case', () => {
    it(`returns an error status if the game is not found in repository`, () => {
        const actionUseCase = new ActionUseCase(new SpyRepository<Game>(), stubReducer)

        const result = actionUseCase.execute('NOT FOUND', null)
        expect(result).toEqual(makeError("No game found for id 'NOT FOUND'"))

        const result2 = actionUseCase.execute('ALSO NOT FOUND', null)
        expect(result2).toEqual(makeError("No game found for id 'ALSO NOT FOUND'"))
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
        const testGame = makeGame();
        const mockRepository = new MockRepository<Game>();
        mockRepository.putDataFor('games', testGame);
        const actionUseCase = new ActionUseCase(mockRepository, gameReducer)

        const testAction = {type: 'test'}

        const result = actionUseCase.execute(testGame.id, testAction)
        expect(result.success).toEqual(true)
        expect(observedGameData).toEqual(testGame)
        expect(observedAction).toEqual(testAction)
    })

    it('saves the results of the reducer back to the store', () => {
        const expectedNewGameData = {id: 'testId', name: 'game', quest: {q1: {}}};
        const gameReducer = () => expectedNewGameData;
        const testGame = makeGame()
        const mockRepository = new MockRepository<Game>();
        mockRepository.putDataFor('games', testGame);
        const actionUseCase = new ActionUseCase(mockRepository, gameReducer)

        const result = actionUseCase.execute(testGame.id, {type: 'test'})
        expect(mockRepository.getDataFor('games', testGame.id)).toEqual(expectedNewGameData);
    })

    it('returns an error if there is a problem saving the game', () => {
        const errorOnSaveRepository = new MockRepository<Game>();
        errorOnSaveRepository.putDataFor('games', makeGame())
        errorOnSaveRepository.putDataFor = () => {
            throw new Error('triggered error')
        }

        const actionUseCase = new ActionUseCase(errorOnSaveRepository, () => makeGame())
        const result = actionUseCase.execute('testId', {type: 'test'})

        expect(result).toEqual(makeError('Error saving action results: triggered error'))
    })
})

function makeGame() {
    return {id: 'testId', name: 'game', quest: {}}
}

function makeError(message) {
    return {success: false, message}
}