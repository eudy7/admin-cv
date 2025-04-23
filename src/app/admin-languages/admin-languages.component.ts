import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Language } from '../models/languages/languages.model';
import { LanguagesService } from '../services/languages-service/languages.service';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent implements OnInit {
  languages: Language[] = [];
  myLanguage: Language = this.resetLanguage();

  constructor(private langSvc: LanguagesService) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  resetLanguage(): Language {
    return { name: '', proficiency: '', certification: '' };
  }

  loadLanguages(): void {
    this.langSvc.getLanguages()
      .pipe(
        map((actions: any[]) =>
          actions.map(a => ({
            id: a.payload.doc.id,
            ...(a.payload.doc.data() as Language)
          }))
        )
      )
      .subscribe((data: Language[]) => {
        this.languages = data;
      });
  }

  saveLanguage(): void {
    if (this.myLanguage.id) {
      this.langSvc
        .updateLanguage(this.myLanguage.id, this.myLanguage)
        .then(() => (this.myLanguage = this.resetLanguage()));
    } else {
      this.langSvc
        .createLanguage(this.myLanguage)
        .then(() => (this.myLanguage = this.resetLanguage()));
    }
  }

  editLanguage(lang: Language): void {
    this.myLanguage = { ...lang };
  }

  deleteLanguage(id?: string): void {
    if (id) {
      this.langSvc.deleteLanguage(id);
    }
  }
}
