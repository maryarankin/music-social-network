import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import firebaseCredentials from './firebaseCredentials';

const app = initializeApp(firebaseCredentials);

// Get a reference to the database service
export const database = getDatabase(app);