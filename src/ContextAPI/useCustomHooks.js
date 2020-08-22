import React from 'react';
import { ContextAPI } from './context';
import axios from "axios";
import { getToken, getIsAuth } from "../pages/Auth/localStorage";

const url = process.env.REACT_APP_URL_API

const useCustomHooks = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(ContextAPI);

  const api = axios.create({
    baseURL: url,
    header:{
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  if(getIsAuth()) {
    api.interceptors.request.use(async config => {
      const token = getToken()
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }, error =>
       Promise.reject(error)
    );
  }

  async function getAPI(config) {
    return new Promise((resolve, reject) => {
      api.get(...config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function postAPI(config) {
    return new Promise((resolve, reject) => {
      api.post(...config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function putAPI(config) {
    return new Promise((resolve, reject) => {
      api.put(...config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async function deleteAPI(config) {
    return new Promise((resolve, reject) => {
      api.delete(...config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {
    getAPI,
    postAPI,
    putAPI,
    deleteAPI
  }
};

export default useCustomHooks;
