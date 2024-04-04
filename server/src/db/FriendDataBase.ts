import Dexie, { Table } from 'dexie';

interface Friend {
    id?: number;
    name?: string;
    age?: number;
}

//
// Declare Database
//
export default class FriendDatabase extends Dexie {
    public friends!: Table<Friend, number>; // id is number in this case

    public constructor() {
        super("FriendDatabase");
        this.version(1).stores({
            friends: "++id,name,age"
        });
    }
}
