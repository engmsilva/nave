export const AUTH = false;
export const TOKEN = '@token';
export const CURRENTPATH = '/';
export const EDITTEMP = {};


export const getIsAuth = () => sessionStorage.getItem(AUTH);
export const getToken = () => sessionStorage.getItem(TOKEN);
export const getCurrentPath = () => sessionStorage.getItem(CURRENTPATH);
export const getEditTemp = () => {
  let json = sessionStorage.getItem(EDITTEMP)
  return JSON.parse(json)
};

export const postIsAuth = status => {
  sessionStorage.setItem(AUTH, status);
};

export const postToken = token => {
  sessionStorage.setItem(TOKEN, token);
};

export const postEditTemp = data => {
  let json = JSON.stringify(data)
  sessionStorage.setItem(EDITTEMP, json);
};

export const postCurrentPath = path => {
  sessionStorage.setItem(CURRENTPATH, path);
};

export const logout = () => {
  sessionStorage.removeItem(AUTH);
  sessionStorage.removeItem(TOKEN);
  sessionStorage.removeItem(CURRENTPATH);
  sessionStorage.removeItem(EDITTEMP);
};