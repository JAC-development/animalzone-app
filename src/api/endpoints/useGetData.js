import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import { app } from 'firebaseConfig';
import { encryptPassword } from 'utils/encrypt';
import bcrypt from 'bcryptjs';

// get the firestore
const firestore = getFirestore(app);

export default async function handleGetData(email, password) {
  encryptPassword('hola');
  const snapshot = await getDocs(query(collection(firestore, 'usuarios'), where('email', '==', email)));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.email,
    password: doc.password,
    ...doc.data(),
  }));

  if (data[0] !== undefined) {
    const passDecript = await bcrypt.compare(password, data[0].password);

    if (data[0].email === email && passDecript) {
      return data[0];
    } else {
      return false;
    }
  } else {
    return false;
  }
}
