import firebase from "firebase/app";
import "firebase/storage";

export async function uploadString(filedata, urlref) {
  let dataurl = "";
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
