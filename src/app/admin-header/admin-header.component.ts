import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  headers: Header[] = [];
  myHeader: Header = this.resetHeader();

  constructor(private headerService: HeaderService) {
    this.loadHeader();
  }

  resetHeader(): Header {
    return {
      name: '',
      email: '',
      phoneNumber: '',
      location: '',
      goalLife: '',
      photoUrl: '',
      socialNetwork: ''
    };
  }

  loadHeader() {
    this.headerService.getHeader().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Header }))
      )
    ).subscribe(data => {
      this.headers = data;
    });
  }

  saveHeader() {
    if (this.myHeader.id) {
      this.headerService.updateHeader(this.myHeader.id, this.myHeader)
        .then(() => {
          alert('Header actualizado');
          this.myHeader = this.resetHeader();
        })
        .catch(err => alert('Error al actualizar header: ' + err));
    } else {
      this.headerService.createHeader(this.myHeader)
        .then(() => {
          alert('Header guardado');
          this.myHeader = this.resetHeader();
        })
        .catch(err => alert('Error al crear header: ' + err));
    }
  }

  editHeader(header: Header) {
    this.myHeader = { ...header };
  }

  deleteHeader(id?: string) {
    if (id) {
      this.headerService.deleteHeader(id)
        .then(() => alert('Header eliminado'))
        .catch(err => alert('Error al eliminar header: ' + err));
    } else {
      alert('ID vacío o indefinido');
    }
  }

  clearForm() {
    this.myHeader = this.resetHeader();
  }
}
