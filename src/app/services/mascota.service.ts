import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Mascota } from '../interfaces/mascota.model';
import { CollectionReference, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private mascotaCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.mascotaCollection = collection(this.firestore, 'mascotas'); // Referencia a la colección 'mascotas'
  }

  async agregarMascota(mascota: Mascota): Promise<string> {
    const docRef = await addDoc(this.mascotaCollection, mascota); // Añade la mascota a Firestore
    return docRef.id; // Retorna el ID del documento creado
  }
}
