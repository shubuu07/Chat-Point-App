import axios from 'axios';
import { atob } from 'react-native-quick-base64';
import config from '../env';
import { logout, setToken } from '../../redux/slice/authSlice';
import NavigationService from '../firebase/NavigationService';

const customAxios = axios.create({
  baseURL: `${config.API_URL}`,
});

let store
export const injectStore = _store => {
  store = _store
};

customAxios.interceptors.request.use(
  (config) => {
    let token = store.getState().auth.accessToken;
    console.log("token--------------", token);
    const parsedToked = parseJwt(token);
    getTokenExpiryTimeRemaining(parsedToked.exp);
    if (!token) {
      console.log("Token is not there");
      store.dispatch(logout());
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
      try {
        if (token && parsedToked.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (parsedToked.exp < currentTime) {
            console.log('Token has expired. Redirecting to login...');
            // store.dispatch(logout());
            // NavigationService.navigate('login');
            let refreshToken = store.getState().auth.refreshToken;
            GetNewToken(refreshToken)
            console.log("generate token now");
          } else {
            return config;
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle decoding errors
      }
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


const getTokenExpiryTimeRemaining = (expiryTime) => {
  const expirationTime = expiryTime * 1000;
  const currentTime = Date.now();
  const timeDifference = expirationTime - currentTime;
  const remainingMinutes = Math.floor(timeDifference / (1000 * 60));
  console.log("remainingMinutes------->", remainingMinutes);
  let refreshToken = store.getState().auth.refreshToken;
  if (remainingMinutes < 10) {
    GetNewToken(refreshToken)
    console.log("generate token now");
  }
  return remainingMinutes;
};

const parseJwt = (token) => {
  var base64Url = token?.split('.')[1];
  try {
    while (base64Url?.length % 4) {
      base64Url += '=';
    }
    var base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64)?.split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (error) {
    console.log(error);
  }
  return JSON.parse(jsonPayload);
};

const GetNewToken = async (refreshToken) => {
  const refreshUrl = config.API_URL + "api/token/refresh/";
  // if (!isTokenExpired(refreshToken)) {
  //   RootNavigation.navigate('SignIn');
  //   store.dispatch(SetIsLogged(false));
  // }
  const params = JSON.stringify({
    refresh: refreshToken
  })
  axios.post(refreshUrl, params, {
    headers: {
      "content-type": "application/json",
    },
  }).then(async response => {
    console.log("response.data.acces------>", response.data);
    const authSlicePayload = {
      refreshToken: refreshToken,
      accessToken: response.data.access,
      isLogged: true,
    };
    store.dispatch(setToken(authSlicePayload));
    // await AsyncStorage.setItem("@storage_Key", response.data.access)
  }).catch((error) => {
    console.log("error--->", error);
  })
}

export default customAxios;
