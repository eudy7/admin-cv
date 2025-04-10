import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  itemCount: number = 0;
  btntxt: string = "Guardar";
  headers: Header[] = [];
  myHeader: Header = new Header();

  constructor(public headerService: HeaderService) {
    this.loadHeader();
  }

  loadHeader() {
    this.headerService.getHeader().pipe(
      map(changes => 
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Header }))
      )
    ).subscribe(data => {
      this.headers = data;
      if (this.headers.length > 0) {
        this.myHeader = { ...this.headers[0] };
      }
    });
  }

  saveHeader() {
    if (this.myHeader.id) {
      this.headerService.updateHeader(this.myHeader.id, this.myHeader)
        .then(() => console.log('Header updated!'));
    } else {
      this.headerService.createHeader(this.myHeader)
        .then(() => console.log('Header created!'));
    }
  }

  deleteHeader(id?: string) {
    if (id) {
      this.headerService.deleteHeader(id)
        .then(() => console.log('Header deleted!'));
    }
  }
}
