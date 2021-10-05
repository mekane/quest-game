import {Identifiable, Repository} from "./Repository";
import fs from "fs";
import path from "path";

export class JsonFileRepository<Type extends Identifiable> extends Repository<Type> {
    private readonly dataPath;

    public constructor(readonly fileStoreBaseDirectory: string, private readonly deserializer?: (str: string) => Type) {
        super();

        this.dataPath = fileStoreBaseDirectory;
        JsonFileRepository.ensureDirectoryExists(fileStoreBaseDirectory);
    }

    public getDataFor(dirKey: string, id: string): Type {
        const userDir = path.resolve(this.dataPath, dirKey);
        const fileName = path.resolve(userDir, JsonFileRepository.dataFileName(id))
        let fileContents = '';
        try {
            fileContents = fs.readFileSync(fileName, 'utf8');
        } catch (e) {
            //console.log(e);
            return null;
        }

        if (this.deserializer)
            return this.deserializer(fileContents);
        else
            return null;
    }

    public listDataFor(dirKey: string): Type[] {
        const userDir = path.resolve(this.dataPath, dirKey);
        let listOfFiles = [];
        try {
            listOfFiles = fs.readdirSync(userDir, 'utf8');
        } catch (e) {
            console.log(e);
            return []
        }
        return listOfFiles.map(stripJson);

        function stripJson(fileName) {
            if (fileName.endsWith('.json'))
                return fileName.substring(0, fileName.length - 5);
            return fileName;
        }
    }

    public putDataFor(dirKey: string, obj: Type) {
        const userDir = path.resolve(this.dataPath, dirKey);
        const fileName = path.resolve(userDir, JsonFileRepository.dataFileName(obj.id));

        JsonFileRepository.ensureDirectoryExists(userDir);
        const file = fs.openSync(fileName, 'w');
        fs.writeSync(file, JSON.stringify(obj));
        fs.closeSync(file);
    }

    private static ensureDirectoryExists(directoryPath: string) {
        //console.log(`[FileStore] ensure directory (${directoryPath}) exists`);
        fs.mkdirSync(directoryPath, {recursive: true});
    }

    private static fileSafeName(name): string {
        const noSpaces = name.trim().replace(/\s|-/g, '_');
        const noSpecialChars = noSpaces.replace(/[\W]/g, '');
        return noSpecialChars.toLowerCase();
    }

    private static dataFileName(name): string {
        return JsonFileRepository.fileSafeName(name) + '.json';
    }
}
