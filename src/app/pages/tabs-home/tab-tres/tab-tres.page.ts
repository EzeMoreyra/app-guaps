import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Directory, Filesystem, WriteFileOptions } from '@capacitor/filesystem';
import { jsPDF } from 'jspdf';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IonBackButton, IonSelect, IonSelectOption, IonCheckbox, IonModal, IonAvatar, IonList, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonImg, IonButton, IonButtons, IonMenuButton, IonMenu, IonIcon, IonContent, IonHeader, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonRouterLink, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-tres',
  templateUrl: './tab-tres.page.html',
  styleUrls: ['./tab-tres.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, ReactiveFormsModule, CommonModule, FormsModule,
    IonRouterLink, RouterLink,
    IonBackButton,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonModal,
    IonImg,
    IonButton,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonItem,
    IonInput,
    IonLabel,
    IonIcon,
    IonAvatar,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonInputPasswordToggle,
    //LoginFormPage
  ]
  })
export class TabTresPage implements OnInit {

  
  registroLibreta!: FormGroup; 

  private libretaCompleta: any[] = []

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

   

  ngOnInit() {
    
    this.registroLibreta = this.formBuilder.group({
    veterinaria: new FormControl<string | null>('', [Validators.required]),
    diagnostico: new FormControl<string | null>('', [Validators.required]),
    libreta: new FormControl<string | null>('', [Validators.required]),
    tratamiento: new FormControl<string | null>('', [Validators.required]),
    turno: new FormControl<string | null>('', [Validators.required])
  })
   this.registroLibreta
    this.completarLibreta()
  }


  completarLibreta(){
    const completarRegistro = this.registroLibreta.value;

    this.libretaCompleta.push(completarRegistro);
    console.log('Libreta Completa:', completarRegistro);
    console.log('lista:', this.libretaCompleta);
  }

  isValid(): boolean {
    const formValues = this.registroLibreta.value;
    return formValues.veterinaria.length > 0 && formValues.diagnostico.length > 0 && formValues.libreta.length > 0 && formValues.tratamiento > 0 && formValues.turno !== this.registroLibreta; 
    };

  /////////////////////////////////////////////////////////////////////////////////////
  //Exportación a PDF

  //IMPORTANTE: añadir los siguientes permisos en el android.manifest:
  // <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
   async formularioPDF(): Promise<void> {
    const pdfFormulario = 'base64/PDF-base64.pdf';
    const contentBase64= 'JVBERi0xLjQKJaqrrK0KMSAwIG9iago8PAovVGl0bGUgKF...';

    const fileOptions: WriteFileOptions = {
      path: pdfFormulario,
      data: contentBase64,
      directory: Directory.Documents,
      recursive: true
    };

    await Filesystem.writeFile(fileOptions);
  }

  //guardar en string un pdf
  /*async creaPdfDesdeTexto() {
    const formularioAPdf: "text/plane.text.pdf"
    const text = this.registroLibreta.value;
    const pdf = new jsPDF();
    pdf.text(text, 10, 10);
    const pdfOutput = pdf.output('datauristring');
    await this.savePDF(formularioAPdf, pdfOutput)
    
}*/
  //////////////////////////////////////////////////////////////////////

  onSubmit(){
    if(this.registroLibreta.valid){
    this.completarLibreta();
    console.log('Formulario enviado:', this.registroLibreta.value);
    }else{
      alert('Por favor, complete todos los datos')
    }
    
  }
}
