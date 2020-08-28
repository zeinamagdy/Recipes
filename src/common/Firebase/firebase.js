import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'
import 'firebase/firestore'
import { config } from './firebaseConfig'

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage()
    }
    // *** Auth API ***


    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    doSignOut = () => this.auth.signOut();
    current = () => this.auth.currentUser

    // *** User API ***

    user = uid => this.db.ref(`/users/${uid}`);
    updateUser = (uid, userInfo) => this.db.ref(`/users/${uid}`).set(userInfo)
    users = () => this.db.ref('users');
    imgUpload = img => this.storage.ref(`/images/${img.name}`).put(img)
    getImg = img => this.storage.ref(`/images/${img}`).getDownloadURL()
    // getImage = imgName => this.storage.ref("images").child(imgName).getDownloadURL()

}

export default Firebase;
