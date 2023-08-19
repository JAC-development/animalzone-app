'use client';
import { getFirestore, collection, query, getDocs, where, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { app } from 'firebaseConfig';
import bcrypt from 'bcryptjs';

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

export async function handleDeleteData(data) {
  console.log(data);
  if (data) {
    await deleteDoc(doc(firestore, 'usuarios', data))
      .then(() => {
        console.log('user deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function handleAddData(data) {
  console.log(data);
  if (data) {
    addDoc(collection(firestore, 'usuarios'), data)
      .then((res) => {
        console.log(res.id);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function handleGetAllData() {
  const snapshot = await getDocs(collection(firestore, 'usuarios'));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// export async function handleGetAllData() {
//   const snapshot = await getDocs(query(collection(firestore, 'usuarios'), where('email', '!=', '')));

//   const data = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return data;
// }
