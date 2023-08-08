import { useEffect, ReactNode, Children } from 'react'
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import '../styles/globals.css'

// redux
import { store } from '../redux/store'
import { Provider } from 'react-redux'

//libraries
import { useRouter } from "next/router";

//firebase
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import { auth } from '../../firebaseApp';
import { setProviderData } from '../redux/slice/storeSlice';
import { useAppDispatch } from '../redux/hooks';
import { UserInfo } from '../interfaces';


type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};


const InitApp = ({ children }: { children: React.ReactNode }) => {

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user: any) => {
  //     console.log(user)
  //     if (user) {
  //       dispatch(setProviderData(user.providerData))
  //     }
  //     else router.push("/account")
  //   });

  //   // Clean up the listener when component unmounts
  //   return () => unsubscribe();
  // }, []);

  const dispatch = useAppDispatch()
  const router = useRouter()
  return (
    <>
      {children}
    </>
  )
}


function App({ Component, pageProps }: any) {

  //Dynamic layout. Layouts are located in the layouts folder
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <Provider store={store}>
      <InitApp>
        {getLayout(<Component {...pageProps} />)}
      </InitApp>
    </Provider>
  )
}

export default App
