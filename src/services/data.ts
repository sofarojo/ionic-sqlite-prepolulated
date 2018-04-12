import { SQLiteObject } from '@ionic-native/sqlite';

export class DataService {
  db: SQLiteObject = null;

  constructor() {}

  setDatabase(db: SQLiteObject) {
    this.db = db;
  }
}
