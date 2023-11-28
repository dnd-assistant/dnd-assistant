import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar, RadioGroupCustomEvent } from '@ionic/react';
import React, { useRef } from 'react';

export const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonMenuToggle autoHide={false}>
        <IonItem routerLink="/auth">
          <IonLabel>Login / Register</IonLabel>
        </IonItem>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};
