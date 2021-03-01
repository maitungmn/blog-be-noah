"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogCol = exports.usersCol = exports.firestore = exports.realTimeDB = exports.adminAuth = exports.firebaseAdmin = void 0;
const firebaseAdmin = require("firebase-admin");
exports.firebaseAdmin = firebaseAdmin;
const configs_1 = require("./configs");
const serviceAccount = require("../../firebase-admin.json");
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: serviceAccount.private_key,
            clientEmail: serviceAccount.client_email,
            projectId: serviceAccount.project_id,
        }),
        databaseURL: configs_1.default.databaseURL,
    });
}
exports.adminAuth = firebaseAdmin.auth();
exports.realTimeDB = firebaseAdmin.database();
exports.firestore = firebaseAdmin.firestore();
const usersCol = (userID = "") => exports.realTimeDB.ref("Users/" + (userID || ""));
exports.usersCol = usersCol;
exports.blogCol = exports.firestore.collection("blogs");
//# sourceMappingURL=admin.js.map