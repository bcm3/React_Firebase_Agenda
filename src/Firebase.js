import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAvvN7h6MrgkaHI6shbpziuzC96s74wI_w",
  authDomain: "fir-react-f50b5.firebaseapp.com",
  databaseURL: "https://fir-react-f50b5.firebaseio.com",
  projectId: "fir-react-f50b5",
  storageBucket: "fir-react-f50b5.appspot.com",
  messagingSenderId: "726749058037"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
