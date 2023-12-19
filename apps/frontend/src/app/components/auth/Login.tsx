import {
  IonButton,
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
  IonToast,
  IonToolbar,
} from '@ionic/react';
import {
  CenteredContainer,
  CenteredIonCard,
  CenteredIonCardHeader,
  CenteredIonInputContainer,
  CenteredIonText,
  SignInWithGoogleButton,
} from './styles';
import { trpc } from '../../../utils/trpc';
import { useCallback, useEffect, useState } from 'react';
import { validateEmail, validatePassword } from '@dnd-assistant/shared-utils';
import { getIonInputClassNames } from './input';

export const Login: React.FC = () => {
  const login = trpc.user.login.useMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [loginIsDisabled, setLoginIsDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const loginHook = useCallback(() => {
    setLoginIsDisabled(true);
    login.mutate({
      email,
      password,
    });
  }, [email, password, login]);

  useEffect(() => {
    if (login.isSuccess) {
      localStorage.setItem('authToken', login.data);
    } else if (login.isError) {
      setLoginIsDisabled(false);
      setShowToast(true);
    }
  }, [login.data, login.isSuccess]);

  useEffect(() => {
    if (login.error) {
      const statusCode = login.error?.data?.httpStatus;
      switch (statusCode) {
        case 400:
          setToastMessage('The email or password you submited is incorrect.');
          break;
        default:
          setToastMessage('Oops, something went wrong, please try again.');
      }
      setLoginIsDisabled(false);
      setShowToast(true);
    }
  }, [login.error]);

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

  const disableLoginButton =
    loginIsDisabled || !passwordIsValid || !emailIsValid;

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
                  disabled={loginIsDisabled}
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
                  disabled={loginIsDisabled}
                  onIonInput={(e) =>
                    passwordInputHandler(e.target.value as string)
                  }
                  onIonBlur={() => setPasswordIsTouched(false)}
                />
              </IonItem>
            </CenteredIonInputContainer>
            <br />
            <CenteredContainer>
              <IonButton onClick={loginHook} disabled={disableLoginButton}>
                Login
              </IonButton>
              <IonToast
                isOpen={showToast}
                color="danger"
                message={toastMessage}
                onDidDismiss={() => setShowToast(false)}
                duration={5000}
              />
              <IonButton fill="clear">Forgot</IonButton>
            </CenteredContainer>
            <SignInWithGoogleButton />
            <IonItem lines="none">
              <CenteredIonText>
                <sub>
                  To register for an account click{' '}
                  <IonRouterLink routerLink="/auth/register">
                    here!
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
