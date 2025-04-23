import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Language } from '../../models/languages/languages.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/languages';
  private languagesRef: AngularFirestoreCollection<Language>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  /** Devuelve el snapshot con id + data */
  getLanguages(): Observable<any[]> {
    return this.languagesRef.snapshotChanges();
  }

  createLanguage(lang: Language): Promise<any> {
    return this.languagesRef.add({ ...lang });
  }

  updateLanguage(id: string, data: Language): Promise<void> {
    return this.languagesRef.doc(id).update(data);
  }

  deleteLanguage(id: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
}
