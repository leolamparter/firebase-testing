// Firebase config (replace with your actual credentials)
const firebaseConfig = {
    apiKey: "AIzaSyClsnse44vK0tAFnQJckA5BuFlvh0bpGTo",
    authDomain: "financeforwardmain.firebaseapp.com",
    projectId: "financeforwardmain",
    storageBucket: "financeforwardmain.firebasestorage.app",
    messagingSenderId: "231522398265",
    appId: "1:231522398265:web:9147a7e9f4ffa218b55de8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DB Functions (Only using Firestore SDK functions)
let DB = {
    'user': {
        'create': async (hash) => {
            // Create a new user document in Firestore
            await addDoc(collection(db, "users"), { hash });
        },
        'get': async (hash) => {
            // Query users by hash, return first matching document
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return null; // No user found
            }
            return querySnapshot.docs[0].data(); // Return the first matched document
        },
        'update': async (hash, updates) => {
            // Query for the user with the given hash
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                // Update the user document with the provided updates
                await updateDoc(docRef, updates);
                return true; // Successfully updated
            }
            return false; // No matching user found
        },
        'exists': async (hash) => {
            // Check if the user with the given hash exists
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty; // Returns true if user exists
        },
        'delete': async (hash) => {
            // Query for the user with the given hash
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // Delete the document if it exists
                await deleteDoc(querySnapshot.docs[0].ref);
                return true; // Successfully deleted
            }
            return false; // No matching user found
        }
    },
    'u': {
        'create': async (hash) => {
            // Create and return a new user document ID
            const docRef = await addDoc(collection(db, "users"), { hash });
            return docRef.id; // Return the document ID of the newly created user
        },
        'get': async (hash) => {
            // Query for a user and return the data
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return null; // No user found
            }
            return querySnapshot.docs[0].data(); // Return the first matched document data
        },
        'update': async (hash, updates) => {
            // Query for the user and update their data
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, updates);
                return true; // Successfully updated
            }
            return false; // No matching user found
        },
        'exists': async (hash) => {
            // Check if the user exists
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty; // Return true if user exists
        },
        'delete': async (hash) => {
            // Delete a user document
            const q = query(collection(db, "users"), where("hash", "==", hash));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                await deleteDoc(querySnapshot.docs[0].ref);
                return null; // Successfully deleted
            }
            return null; // No matching user found
        }
    },
    'runQ': (query) => {
        // Run a custom query (for use with querying data)
        return getDocs(query);
    }
};

let version = "BETA 1.2";

// Export the DB functions for use in the global scope
window.DB = DB;
window.version = version;
