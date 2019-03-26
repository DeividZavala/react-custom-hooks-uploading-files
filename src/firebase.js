import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore';
// Initialize Firebase
const config = {
    apiKey: "AIzaSyBR166UPVG8dk4kQRn7dI9revtfAz8RqhM",
    authDomain: "tests-4cafc.firebaseapp.com",
    databaseURL: "https://tests-4cafc.firebaseio.com",
    projectId: "tests-4cafc",
    storageBucket: "tests-4cafc.appspot.com",
    messagingSenderId: "701538060757"
};
firebase.initializeApp(config);

const databaseRef = firebase.firestore().collection("chelas");
const bucketRef = firebase.storage().ref("/hooks");

export function uploadFiles(files){
    let tasks = [];
    for (let file of files){
        let uploadTask = bucketRef.child(file.name).put(file).then(snap => snap.ref.getDownloadURL());
        tasks.push(uploadTask);
    }
    return Promise.all(tasks).then(link => link)
}

export function getBeers(){
    return databaseRef.get()
        .then(snap => {
            let chelas = [];
            snap.forEach(chela => {
                chelas.push(chela.data())
            });
            return chelas;
        }).catch(err=>console.error(err))
}

export function saveBeer(beer){
    let id = databaseRef.doc().id;
    beer.id = id;
    return databaseRef.doc(id).set(beer)
}

export default firebase;
