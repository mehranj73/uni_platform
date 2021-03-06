import LocalStorage from '../localStorage/LocalStorage';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export function updateToken(token) {
  return {
    type: UPDATE_TOKEN,
    payload: token,
  };
}

export function setUser(config) {
  return {
    type: SET_USER,
    payload: config,
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function resetUserThunk() {
  return (dispatch, getState) => {
    dispatch(resetUser());
    return LocalStorage.removeUserAsync();
  }
}

export function updateTokenThunk(token) {
  return (dispatch, getState) => {
    dispatch(updateToken(token));
    return LocalStorage.setUserAsync({auth_token: token});
  }
}

export function setUserThunk(config) {
  return (dispatch, getState) => {
    dispatch(setUser(config));
    return LocalStorage.setUserAsync(getState().users);
  }
}
