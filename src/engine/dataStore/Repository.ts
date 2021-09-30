export interface Identifiable {
    id: string
}

export class Repository<Type extends Identifiable> {
    private store = {};

    public list(): Type[] {
        return Object.keys(this.store).map(k => this.store[k]);
    }

    public getById(id: string): Type {
        return this.store[id];
    }

    public put(obj: Type) {
        this.store[obj.id] = obj;
    }
}