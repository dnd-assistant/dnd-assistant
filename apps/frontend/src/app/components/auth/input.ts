import { InputState } from './types';

const isValid = (inputState: InputState) => {
  return inputState === InputState.Enabled;
};

const isError = (inputState: InputState) => {
  return inputState === InputState.Error;
};

export const isDisabled = (inputState: InputState) => {
  return inputState === InputState.Disabled;
};

export const getIonInputClassNames = (
  inputState: InputState,
  isTouched: boolean
) => {
  return `${isValid(inputState) && 'ion-valid'} ${
    isError(inputState) && 'ion-invalid'
  } ${isTouched && 'ion-touched'}`;
};
