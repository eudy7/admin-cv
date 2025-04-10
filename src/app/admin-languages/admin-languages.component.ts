import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  btnTxt: string = "Agregar";
  languagesList: Languages[] = [];
  myLanguage: Languages = new Languages();

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);

    this.languagesService.getLanguages().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe((data: Languages[]) => {
      this.languagesList = data;
      console.log(this.languagesList);
    });
  }

  agregarLanguage() {
    console.log(this.myLanguage);
    this.languagesService.createLanguage(this.myLanguage).then(() => {
      console.log('Created new language successfully!');
    });
    this.myLanguage = new Languages();
  }

  deleteLanguage(id: string) {
    if (id) {
      this.languagesService.deleteLanguage(id).then(() => {
        console.log('Deleted language successfully!');
      });
      console.log(id);
    } else {
      console.error('ID is not defined');
    }
  }
}
