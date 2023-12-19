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
import { validateEmail, validatePassword } from '@dnd-assistant/shared-utils';
import { getIonInputClassNames } from './input';
import { trpc } from '../../../utils/trpc';

export const Register: React.FC = () => {
  const register = trpc.user.register.useMutation();
  const [email, setEmail] = useState('');
  const [registrationToastMessage, setRegistrationToastMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);
  const [registerIsDisabled, setRegisterIsDisabled] = useState(false);
  const [showRegistrationToast, setShowRegistrationToast] = useState(false);

  const registerHook = useCallback(() => {
    setRegisterIsDisabled(true);
    register.mutate({
      email,
      password,
    });
  }, [email, password]);

  useEffect(() => {
    if (register.isSuccess) {
      localStorage.setItem('authToken', register.data);
    }
  }, [register.data]);

  useEffect(() => {
    if (register.error) {
      const statusCode = register.error?.data?.httpStatus;
      switch (statusCode) {
        case 409:
          setRegistrationToastMessage('This user has already been registered.');
          break;
        default:
          setRegistrationToastMessage(
            'Oops, something went wrong, please try again.'
          );
      }
      setRegisterIsDisabled(false);
      setShowRegistrationToast(true);
    }
  }, [register.error]);

  const emailInputHandler = (value: string) => {
    const isValid = validateEmail(value);
    setEmailIsValid(isValid);
    setEmailIsTouched(true);
    setEmail(value);
  };

  const passwordInputHandler = (value: string) => {
    const isValid = validatePassword(value);
    setPasswordIsValid(isValid);
    setPasswordIsTouched(true);
    setPassword(value);
  };

  const confirmPasswordInputHandler = (value: string) => {
    const isValid = value === password;
    setConfirmPasswordIsValid(isValid);
    setConfirmPasswordIsTouched(true);
    setConfirmPassword(value);
  };

  const disableRegisterButton =
    registerIsDisabled ||
    !emailIsValid ||
    !passwordIsValid ||
    !confirmPasswordIsValid;

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
                  className={getIonInputClassNames(
                    emailIsValid,
                    emailIsTouched
                  )}
                  label="Email"
                  type="email"
                  labelPlacement="stacked"
                  placeholder="Enter your email"
                  value={email}
                  disabled={registerIsDisabled}
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
                    passwordIsValid,
                    passwordIsTouched
                  )}
                  label="Password"
                  type="password"
                  labelPlacement="stacked"
                  placeholder="Enter a password"
                  errorText="Passwords must be greater than 8 characters long"
                  value={password}
                  disabled={registerIsDisabled}
                  onIonInput={(e) =>
                    passwordInputHandler(e.target.value as string)
                  }
                  onIonBlur={() => setPasswordIsTouched(false)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  className={getIonInputClassNames(
                    confirmPasswordIsValid,
                    confirmPasswordIsTouched
                  )}
                  label="Confirm Password"
                  type="password"
                  labelPlacement="stacked"
                  placeholder="Confirm your password"
                  errorText="Passwords must match"
                  disabled={registerIsDisabled}
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
              <IonButton
                onClick={registerHook}
                disabled={disableRegisterButton}
              >
                Register
              </IonButton>
              <IonToast
                isOpen={showRegistrationToast}
                message={registrationToastMessage}
                color="danger"
                onDidDismiss={() => setShowRegistrationToast(false)}
                duration={5000}
              />
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
