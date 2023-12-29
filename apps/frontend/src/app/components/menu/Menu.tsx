import {
  IonCard,
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useContext } from 'react';
import { SessionContext } from '../../context/session/SessionContext';
import { UnauthenticatedMenuItems } from './UnauthenticatedMenuItems';
import { AuthenticatedMenuItems } from './AuthenticatedMenuItems';

export const Menu: React.FC = () => {
  const { session } = useContext(SessionContext);

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          {session && <AuthenticatedMenuItems />}
          {!session && <UnauthenticatedMenuItems />}
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};
