/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_FIREBASE_APIKEY: string,
  VITE_FIREBASE_AUTHDOMAIN: string,
  VITE_FIREBASE_PROJECTID: string,
  VITE_FIREBASE_STORAGEBUCKET: string,
  VITE_FIREBASE_MESSAGINGSENDERID: string,
  VITE_FIREBASE_APPID: string,
  VITE_FIREBASE_MEASUREMENTID: string,
  VITE_API_BASE_URL: string
}