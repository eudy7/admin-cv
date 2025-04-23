import { Component, OnInit } from '@angular/core';
import { Certificate } from '../models/certificates/certificates.model';
import { CertificatesService } from '../services/certificates-service/certificates.service';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  myCertificate: Certificate = this.resetCertificate();

  constructor(private certSvc: CertificatesService) {}

  ngOnInit() {
    this.loadCertificates();
  }

  resetCertificate(): Certificate {
    return { 
      id: undefined, 
      name: '', 
      issuingOrganization: '', 
      issueDate: '', 
      expirationDate: '' 
    };
  }

  loadCertificates() {
    this.certSvc.getCertificates().subscribe(data => {
      this.certificates = data;
    });
  }

  saveCertificate() {
    if (this.myCertificate.id) {
      this.certSvc.updateCertificate(this.myCertificate.id, this.myCertificate)
        .then(() => {
          alert('Certificado actualizado');
          this.myCertificate = this.resetCertificate();
        });
    } else {
      this.certSvc.createCertificate(this.myCertificate)
        .then(() => {
          alert('Certificado guardado');
          this.myCertificate = this.resetCertificate();
        });
    }
  }

  editCertificate(cert: Certificate) {
    this.myCertificate = { ...cert };
  }

  deleteCertificate(id?: string) {
    if (id && confirm('¿Eliminar este certificado?')) {
      this.certSvc.deleteCertificate(id)
        .then(() => alert('Certificado eliminado'));
    }
  }
}
