import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonRouterLink, IonTitle, IonToolbar, IonMenuButton, AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { LoginFormPage } from '../login-form/login-form.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { UtilService } from 'src/app/services/util.service';
import { UserR } from 'src/app/interfaces/user-regiter';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
  standalone: true,
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink,IonRouterLink,IonBackButton,IonButton, IonInput,IonMenuButton,ReactiveFormsModule]
})
export class RegisterFormPage  {
  
  loading = false;
  
  registerForm: FormGroup= new FormGroup( {
    nombre:new FormControl< string | null >('',[Validators.required, Validators.minLength(3)]),
    apellido: new FormControl< string | null >('',[Validators.required, Validators.minLength(4)]),
    email: new FormControl< string | null >('',[Validators.required, Validators.email]),
    password: new FormControl< string | null >('',[Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl< string | null >('',[Validators.required, Validators.minLength(6)]),
  });
 
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _utilService: UtilService,
    private alertController: AlertController
  ) {
    
   }

  async onSubmit() {
    
    if (this.isValid()){
      const loading = await this._utilService.loading();
      await loading.present();
      
      const ususarioRegistrado = this._authService.registerWithEmail(this.registerForm.value as UserR).then( async res => {
        console.log(ususarioRegistrado)
        loading.dismiss()
        this.router.navigate(['/login-form'])
      }).catch(error =>{
        console.log('Hay un error al registrar un usuario', error);
        this.presentAlert()
      }).finally(()=>{
        loading.dismiss()
      }
        
      );
    }
    
    
  }; 

  isValid(): boolean {
    const formValues = this.registerForm.value;
    return formValues.password.length > 0 && formValues.email.length > 0 && formValues.rePassword.length > 0 && formValues.password === formValues.rePassword && formValues.email !== this._authService.getValidEmail; 
    };

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El usuario  existe o las contraseñas no coinciden.',
        buttons: ['Cerrar'],
      });
  
      await alert.present();
    }

   
}
