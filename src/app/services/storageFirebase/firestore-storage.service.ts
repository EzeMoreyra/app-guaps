import { Injectable } from '@angular/core';
import { FirebaseStorage } from '@capacitor-firebase/storage';
import { AuthService } from '../auth/auth.service';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({
  providedIn: 'root'
})
export class FirestoreStorageService {

constructor(private _authSevice:  AuthService,) { }

async uploadFile(fileUri: string, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log('Subiendo archivo desde:', fileUri); 

    FirebaseStorage.uploadFile(
      {
        path: `images/${fileName}`,
        uri: fileUri,
      },
      (event) => {
        if (event?.completed) {
          this.getDownloadUrl(fileName)
            .then(resolve)
            .catch(reject);
        }
      }
    ).catch((error) => {
      console.error('Error al subir el archivo:', error);
      reject(error);
    });
  });
}
private async getDownloadUrl(fileName: string): Promise<string> {
  try {
    const { downloadUrl } = await FirebaseStorage.getDownloadUrl({
      path: `images/${fileName}`,
    });
    return downloadUrl;
  } catch (error) {
    console.error('Error al obtener la URL de descarga:', error);
    throw error; 

  }
}
  async updateProfile(params: { photoUrl: string; nombre: string; apellido: string }) {
    const user = await this._authSevice.getLoggedInUser();
    await FirebaseFirestore.updateDocument({
      reference: `Users/${user.uid}`,
      data: {
        uid: user.uid,
        nombre: params.nombre,
        apellido: params.apellido,
        photoUrl: params.photoUrl, 
      }
    });
    await FirebaseAuthentication.updateProfile({
      displayName: `${params.nombre} ${params.apellido}`,
      photoUrl: `${params?.photoUrl}`
    });
  }

  
 
 
  // Pendiente---------------------------------------------------------------------
  async deleteFile(){
    await FirebaseStorage.deleteFile({
      path: 'images/mountains.png',
    });
  };
  
  async listFiles(){
    const { items } = await FirebaseStorage.listFiles({
      path: 'images',
    });
    return items;
  };
  
  async getMetadata(){
    const result = await FirebaseStorage.getMetadata({
      path: 'images/mountains.png',
    });
    return result;
  };
  
  async updateMetadata(){
    await FirebaseStorage.updateMetadata({
      path: 'images/mountains.png',
      metadata: {
        contentType: 'image/png',
        customMetadata: {
          foo: 'bar',
        },
      },
    });
  };
  
  async useEmulator(){
    await FirebaseStorage.useEmulator({
      host: '10.0.2.2',
      port: 9001,
    });
  };
}
