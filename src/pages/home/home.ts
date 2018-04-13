import { Component } from '@angular/core';
import { Word } from '../../models/word';
import { DataService } from '../../services/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  words: Array<Word> = [];

  constructor(private dataService: DataService) {

  }

  ionViewWillEnter(): void {
    this.dataService.getWordList()
    .then((words: Array<Word>) => {
      this.words = words;
    });
  }
}
