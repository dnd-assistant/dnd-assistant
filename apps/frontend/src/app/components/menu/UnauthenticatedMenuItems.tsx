import { IonItem, IonLabel, IonMenuToggle } from '@ionic/react';
import { Routes } from '../../routes';

export const UnauthenticatedMenuItems: React.FC = () => {
  return (
    <>
      <IonMenuToggle autoHide={false}>
        <IonItem routerLink={Routes.Home}>
          <IonLabel>Home</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle autoHide={false}>
        <IonItem routerLink={Routes.Login}>
          <IonLabel>Login</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle autoHide={false}>
        <IonItem routerLink={Routes.Register}>
          <IonLabel>Register</IonLabel>
        </IonItem>
      </IonMenuToggle>
    </>
  );
};
