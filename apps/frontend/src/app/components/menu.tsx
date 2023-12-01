import { IonCard, IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

export const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/home">
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/auth/login">
              <IonLabel>Login</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/auth/register">
              <IonLabel>Register</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};
