export class Identifiable {
    constructor(public readonly id: string) {
    }

    public static deserialize(json: string): Identifiable {
        const obj = JSON.parse(json);
        return new Identifiable(obj.id);
    }
}

export abstract class Repository<Type extends Identifiable> {

    public abstract getDataFor(dirKey: string, id: string): Type

    public abstract listDataFor(dirKey: string): Type[]

    public abstract putDataFor(dirKey: string, obj: Type)

}