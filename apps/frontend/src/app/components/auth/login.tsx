import { IonButton, IonButtons, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { CenteredContainer, CenteredIonCard, CenteredIonCardHeader, CenteredIonInputContainer, CenteredIonText } from './styles';

export const Login: React.FC = () => {
  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <CenteredIonCard>
          <CenteredIonCardHeader>
            <IonCardTitle>Welcome Back!</IonCardTitle>
            <IonCardSubtitle>Your dungeon awaits you...</IonCardSubtitle>
          </CenteredIonCardHeader>
          <IonCardContent>
            <CenteredIonInputContainer>
              <IonItem>
                <IonInput label="Email" type="text" labelPlacement="stacked" placeholder="Enter your email" />
              </IonItem>
              <IonItem>
                <IonInput label="Password" type="password" labelPlacement="stacked" placeholder="Enter password" />
              </IonItem>
            </CenteredIonInputContainer>
            <br />
            <CenteredContainer>
              <IonButton>Login</IonButton>
              <IonButton fill="clear">Forgot</IonButton>
            </CenteredContainer>
            <IonItem lines="none">
              <CenteredIonText>
                <sub>
                  To register for an account click <IonRouterLink routerLink="/auth/register">here!</IonRouterLink>
                </sub>
              </CenteredIonText>
            </IonItem>
          </IonCardContent>
        </CenteredIonCard>
      </IonContent>
    </IonPage>
  );
};
