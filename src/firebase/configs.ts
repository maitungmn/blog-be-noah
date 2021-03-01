require('dotenv').config()

const firebaseConfig = {
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

export default firebaseConfig;
