import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCT6ZV0VB5n34ifsQD_YgRGpdVkeg1-9fg',
  authDomain: 'calcbet-51c93.firebaseapp.com',
  projectId: 'calcbet-51c93',
  storageBucket: 'calcbet-51c93.appspot.com',
  messagingSenderId: '695689407525',
  appId: '1:695689407525:web:7cb3d8c48bc4c5549f63cc',
  measurementId: 'G-7E3ZDDR18F',
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
