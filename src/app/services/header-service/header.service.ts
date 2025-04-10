import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private collectionName = 'header';

  constructor(private firestore: AngularFirestore) {}

  getHeader() {
    return this.firestore.collection<Header>(this.collectionName).snapshotChanges();
  }

  createHeader(header: Header) {
    return this.firestore.collection(this.collectionName).add(header);
  }

  updateHeader(id: string, header: Header) {
    return this.firestore.collection(this.collectionName).doc(id).update(header);
  }

  deleteHeader(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
