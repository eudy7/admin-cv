import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { WorkExperienceService } from '../services/work-experience/work-experience.service';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  jobs: WorkExperience[] = [];
  myJob: WorkExperience = this.resetJob();

  constructor(private workService: WorkExperienceService) {
    this.loadWorkExperience();
  }

  resetJob(): WorkExperience {
    return {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      accomplishments: ''
    };
  }

  loadWorkExperience() {
    this.workService.getWorkExperience().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() as WorkExperience }))
      )
    ).subscribe((data: WorkExperience[]) => {
      this.jobs = data;
    });
  }

  saveWorkExperience() {
    if (this.myJob.id) {
      this.workService.workExperienceRef.doc(this.myJob.id).update(this.myJob)
        .then(() => {
          alert('Experiencia actualizada');
          this.myJob = this.resetJob();
        });
    } else {
      this.workService.createWorkExperience(this.myJob)
        .then(() => {
          alert('Experiencia guardada');
          this.myJob = this.resetJob();
        });
    }
  }

  editWorkExperience(job: WorkExperience) {
    this.myJob = { ...job };
  }

  deleteWorkExperience(id?: string) {
    if (id) {
      this.workService.deleteWorkExperience(id)
        .then(() => alert('Experiencia eliminada'));
    }
  }
}
