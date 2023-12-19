import {
  IonButton,
  IonToast,
  IonButtons,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState, useCallback, useEffect } from 'react';
import {
  CenteredContainer,
  CenteredIonCard,
  CenteredIonCardHeader,
  CenteredIonInputContainer,
  CenteredIonText,
  SignInWithGoogleButton,
} from './styles';
import { InputState } from './types';
import { validateEmail, validatePassword } from '@dnd-assistant/shared-utils';
import { getIonInputClassNames, isDisabled } from './input';
import { trpc } from '../../../utils/trpc';

export const Register: React.FC = () => {
  const register = trpc.user.register.useMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const [emailState, setEmailState] = useState(InputState.Enabled);
  const [passwordState, setPasswordState] = useState(InputState.Enabled);
  const [confirmPasswordState, setConfirmPasswordState] = useState(
    InputState.Enabled
  );
  const [isRegistrationError, setIsRegistrationError] = useState(false);

  const registerHook = useCallback(() => {
    setEmailState(InputState.Disabled);
    setPasswordState(InputState.Disabled);
    register.mutate({
      email,
      password,
    });
  }, [email, password]);

  useEffect(() => {
    if (register.isSuccess) {
      console.log('Success');
      localStorage.setItem('authToken', register.data);
    } else if (register.isError) {
      setEmailState(InputState.Enabled);
      setPasswordState(InputState.Enabled);
      setIsRegistrationError(true);
    }
  }, [register.data]);

  const emailInputHandler = (value: string) => {
    validateEmail(value)
      ? setEmailState(InputState.Enabled)
      : setEmailState(InputState.Error);
    setEmailIsTouched(true);
    setEmail(value);
  };

  const passwordInputHandler = (value: string) => {
    validatePassword(value)
      ? setPasswordState(InputState.Enabled)
      : setPasswordState(InputState.Error);
    setPasswordIsTouched(true);
    setPassword(value);
  };

  const confirmPasswordInputHandler = (value: string) => {
    value === password
      ? setConfirmPasswordState(InputState.Enabled)
      : setConfirmPasswordState(InputState.Error);
    setConfirmPasswordIsTouched(true);
    setConfirmPassword(value);
  };

  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <CenteredIonCard>
          <CenteredIonCardHeader>
            <IonCardTitle>Welcome!</IonCardTitle>
            <IonCardSubtitle>Your dungeon awaits you...</IonCardSubtitle>
          </CenteredIonCardHeader>
          <IonCardContent>
            <CenteredIonInputContainer>
              <IonItem>
                <IonInput
                  className={getIonInputClassNames(emailState, emailIsTouched)}
                  label="Email"
                  type="email"
                  labelPlacement="stacked"
                  placeholder="Enter your email"
                  value={email}
                  disabled={isDisabled(emailState)}
                  errorText="Must enter a valid email"
                  onIonInput={(e) =>
                    emailInputHandler(e.target.value as string)
                  }
                  onIonBlur={() => setEmailIsTouched(false)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  className={getIonInputClassNames(
                    passwordState,
                    passwordIsTouched
                  )}
                  label="Password"
                  type="password"
                  labelPlacement="stacked"
                  placeholder="Enter a password"
                  errorText="Passwords must be greater than 8 characters long"
                  value={password}
                  disabled={isDisabled(passwordState)}
                  onIonInput={(e) =>
                    passwordInputHandler(e.target.value as string)
                  }
                  onIonBlur={() => setPasswordIsTouched(false)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  className={getIonInputClassNames(
                    confirmPasswordState,
                    confirmPasswordIsTouched
                  )}
                  label="Confirm Password"
                  type="password"
                  labelPlacement="stacked"
                  placeholder="Confirm your password"
                  errorText="Passwords must match"
                  disabled={isDisabled(confirmPasswordState)}
                  value={confirmPassword}
                  onIonInput={(e) =>
                    confirmPasswordInputHandler(e.target.value as string)
                  }
                  onIonBlur={() => setConfirmPasswordIsTouched(false)}
                />
              </IonItem>
            </CenteredIonInputContainer>
            <br />
            <CenteredContainer>
              <IonButton onClick={registerHook}>Register</IonButton>
              <IonToast
                isOpen={isRegistrationError}
                message="Oops, something went wrong, please try again"
                onDidDismiss={() => setIsRegistrationError(false)}
                duration={5000}
              ></IonToast>
            </CenteredContainer>
            <SignInWithGoogleButton />
            <IonItem lines="none">
              <CenteredIonText>
                <sub>
                  Already have an account?{' '}
                  <IonRouterLink routerLink="/auth/login">
                    Login here!
                  </IonRouterLink>
                </sub>
              </CenteredIonText>
            </IonItem>
          </IonCardContent>
        </CenteredIonCard>
      </IonContent>
    </IonPage>
  );
};
