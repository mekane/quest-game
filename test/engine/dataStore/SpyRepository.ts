import {Identifiable, Repository} from "../../../src/engine/dataStore/Repository";

export class SpyRepository<Type extends Identifiable> extends Repository<Identifiable> {
    private listCalled: number;
    private getCalled: number;
    private putCalled: number;

    constructor() {
        super();
        this.listCalled = 0;
        this.getCalled = 0;
        this.putCalled = 0;
    }

    public list() {
        this.listCalled++
        return [];
    }

    public getById(id: string): Type {
        this.getCalled++;
        return null;
    }

    public put(obj: Type) {
        this.putCalled++;
    }

    public getListCalled() {
        return this.listCalled;
    }

    public getGetCalled() {
        return this.getCalled;
    }

    public getPutCalled() {
        return this.putCalled;
    }
}