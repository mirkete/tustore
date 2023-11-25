import {initializeApp} from "firebase/app"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCQwVjHKev47ftmn2vebYODgpNLCuYHXXs",
    authDomain: "tustore-27c6d.firebaseapp.com",
    projectId: "tustore-27c6d",
    storageBucket: "tustore-27c6d.appspot.com",
    messagingSenderId: "899362715329",
    appId: "1:899362715329:web:c84e903ff46153723c4640"
  };

const app = initializeApp(firebaseConfig)

const storage = getStorage(app, "gs://tustore-27c6d.appspot.com")


export async function uploadImage(imageData, {shopId, productId}){

    const data = new Uint8Array(imageData.buffer)
    const imageRef = ref(storage, `images/${shopId}/${productId}`)
    const fileMetaData = {
        contentType: imageData.mimetype
    }

    let url
    try{
        await uploadBytes(imageRef, data, fileMetaData)
        url = await getDownloadURL(imageRef)
    } catch(error){
        console.log(error)
        return {success: false, error}
    }

    return {success: true, url}
}