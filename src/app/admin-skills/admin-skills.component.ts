import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent {
  btnTxt: string = "Agregar";
  skillsList: Skills[] = [];
  mySkill: Skills = new Skills();

  constructor(public skillsService: SkillsService) {
    console.log(this.skillsService);

    this.skillsService.getSkills().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe((data: Skills[]) => {
      this.skillsList = data;
      console.log(this.skillsList);
    });
  }

  agregarSkill() {
    console.log(this.mySkill);
    this.skillsService.createSkill(this.mySkill).then(() => {
      console.log('Created new skill successfully!');
    });
    this.mySkill = new Skills(); // Limpiar el formulario
  }

  deleteSkill(id: string) {
    if (id) {
      this.skillsService.deleteSkill(id).then(() => {
        console.log('Deleted skill successfully!');
      });
      console.log(id);
    } else {
      console.error('ID is not defined');
    }
  }
}
