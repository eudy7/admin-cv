import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  btnTxt: string = "Agregar";
  interestsList: Interests[] = [];
  myInterest: Interests = new Interests();

  constructor(public interestsService: InterestsService) {
    console.log(this.interestsService);

    this.interestsService.getInterests().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe((data: Interests[]) => {
      this.interestsList = data;
      console.log(this.interestsList);
    });
  }

  agregarInterest() {
    console.log(this.myInterest);
    this.interestsService.createInterest(this.myInterest).then(() => {
      console.log('Created new interest successfully!');
    });
    this.myInterest = new Interests();
  }

  deleteInterest(id: string) {
    if (id) {
      this.interestsService.deleteInterest(id).then(() => {
        console.log('Deleted interest successfully!');
      });
      console.log(id);
    } else {
      console.error('ID is not defined');
    }
  }
}
