import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interest } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/interests';
  interestsRef: AngularFirestoreCollection<Interest>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interest> {
    return this.interestsRef;
  }

  createInterest(interest: Interest): Promise<any> {
    return this.interestsRef.add({ ...interest });
  }

  updateInterest(id: string, data: Interest): Promise<void> {
    return this.interestsRef.doc(id).update(data);
  }

  deleteInterest(id: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}
