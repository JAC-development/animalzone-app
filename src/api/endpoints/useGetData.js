'use client';
import { getFirestore, collection, query, getDocs, where, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
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

export async function handleGetUser(user) {
  console.log(user, 'Este llegoooo');
  const snapshot = await getDocs(collection(firestore, 'attendance', user, 'assistance'));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function userExists(user) {
  console.log(user, 'Este llegoooo');
  const snapshot = await getDoc(doc(firestore, 'attendance', user));
  console.log(snapshot, 'exist');

  if (snapshot.exists()) {
    return true;
  } else {
    return false;
  }
}

export async function userStatus(user) {
  const snapshot = await getDoc(doc(firestore, 'attendance', user));

  const data = snapshot.data();
  return data.status;
}

export async function handleAddAttendance(data) {
  const exist = userExists(data.uid);
  if ((await exist) === true) {
    const status = await userStatus(data.uid);
    addDoc(collection(firestore, 'attendance', data.uid, 'history'), {
      uid: data.uid,
      user: data.user,
      inPlace: data.inPlace,
      date: data.date,
      status: status === 'entrada' ? 'salida' : 'entrada',
    })
      .then(async (res) => {
        console.log(res.id);
        console.log('status:', status);
        setDoc(doc(firestore, 'attendance', data.uid), { status: status === 'entrada' ? 'salida' : 'entrada' });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setDoc(doc(firestore, 'attendance', data.uid), { status: 'entrada' });
    addDoc(collection(firestore, 'attendance', data.uid, 'history'), {
      uid: data.uid,
      user: data.user,
      inPlace: data.inPlace,
      date: data.date,
      status: 'entrada',
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
