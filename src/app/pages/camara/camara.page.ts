import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonThumbnail, IonTitle, IonToolbar, IonModal,AlertController ,IonBackButton, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonFabList, IonList, IonItem, IonImg, IonButton, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonAvatar } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreStorageService } from 'src/app/services/storageFirebase/firestore-storage.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonButton, IonImg, IonModal, IonItem, IonList, IonFabList, IonIcon, IonThumbnail, IonFabButton, IonFab, IonCol, IonRow, IonGrid, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CameraPage implements OnInit {

  @Output() photoUrlChanged = new EventEmitter<string | null>();
  images: string[] = ["https://images.pexels.com/photos/14068127/pexels-photo-14068127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/19084523/pexels-photo-19084523/free-photo-of-gente-caminando-bosque-arboles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"];
  userPhotoUrl: string | null = null;
  temporaryPhotoUrl: string | null = null;
 

  constructor(
    private _authService: AuthService,
    private _fireStore:FirestoreStorageService,
    private alertController: AlertController,
    private _util: UtilService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadPhotoProfile();
  }
  async openCameraOrGalery(camera: boolean) {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.Uri,
        source: camera ? CameraSource.Camera : CameraSource.Photos,
      });
  
      const imageUrl = image.webPath;
  
      if (imageUrl) {
        this.images.push(imageUrl); 
        const confirm = await this.confirmPhotoSelection(imageUrl);
        if (confirm) {
          const fileName = `profile_${new Date().getTime()}.jpg`;
          const downloadUrl = await this._fireStore.uploadFile(image.path, fileName);
          const user = await this._authService.getLoggedInUser();
          const userDocu = await this._authService.getUserDocument({ uid: user.uid });
  
          await this._authService.setUserDocument({
            nombre: userDocu.nombre,
            apellido: userDocu.apellido,
            photoUrl: downloadUrl,
          });
  
          this.userPhotoUrl = downloadUrl;
          console.log('Perfil actualizado con la nueva foto:', downloadUrl);
          this.navCtrl.navigateBack(['/tab-cuatro'], {
            queryParams: { photoUrl: downloadUrl }
          });
        } else {
          console.log('El usuario no eligió usar la imagen.');
        }
      }
    } catch (error) {
      console.error('Error al abrir la cámara o galería:', error);
    }
  }
  
  async saveImageToGalery(imageUrl: string) {
    try {
      const base64Data = await this.getBase64Image(imageUrl);
      const fileName = `temp_${new Date().getTime()}.jpg`;
      //instaló el pluguin  que me permite almacenar datos de manera persistente o gestionar las imagenes
      //Guarda las fotos  en el dispositivo
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.ExternalStorage, // Donde se guarda la imden -->almacenamiento externo del dispositivo 
      });
      console.log('Imagen guardada en la galería:', fileName);
    } catch (error) {
      console.error('Error al guardar la imagen en la galería:', error);
    }
  }
   //Convierte las imagenes en formato Base64 -->string o texto
  // Para enviar las imágenes al servidor de fire-store
  async getBase64Image(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  //Es una alerta 
  private async confirmPhotoSelection(photoUrl: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres usar esta foto como tu foto de perfil?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('El usuario no eligió la imagen.');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('El usuario eligió la imagen:', photoUrl);
            return true; 
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role !== 'cancel'; 
  }

  
  async selectImage(image: string) {
    try {
      const confirm = await this.confirmPhotoSelection(image);
      
      if (confirm) {
        console.log('Subiendo imagen:', image);
        const fileName = `profile_${new Date().getTime()}.jpg`;
        const downloadUrl = await this._fireStore.uploadFile(image, fileName); 

        const user = await this._authService.getLoggedInUser();
        const userDocu = await this._authService.getUserDocument({ uid: user.uid });
      
        await this._authService.setUserDocument({
          nombre: userDocu.nombre,
          apellido: userDocu.apellido,
          photoUrl: downloadUrl,
        });
        this.userPhotoUrl = downloadUrl; 
        const readImage = await this._util.readFilePath(fileName)
        console.log('Foto de galería seleccionada y subida:', downloadUrl);
        console.log('Foto de leida:', readImage);

      } else {
        console.log('El usuario no eligió usar la imagen.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen de la galería:', error);
    }
  }
  
  async getBlobFromURI(uri: string): Promise<Blob> {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  async loadPhotoProfile() {
    const user = await this._authService.getLoggedInUser();
    if (user) {
      this.userPhotoUrl = user.photoUrl || null;
    }
  }
}