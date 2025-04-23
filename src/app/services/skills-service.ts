import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skill } from 'src/app/models/skills/skills.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private dbPath = '/skills';
  private skillsRef: AngularFirestoreCollection<Skill>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  /** devuelve snapshotChanges para mapear id + data */
  getSkills() {
    return this.skillsRef.snapshotChanges();
  }

  createSkill(skill: Skill) {
    return this.skillsRef.add({ ...skill });
  }

  deleteSkill(id: string) {
    return this.skillsRef.doc(id).delete();
  }
}
