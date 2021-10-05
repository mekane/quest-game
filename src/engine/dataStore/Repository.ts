export class Identifiable {
    constructor(public readonly id: string) {
    }

    public static deserialize(json: string): Identifiable {
        const obj = JSON.parse(json);
        return new Identifiable(obj.id);
    }
}

export abstract class Repository<Type extends Identifiable> {
    //private store = {};

    public abstract getDataFor(dirKey: string, id: string): Type

    //return this.store[id];

    public abstract listDataFor(dirKey: string): Type[]

    //return Object.keys(this.store).map(k => this.store[k]);

    public abstract putDataFor(dirKey: string, obj: Type)

    //this.store[obj.id] = obj;
}