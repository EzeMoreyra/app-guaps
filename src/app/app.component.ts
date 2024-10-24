import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import{ library, homeOutline, radio, personCircleOutline, arrowBackOutline,arrowForwardOutline,settingsOutline,exitOutline, createOutline,closeCircleOutline,arrowBackCircleOutline,cameraOutline,locationOutline,fileTrayFullOutline, alertCircleOutline,imagesOutline,imageOutline, addOutline, logOutOutline} from 'ionicons/icons'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() { addIcons({ library, homeOutline, radio, personCircleOutline, arrowBackOutline,arrowForwardOutline,settingsOutline,exitOutline, createOutline,closeCircleOutline,arrowBackCircleOutline,cameraOutline,locationOutline,fileTrayFullOutline, alertCircleOutline,imagesOutline,imageOutline, addOutline, logOutOutline });

}
}
