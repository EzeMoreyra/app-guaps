import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces';
import {  IonicModule,AlertController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';
import { App } from '@capacitor/app';


@Component({
  selector: 'app-tab-cuatro',
  templateUrl: './tab-cuatro.page.html',
  styleUrls: ['./tab-cuatro.page.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule,IonicModule, NgIf],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabCuatroPage implements OnInit {

  
  @Input({ required: false }) user!: User| null;
  
  modalOpen: boolean = false;
  photoUrl: string = '';
  usuarios!: User[]
  images: string[] = ["https://images.pexels.com/photos/14068127/pexels-photo-14068127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/19084523/pexels-photo-19084523/free-photo-of-gente-caminando-bosque-arboles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
  photoUser:  string = '';

  ajustesForm: FormGroup = new FormGroup({
    nombre: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl<string | null>('', [Validators.required, Validators.minLength(4)]),
  });

 

  constructor(private router: Router,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _utilService:  UtilService,
    private alertController: AlertController
  ) { }


  async  ngOnInit() {
  this.llenarForm()
  this.route.queryParams.subscribe(params => {
    if (params['photoUrl']) {
      this.photoUrl = params['photoUrl'];
      console.log('Foto de perfil actualizada:', this.photoUrl);
    } else {
      this.loadPhotoProfile();
    }
  });
}

  async llenarForm() {
      const user = await this._authService.getLoggedInUser();
      const userDocu = await this._authService.getUserDocument({ uid: user.uid });
  
      if (user.uid) {
        this.ajustesForm.patchValue({
          nombre: userDocu.nombre,
          apellido: userDocu.apellido,
        });
        console.log('Datos recuperados del formulario:', userDocu);
        console.log('Valores del form:', this.ajustesForm.value);
        return this.ajustesForm.value
      } else {
        console.log('No se encontró el usuario');
      
    } 
  }

  async onSubmit() {
    if (this.ajustesForm.valid) {
      const saving = await this._utilService.Saving();
      await saving.present();
      const formValues = this.ajustesForm.value;
      const user = await this._authService.getLoggedInUser();
  
      await this._authService.setUserDocument({
        nombre: formValues.nombre,
        apellido: formValues.apellido,
      });
  
      console.log('Perfil actualizado:', formValues);
      this.closeModal();
      saving.dismiss()
    } else {
      console.error('Formulario no válido');
      
      this.closeModal();
      
    }
  }
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
  openCamara() {
    this.router.navigate(['/camara'], { queryParams: { takePhoto: true } });
  }

  async closeSessionUser() {
    const confirm = await this.confirmationAlert();
    if (confirm) {
      try {
        const userClose = await this._authService.signOut();
        console.log('Cierre de sesión exitosa!.', userClose);
        App.exitApp();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  }

  async confirmationAlert(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de cerrar la sesión?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('El usuario no cerró sesión.');
              resolve(false);
            }
          },
          {
            text: 'Sí',
            handler: () => {
              console.log('El usuario cerró sesión.');
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }
  async editPassword() {
    const confirm = await this.confirmationPassword();
    if (confirm) {
      try {
        const editPassword = await this._authService.sendPasswordResetEmail();
        console.log('Se envió de email!.', editPassword);
        App.exitApp();
      } catch (error) {
        console.error('Error al mandar email:', error);
      }
    }
  }

  async confirmationPassword(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de cambiar la contraseña?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('El usuario canceló');
              resolve(false);
            }
          },
          {
            text: 'Sí',
            handler: () => {
              console.log('El usuario confirmo el cambio de email.');
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }
  async loadPhotoProfile() {
    const user = await this._authService.getLoggedInUser();
    if (user) {
      this.photoUrl = user.photoUrl || null;
    }
  }
}
