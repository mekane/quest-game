import {QuestMap, QuestReducer, Reducer} from "../../src/quests/QuestReducer";
import {Game} from "../../src/engine/01_entities/Game";

describe('the QuestReducer class', () => {
    it('is initialized with a map of quest names => reducer functions', () => {
        const questReducer = new QuestReducer({test: _ => _, foo: _ => _})
        expect(questReducer.questMap).toHaveProperty('test')
    })

    it('provides a rootReducer that applies the quest reducers to the game', () => {
        const testGame: Game = {
            id: 'testId',
            name: 'Test Game',
            quest: {
                'quest1': {},
                'quest2': {}
            }
        }

        const reducer1: Reducer = (d, a) => {
            d['touched'] = 'reducer1';
            d['action'] = a.type;
            return d
        }
        const reducer2: Reducer = (d, a) => {
            d['touched'] = 'reducer2';
            d['action'] = a.type;
            return d
        }

        const questMap: QuestMap = {
            quest1: reducer1,
            quest2: reducer2
        }

        const questReducer = new QuestReducer(questMap)

        const newGameData = questReducer.apply(testGame, {type: 'testAction'});
        expect(newGameData.quest.quest1['touched']).toEqual('reducer1')
        expect(newGameData.quest.quest1['action']).toEqual('testAction')
        expect(newGameData.quest.quest2['touched']).toEqual('reducer2')
        expect(newGameData.quest.quest2['action']).toEqual('testAction')
    })
})
