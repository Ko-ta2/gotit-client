import { initializeApp, getApps, getApp, FirebaseError } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/** Firebase設定 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

/** Firebase初期化 */
const initFirebaseApp = () => {
  getApps().length ? getApp() : initializeApp(firebaseConfig);
};
initFirebaseApp();
const _auth = getAuth();

/** 認証 */
export class Auth {
  /**
   * ログイン
   * @param email - メールアドレス
   * @param password - パスワード
   * @returns ユーザ資格情報
   */
  static async logIn(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(_auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            error.message = "メールアドレスが間違っています。";
            break;
          case "auth/wrong-password":
            error.message = "パスワードが間違っています。";
            break;
          case "auth/user-not-found":
            error.message = "メールアドレスまたはパスワードが間違っています。";
            break;
          default:
            error.message = "認証に失敗しました。";
            break;
        }
      }
      throw error;
    }
  }

  /**
   * ログアウト
   */
  static async logOut() {
    try {
      return await signOut(_auth);
    } catch (error) {
      throw error;
    }
  }

  /**
   * ログインユーザ取得
   */
  static fetchLoginUser() {
    if (_auth.currentUser) return _auth.currentUser;
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(_auth, (user) => {
        resolve(user);
        unsubscribe();
      });
    });
  }
}
