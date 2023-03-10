import {
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { database } from '../../../App';
import { createQuery, queryOperators } from '../config';

export const getAll = async (collection: CollectionReference<DocumentData>) => {
  const data = await getDocs(collection);
  return data.docs.map((item) => {
    return { ...item.data(), id: item.id };
  });
};

export const getWithQuery = async (
  collection: CollectionReference<DocumentData>,
  key: string,
  operator: queryOperators,
  value: any
) => {
  const q = createQuery(collection, key, operator, value);
  const data = await getDocs(q);
  const items = data.docs.map((item) => {
    const response: any = { ...item.data(), id: item.id };
    return response;
  });
  return items;
};

export const getOne = async (collection: string, id: string) => {
  const data = await getDoc(doc(database, collection, id));
  const response: any = { ...data.data(), id: data.id };
  return response;
};
