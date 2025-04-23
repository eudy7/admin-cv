import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Interest } from '../models/interests/interests.model';
import { InterestsService } from '../services/interests-service/interests.service';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent implements OnInit {
  interests: Interest[] = [];
  myInterest: Interest = this.resetInterest();

  constructor(private interestsSvc: InterestsService) {}

  ngOnInit(): void {
    this.loadInterests();
  }

  resetInterest(): Interest {
    return { interestName: '', description: '' };
  }

  loadInterests() {
    this.interestsSvc.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...(c.payload.doc.data() as Interest)
        }))
      )
    ).subscribe(data => this.interests = data);
  }

  saveInterest() {
    if (this.myInterest.id) {
      this.interestsSvc.updateInterest(this.myInterest.id, this.myInterest)
        .then(() => {
          alert('Interest actualizado');
          this.myInterest = this.resetInterest();
        });
    } else {
      this.interestsSvc.createInterest(this.myInterest)
        .then(() => {
          alert('Interest guardado');
          this.myInterest = this.resetInterest();
        });
    }
  }

  editInterest(item: Interest) {
    this.myInterest = { ...item };
  }

  deleteInterest(id?: string) {
    if (!id) return;
    this.interestsSvc.deleteInterest(id)
      .then(() => alert('Interest eliminado'));
  }
}
