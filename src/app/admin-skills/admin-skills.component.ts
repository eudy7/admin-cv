import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Skill } from '../models/skills/skills.model';
import { SkillsService } from '../services/skills-service/skills.service';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent implements OnInit {
  skillsList: Skill[] = [];
  mySkill: Skill = this.resetSkill();

  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.loadSkills();
  }

  resetSkill(): Skill {
    return { skillName: '', proficiency: '', description: '' };
  }

  loadSkills() {
    this.skillsService.getSkills().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Skill;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    ).subscribe(list => this.skillsList = list);
  }

  saveSkill() {
    if (!this.mySkill.id) {
      this.skillsService.createSkill(this.mySkill)
        .then(() => this.mySkill = this.resetSkill());
    } else {

    }
  }

  editSkill(s: Skill) {
    this.mySkill = { ...s };
  }

  deleteSkill(id?: string) {
    if (id) {
      this.skillsService.deleteSkill(id)
        .then(() => this.loadSkills());
    }
  }
}
