import {Reducer} from "./QuestReducer";
import {Quest} from "../engine/01_entities/Quest";

export const defaultData:Quest = {
    bottle: false,
    water: false,
    eyeOfNewt: false
}

export const potionQuest: Reducer = (questData, action) => {
    return questData ? questData : defaultData
}