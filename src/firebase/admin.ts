import * as firebaseAdmin from "firebase-admin";
import firebaseConfig from "./configs";
import * as serviceAccount from "../../firebase-admin.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: firebaseConfig.databaseURL,
  });
}

export { firebaseAdmin };
export const adminAuth = firebaseAdmin.auth()
export const realTimeDB = firebaseAdmin.database()
export const firestore = firebaseAdmin.firestore()

export const usersCol = (userID: string = "") => realTimeDB.ref("Users/" + (userID || ""));
export const blogCol = firestore.collection("blogs")
