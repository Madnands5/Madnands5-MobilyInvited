import firebase from "firebase/app";
import "firebase/storage";

export async function uploadString(filedata, urlref) {
  let dataurl = "";
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyA5Hi5O5ODsGzQuLsj__E3LecmmoSTRzek",
      authDomain: "mobilly-invite.firebaseapp.com",
      projectId: "mobilly-invite",
      storageBucket: "mobilly-invite.appspot.com",
      messagingSenderId: "828075682004",
      appId: "1:828075682004:web:5a35293a7657af72b1f341",
      measurementId: "G-KX6SQRPLCB",
    });
  }

  const ref = await firebase.storage().ref("/Mob-invited/" + urlref);
  await ref.putString(filedata, "data_url").then(async (snapshot) => {
    console.log("fileuploaded");
    await ref.getDownloadURL().then((url) => {
      dataurl = url;
    });
  });
  return dataurl;
}
export async function getString(urlref) {
  var url = await firebase
    .storage()
    .ref("/Mob-invited/" + urlref)
    .getDownloadURL();
  return url;
}
