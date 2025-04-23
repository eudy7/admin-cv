import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skill } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/skills';
  skillsRef: AngularFirestoreCollection<Skill>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills() {
    return this.skillsRef.snapshotChanges();
  }

  createSkill(skill: Skill) {
    return this.skillsRef.add({ ...skill });
  }

  updateSkill(id: string, data: Skill) {
    return this.skillsRef.doc(id).update(data);
  }

  deleteSkill(id: string) {
    return this.skillsRef.doc(id).delete();
  }
}
