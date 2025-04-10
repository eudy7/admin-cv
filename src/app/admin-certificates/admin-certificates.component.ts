import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  btnTxt: string = "Agregar";
  certificatesList: Certificates[] = [];
  myCertificate: Certificates = new Certificates(); 

  constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);

    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe((data: Certificates[]) => {
      this.certificatesList = data;
      console.log(this.certificatesList);
    });
  }

  agregarCertificates() {
    console.log(this.myCertificate);
    this.certificatesService.createCertificates(this.myCertificate).then(() => {
      console.log('Created new certificate successfully!');
    });
    this.myCertificate = new Certificates(); // Limpiar formulario
  }

  deleteCertificates(id: string) {
    if (id) {
      this.certificatesService.deleteCertificates(id).then(() => {
        console.log('Deleted certificate successfully!');
      });
      console.log(id);
    } else {
      console.error('ID is not defined');
    }
  }
}
