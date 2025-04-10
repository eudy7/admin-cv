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
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  educationList: Education[] = [];
  myEducation: Education = new Education();

  constructor(public educationService: EducationService) {
    console.log(this.educationService);

    this.educationService.getEducation().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe((data: Education[]) => {  // 'data' de tipo Education[]
      this.educationList = data;
      console.log(this.educationList);
    });
  }

  agregarEducation() {
    console.log(this.myEducation);
    this.educationService.createEducation(this.myEducation).then(() => {
      console.log('Created new item successfully!');
    });
    this.myEducation = new Education(); // Limpiar formulario
  }

  deleteEducation(id: string) {
    if (id) {  // Comprobamos que 'id' sea un string válido
      this.educationService.deleteEducation(id).then(() => {
        console.log('Deleted item successfully!');
      });
      console.log(id);
    } else {
      console.error('ID is not defined');
    }
  }
}
