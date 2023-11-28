import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

export const Auth: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Auth</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
    </IonPage>
  );
};