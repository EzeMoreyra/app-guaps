import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { IonBackButton, IonModal, IonAvatar, IonList, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonImg, IonButton, IonButtons, IonMenuButton, IonMenu, IonIcon, IonContent, IonHeader, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonRouterLink, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LoginFormPage } from '../../auth/login-form/login-form.page';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-tres',
  templateUrl: './tab-tres.page.html',
  styleUrls: ['./tab-tres.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,IonItem, IonTitle, IonToolbar, ReactiveFormsModule, CommonModule, FormsModule,IonRouterLink, RouterLink,IonBackButton,IonModal,IonImg,IonButton,IonButtons,IonMenu,IonMenuButton,IonItem,IonInput,IonLabel,IonIcon,IonAvatar,IonList,IonCard,IonCardContent,IonCardTitle,IonCardSubtitle,IonCardHeader,IonInputPasswordToggle,LoginFormPage
  ],
  })
export class TabTresPage implements OnInit {

  
  registroLibreta: FormGroup = new FormGroup({
    nombre: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    raza: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    fechaNacimiento: new FormControl<string | null>('', [Validators.required]),
    sexo: new FormControl<string | null>('', [Validators.required]),
    tipoMascosta: new FormControl<string | null>('', [Validators.required]),
    enfermedad: new FormControl<string | null >('', [Validators.required]),
    vacunas: new FormControl<string | null>('', [Validators.required]),
    veterinaria: new FormControl<string | null>('', [Validators.required]),
    nomPropietario: new FormControl<string | null>('', [Validators.required, Validators.minLength(4)]),
    apelPropietario: new FormControl<string | null>('', [Validators.required, Validators.minLength(4)]),
    direccion: new FormControl<string | null>('', [Validators.required]),
    telefono: new FormControl<string | null>('', [Validators.required]),  
    celular: new FormControl<string | null>('', [Validators.required])
  })

  constructor(private router: Router) { }

   

  ngOnInit() {
    this.registroLibreta
    this.completarLibreta()
  }

  completarLibreta(){}

  isValid(){

  }
  onSubmit(){
    console.log(this.registroLibreta.value)
  }
}
