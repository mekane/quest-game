import {defaultData, potionQuest} from "@quests/potionQuest";

describe('The Potion Quest', () => {
    it('returns a default inital data structure if passed nothing', () => {
        expect(potionQuest(undefined, {type: ''})).toEqual(defaultData)
    })

    it('returns the quest data unchanged for non-applicable action types', () => {
        const initialData = {test: true};

        expect(potionQuest(initialData, {type: ''})).toEqual(initialData)
        expect(potionQuest(initialData, {type: 'dude'})).toEqual(initialData)
        expect(potionQuest(initialData, {type: 'crazy'})).toEqual(initialData)
    })
})