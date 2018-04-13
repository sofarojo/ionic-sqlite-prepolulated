import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DataService } from '../services/data';
import { HomePage } from '../pages/home/home';
import { ErrorPage } from '../pages/error/error';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private dataService: DataService, public sqlite: SQLite) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.openDatabase()
      .then(()=> {
        this.rootPage = HomePage;
      })
      .catch(() => {
        this.rootPage = ErrorPage;
      })
    });
  }

  openDatabase(): Promise<boolean> {
    const dbConfig:any = {
      name: 'database.db',
      location: 'default',
      createFromLocation: 1
    };

    return new Promise((resolve, reject) => {
      this.sqlite.create(dbConfig)
        .then((db: SQLiteObject) => {
          this.dataService.setDatabase(db);
          resolve(true);
        })
        .catch(e => {
          reject();
        });
    });
  }
}

