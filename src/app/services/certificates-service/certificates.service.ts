import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model'; // Ruta corregida

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';
  certificatesRef: AngularFirestoreCollection<Certificates>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates(): AngularFirestoreCollection<Certificates> {
    return this.certificatesRef;
  }

  createCertificates(cert: Certificates): any {
    return this.certificatesRef.add({ ...cert });
  }

  deleteCertificates(id: string): Promise<void> {
    return this.certificatesRef.doc(id).delete();
  }
}
