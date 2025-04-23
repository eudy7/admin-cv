import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificate } from '../../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CertificatesService {
  private certCol: AngularFirestoreCollection<Certificate>;

  constructor(private afs: AngularFirestore) {
    this.certCol = afs.collection<Certificate>('certificates');
  }

  getCertificates() {
    return this.certCol.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({
          id: a.payload.doc.id,
          ...(a.payload.doc.data() as Certificate)
        }))
      )
    );
  }

  createCertificate(cert: Certificate) {
    return this.certCol.add({ ...cert });
  }

  updateCertificate(id: string, cert: Certificate) {
    return this.certCol.doc(id).update(cert);
  }

  deleteCertificate(id: string) {
    return this.certCol.doc(id).delete();
  }
}
