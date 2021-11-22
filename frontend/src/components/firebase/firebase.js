import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import firebaseCredentials from './firebaseCredentials';
import firebase from 'firebase/compat/app';
import storage from 'firebase/compat/storage';

const app = firebase.initializeApp(firebaseCredentials);

// Get a reference to the database service
export const database = getDatabase(app);

export let fbStorage = firebase.storage();