import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private collectionName = 'education';
  private educationRef: AngularFirestoreCollection<Education>;

  constructor(private firestore: AngularFirestore) {
    this.educationRef = firestore.collection<Education>(this.collectionName);
  }

  getEducation() {
    // devolvemos snapshotChanges() para obtener también el id
    return this.educationRef.snapshotChanges();
  }

  createEducation(edu: Education) {
    return this.educationRef.add({ ...edu });
  }

  updateEducation(id: string, edu: Education) {
    return this.educationRef.doc(id).update(edu);
  }

  deleteEducation(id: string) {
    return this.educationRef.doc(id).delete();
  }
}
