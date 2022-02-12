import {Identifiable, Repository} from "@repositories/Repository";

export class SpyRepository<Type extends Identifiable> extends Repository<Identifiable> {
    private getCalled: number;
    private listCalled: number;
    private putCalled: number;

    constructor() {
        super();
        this.getCalled = 0;
        this.listCalled = 0;
        this.putCalled = 0;
    }

    public getDataFor(dirKey: string, id: string): Type {
        this.getCalled++;
        return null;
    }

    public putDataFor(dirKey: string, obj: Type) {
        this.putCalled++;
    }

    public listDataFor(dirKey: string, ) {
        this.listCalled++
        return [];
    }

    public getGetCalled() {
        return this.getCalled;
    }

    public getListCalled() {
        return this.listCalled;
    }

    public getPutCalled() {
        return this.putCalled;
    }
}