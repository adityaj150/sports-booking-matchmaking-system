import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Check if app is already initialized
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log("Firebase Admin Initialized");
    } catch (error) {
        console.error("Firebase Admin Initialization Failed:", error);
    }
}

export default admin;
