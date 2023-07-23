import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import { app } from 'firebaseConfig';

// get the firestore
const firestore = getFirestore(app);

export default async function handleGetData(email, password) {
  const snapshot = await getDocs(query(collection(firestore, 'usuarios'), where('email', '==', email)));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.email,
    password: doc.password,
    ...doc.data(),
  }));

  if (data[0].email === email && data[0].password === password) {
    return data[0];
  } else {
    return false;
  }
}
