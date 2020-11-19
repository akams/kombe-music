import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import getHeaders from '../constants/HeadersApi';
import { getUser } from '../firebase/firestore/user';

export default function useAuthListener(firebase, dispatchSetUsersFunction) {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged((val) => {
      setUser(val);
    });

    const authInterceptor = axios.interceptors.request.use(
      async (config) => {
        const token = await firebase.auth.currentUser.getIdToken();
        config.headers = {
          ...getHeaders(token),
        };
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      listener();
      axios.interceptors.request.eject(authInterceptor);
    };
  }, []);

  if (user && typeof user === 'object') {
    if (user.emailVerified) {
      getUser(firebase.firestore, user.uid)
        .then((dataUser) => {
          dispatchSetUsersFunction({ uid: user.uid, ...dataUser.data });
        })
        .catch((error) => {
          firebase.logout();
          console.error({ error });
          toast.error(`Error: ${error}`);
        });
    }
  }

  return { user };
}
