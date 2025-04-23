import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  educations: Education[] = [];
  myEducation: Education = this.resetEducation();

  constructor(private educationService: EducationService) {
    this.loadEducation();
  }

  resetEducation(): Education {
    return {
      degree: '',
      fieldOfStudy: '',
      institution: '',
      startDate: '',
      endDate: '',
      accomplishments: ''
    };
  }

  loadEducation() {
    this.educationService.getEducation()
      .pipe(
        map(changes =>
          changes.map(c => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as Education)
          }))
        )
      )
      .subscribe(data => this.educations = data);
  }

  saveEducation() {
    if (this.myEducation.id) {
      this.educationService.updateEducation(this.myEducation.id, this.myEducation)
        .then(() => {
          alert('Educación actualizada');
          this.myEducation = this.resetEducation();
        });
    } else {
      this.educationService.createEducation(this.myEducation)
        .then(() => {
          alert('Educación guardada');
          this.myEducation = this.resetEducation();
        });
    }
  }

  editEducation(edu: Education) {
    this.myEducation = { ...edu };
  }

  deleteEducation(id?: string) {
    if (!id) return;
    this.educationService.deleteEducation(id)
      .then(() => alert('Educación eliminada'));
  }
}
