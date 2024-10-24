import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonContent, IonHeader, IonInput, IonRouterLink, IonTitle, IonToolbar,AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { User } from 'src/app/interfaces';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
  standalone: true,
  providers:[AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicStorageModule,IonContent, IonHeader,IonBackButton, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink,IonRouterLink,IonButton, IonInput,ReactiveFormsModule]
})
export class LoginFormPage implements OnInit{

  loginForm: FormGroup= new FormGroup({
    email: new FormControl< string | null >('', [Validators.required, Validators.email]),
    password: new FormControl< string | null >('',[Validators.required]) 
})
 

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private _authService: AuthService,
  private _utilService:  UtilService) { }

  
  
  ngOnInit(): void {
    
  }
   
  async onSubmit() {
    const valid = this.loginForm.valid;
    if (valid) {
      const loading = await this._utilService.loading();
      await loading.present();
     
      this._authService.loginUser(this.loginForm.value as User).then(res => {
        loading.dismiss()
        console.log('Inició sesión:',res);
        this.router.navigate(['/tabs-home'], { replaceUrl: true });
        
      }).catch(error =>{
        console.log('Hay un error al iniciar sesión', error);
        this._utilService.presentToast({
          message: 'El usuario no existe o los datos ingresados están incorrectos',
          duration:2500,
          color:'primary',
          position:'middle',
          icon:'alert-circle-outline'
        }).finally(()=>{
          loading.dismiss()
        })
        loading.dismiss()
        
      })

    }
  }
  


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El usuario no existe o los datos ingresados están incorrectos.',
      buttons: ['Cerrar'],
    });

    await alert.present();
  }
}
