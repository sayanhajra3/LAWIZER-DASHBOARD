import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getStorage, type FirebaseStorage } from "firebase/storage"
import { getFirestore, type Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Lazy initialization to avoid build-time errors when env vars aren't set
let app: FirebaseApp | undefined
let auth: Auth | undefined
let storage: FirebaseStorage | undefined
let db: Firestore | undefined

function getApp(): FirebaseApp {
  if (!app) {
    if (!firebaseConfig.apiKey) {
      throw new Error("Firebase API key is not configured")
    }
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  }
  return app
}

function getAuthInstance(): Auth {
  if (!auth) {
    auth = getAuth(getApp())
  }
  return auth
}

function getStorageInstance(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getApp())
  }
  return storage
}

function getDbInstance(): Firestore {
  if (!db) {
    db = getFirestore(getApp())
  }
  return db
}

// Export getters that lazily initialize
export { getApp as app, getAuthInstance as auth, getStorageInstance as storage, getDbInstance as db }
