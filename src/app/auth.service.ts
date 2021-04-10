import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private eventAuthError = new BehaviorSubject<string>("");
    eventAuthError$ = this.eventAuthError.asObservable();

    newUser: any;

    constructor(private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router) {}

    getUserState(){
        return this.afAuth.authState;
    }

    login(email: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            this.eventAuthError.next(error);
        })
        .then(userCredential => {
            if(userCredential) {
                this.router.navigate(['/landingPage']);
            }
        })
    }
    createStore(email: string, password: string, storeNumber: string) {
        this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user?.updateProfile({
                displayName: storeNumber
            });
            const uid = userCredential.user?.uid;
            const userData = {
                email,
                storeNumber
            }

            this.db.doc(`Stores/${uid}`).set(userData)
                .then(() => {
                    this.router.navigate(['/landingPage'])
                });
        })
        .catch(error => {
            this.eventAuthError.next(error);
        })
    }
    logout() {
        this.router.navigate(['/']);
        return this.afAuth.signOut();
    }
}