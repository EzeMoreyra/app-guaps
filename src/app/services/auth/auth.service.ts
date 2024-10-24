import { Injectable } from '@angular/core';
import {FirebaseAuthentication} from "@capacitor-firebase/authentication";
import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { User } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
  ) {
  }

  async updateProfile(params: { nombre: string; apellido: string; photoUrl?: string }): Promise<void> {
    const profileData: { displayName: string; photoUrl?: string } = {
      displayName: `${params.nombre} ${params.apellido}`,
      photoUrl: params.photoUrl
    };
  
    
    if (params.photoUrl) {
      profileData.photoUrl = params.photoUrl;
    }
  
  
    await FirebaseAuthentication.updateProfile(profileData);
    console.log("Perfil actualizado:", profileData);
  }

  async registerWithEmail(
    params: { 
    nombre: string, 
    apellido: string, 
    email: string, 
    password: string, 
    rePassword: string
    photoUrl?: string}): Promise<any> {
    const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
      email: params.email,
      password: params.password,
    });
    
    await FirebaseFirestore.setDocument({
      reference: `Users/${result.user?.uid}`, 
      data: { 
        uid: result.user?.uid,
        nombre: params.nombre, 
        apellido: params.apellido, 
        email: params.email,
      }
    });

    await this.updateProfile({ nombre: params.nombre, apellido: params.apellido,photoUrl: params?.photoUrl });

    return result.user
    
  }

  async loginUser(
    params: { email: string, 
      password: string }): Promise<any> {
    const result = await FirebaseAuthentication.signInWithEmailAndPassword({
      email: params.email,
      password: params.password,
    });
    return result.user;
  }

  async getLoggedInUser() {
    const {user} = await FirebaseAuthentication.getCurrentUser();
    return user;
  }


  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }
  
  
  async getValidEmail (params: { 
    email: string}) {
    const { snapshots } = await FirebaseFirestore.getCollection({
      reference: 'Users',
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'email',
            opStr: '==',
            value: params.email
          },
        ],
      },

    });
    return snapshots.length > 0;
  };
  

  async setUserDocument(params: { nombre: string; apellido: string; photoUrl?: string }): Promise<void> {
    const user = await this.getLoggedInUser();
    try {
     
      await FirebaseFirestore.updateDocument({
        reference: `Users/${user.uid}`,
        data: {
          uid: user.uid,
          nombre: params.nombre,
          apellido: params.apellido,
          email: user.email,
          photoUrl: params.photoUrl || null, 
        }
      });
  
     
      await FirebaseAuthentication.updateProfile({
        displayName: `${params.nombre} ${params.apellido}`,
        photoUrl: params.photoUrl || '',
      });
  
      console.log('Documento y perfil actualizados con éxito');
    } catch (error) {
      console.error('Error al actualizar el documento o perfil:', error);
    }
  }


  async  getUserDocument(params: { uid: string }) {
    try {
      const { snapshot } = await FirebaseFirestore.getDocument({
        reference: `Users/${params.uid}`,
      });
      return snapshot.data as User;
      } catch (error) {
      console.error('Error al obtener el documento:', error);
      return null;
    }
  }
  
async updateDocument(params: {uid:string, nombre:string, apellido:string, email:string}) {
  await FirebaseFirestore.updateDocument({
    reference: `Users/${params.uid}`,
    data: { 
      uid:  params.uid,
      nombre: params.nombre,
      apellido:  params.apellido,
      email: params?.email
    },
  });

}

async sendPasswordResetEmail(){
  const user = this.getLoggedInUser()
  await FirebaseAuthentication.sendPasswordResetEmail({
    email: (await user).email,
  });
};
  
}
