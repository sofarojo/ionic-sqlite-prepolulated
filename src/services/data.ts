import { SQLiteObject } from '@ionic-native/sqlite';
import { Word } from '../models/word';

export class DataService {
  db: SQLiteObject = null;

  constructor() {}

  setDatabase(db: SQLiteObject) {
    this.db = db;
  }

  getWordList(): Promise<Array<Word>> {
    return new Promise((resolve, reject) => {

      if (this.db === null || this.db === undefined) {
        resolve([]);
      }

      this.db.executeSql('SELECT wordid as wordId, front, back, additional FROM words',
       []).then((response) => {
        const words: Array<Word> = this.mapWords(response);
        resolve(words);
      }).catch(e => reject(e));
    })
  };

  private mapWords(response: any): Array<Word> {
    let words:Array<Word> = new Array<Word>();

    for (let index = 0; index < response.rows.length; index++) {
      words.push( this.mapWord(response.rows.item(index)) );
    }

    return words;
  }

  private mapWord(item: any): Word {
    return Object.assign(new Word(), item);
  }  
}
