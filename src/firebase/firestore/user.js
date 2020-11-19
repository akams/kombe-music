import { toast } from 'react-toastify';
import { mergeArraysByKeyId } from '../../helpers/array';

/**
 * Récupère l'utilisateur par l'uid
 * @param {*} firestore
 */
export async function getUser(firestore, uid) {
  const user = {};
  const userRef = firestore.collection('users').doc(uid);
  const doc = await userRef.get();
  if (doc.exists) {
    user.id = doc.id;
    user.data = doc.data();
  } else {
    console.log('No such document!');
  }
  return user;
}

const pageSize = 10;
const field = 'lastname';

export async function getAll(firestore) {
  let datas = [];
  const docRef = firestore.collection('users').orderBy(field, 'desc').limit(pageSize);
  const querySnapshot = await docRef.get();
  const users = [];
  querySnapshot.forEach(function (doc) {
    users.push({ id: doc.id, ...doc.data() });
  });

  const collectionCompanies = firestore.collection('companies');
  if (users.length !== 0) {
    const reads = users.map((user) => collectionCompanies.doc(user.id).get());
    const results = await Promise.all(reads);
    const companies = results.map((v) => ({ id: v.id, ...v.data() }));
    const merge = mergeArraysByKeyId(users, companies, 'id');
    datas = merge.map((m) => ({
      ...m,
      company: m.name,
    }));
  }
  return datas;
}

export async function nextPage(firestore, last) {
  let datas = [];
  const docRef = firestore.collection('users').orderBy(field, 'desc').startAfter(last[field]).limit(pageSize);
  const querySnapshot = await docRef.get();
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  const collectionCompanies = firestore.collection('companies');
  if (users.length !== 0) {
    const reads = users.map((user) => collectionCompanies.doc(user.id).get());
    const results = await Promise.all(reads);
    const companies = results.map((v) => ({ id: v.id, ...v.data() }));
    const merge = mergeArraysByKeyId(users, companies, 'id');
    datas = merge.map((m) => ({
      ...m,
      company: m.name,
    }));
  }
  return datas;
}

export async function prevPage(firestore, first) {
  let datas = [];
  const docRef = firestore.collection('users').orderBy(field, 'desc').endBefore(first[field]).limitToLast(pageSize);
  const querySnapshot = await docRef.get();
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  const collectionCompanies = firestore.collection('companies');
  if (users.length !== 0) {
    const reads = users.map((user) => collectionCompanies.doc(user.id).get());
    const results = await Promise.all(reads);
    const companies = results.map((v) => ({ id: v.id, ...v.data() }));
    const merge = mergeArraysByKeyId(users, companies, 'id');
    datas = merge.map((m) => ({
      ...m,
      company: m.name,
    }));
  }
  return datas;
}

export async function deleteUser(firestore, uid) {
  try {
    const userRef = firestore.collection('users').doc(uid);
    await userRef.delete();
    toast.success('La suppression a bien été effectuer');
  } catch (error) {
    console.error({ error });
    toast.error(`Error: ${error}`);
  }
}
