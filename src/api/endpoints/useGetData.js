'use client';
import { getFirestore, collection, query, getDocs, where, addDoc, setDoc, doc, getDoc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
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

export async function handleModifyData(data) {
  console.log(data);
  const ref = doc(firestore, 'usuarios', data._id);
  if (data) {
    await updateDoc(ref, { name: data.name, surname: data.surname, email: data.surname, rol: data.rol })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function handleGetUser(user) {
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

export async function handleIdToName(id) {
  const DocData = await getDoc(doc(firestore, 'usuarios', id));

  const data = DocData.data();

  return data.name + ' ' + data.surname;
}

export async function handleGetAllData() {
  const snapshot = await getDocs(collection(firestore, 'usuarios'));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function handleGetUserDates(ref) {
  const snapshot = await getDocs(query(collection(firestore, 'attendance', ref, 'history'), orderBy('date', 'desc')));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(data);

  return data;
}

export async function handleGetUserDatesPM(ref, refDate) {
  const snapshot = await getDocs(collection(firestore, 'attendance', ref, 'history'));

  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  const month = data.filter((date) => new Date(date.date.seconds * 1000).getMonth() === new Date(refDate).getMonth());

  return month.length;
}

export async function handleGetUserDatesListPM(ref, refDate) {
  const snapshot = await getDocs(collection(firestore, 'attendance', ref, 'history'));

  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  const month = data.filter((date) => new Date(date.date.seconds * 1000).getMonth() === new Date(refDate).getMonth());

  return month;
}
