import React, { Suspense, lazy } from 'react';
import { useRoutes, usePath, navigate } from 'hookrouter';
import { Spin } from 'antd';
import {
        getIsAuth,
        postCurrentPath,
        getCurrentPath
      } from './pages/Auth/localStorage'
import './App.css';

const Main = lazy(() => import('./pages/Main'));
const Auth = lazy(() => import('./pages/Auth'));
const Navers = lazy(() => import('./pages/Navers'));
const Forms = lazy(() => import('./pages/Form'));

const routeProtect = {
  '/navers': () => <Navers />,
  '/register': () => <Forms mode="register"/>,
  '/edit': () => <Forms mode="edit"/>,
};

const routeDMZ = {
  '/': () => <Auth />,
};

export default function Router() {
  const zoneProtect = useRoutes(routeProtect);
  const zoneDMZ = useRoutes(routeDMZ);
  const  currentPath  =  usePath(false);

  React.useEffect(() => {
    if(!getIsAuth() && !Object.keys(routeDMZ).includes(currentPath)){
      navigate('/');
    }
    if(getIsAuth() && Object.keys(routeProtect).includes(currentPath)){
      postCurrentPath(currentPath);
    }
    if(getIsAuth() && !Object.keys(routeProtect).includes(currentPath)){
      navigate(getCurrentPath());
    }

  },[currentPath, zoneDMZ])

    return (
      <>
        <Suspense
          fallback={(
            <div key="spinner" className="spinner">
              <Spin size="large"/>
            </div>
          )}
        >
          {!getIsAuth() &&
                    zoneDMZ }

          {getIsAuth() &&
                  <Main>
                      {zoneProtect}
                  </Main>
          }
        </Suspense>
      </>
    )
}