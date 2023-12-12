import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        I'm sorry the route you are on does not exist.
      </IonContent>
    </IonPage>
  );
};
