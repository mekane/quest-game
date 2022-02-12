import {Identifiable, Repository} from "@repositories/Repository";

export class MockRepository<Type extends Identifiable> extends Repository<Type> {
    private store = {};

    public getDataFor(dirKey: string, id: string) {
        return this.store[id];
    }

    public listDataFor(dirKey: string) {
        return Object.keys(this.store).map(k => this.store[k]);
    }

    public putDataFor(dirKey: string, obj: Type) {
        this.store[obj.id] = obj;
    }
}