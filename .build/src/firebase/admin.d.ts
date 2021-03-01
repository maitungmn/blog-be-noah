import * as firebaseAdmin from "firebase-admin";
export { firebaseAdmin };
export declare const adminAuth: firebaseAdmin.auth.Auth;
export declare const realTimeDB: firebaseAdmin.database.Database;
export declare const firestore: FirebaseFirestore.Firestore;
export declare const usersCol: (userID?: string) => import("@firebase/database-types").Reference;
export declare const blogCol: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
