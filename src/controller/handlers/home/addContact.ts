import { FirebaseError } from 'firebase/app';
import Swal from 'sweetalert2';
import { collections, queryOperators, usersCollection } from '../../../model/db/config';
import { getOne, getWithQuery, update } from '../../../model/db/services';
import { NewContact } from '../../../types';

const validateCurrentUser = (values: NewContact, currentUser: any) => {
  if (currentUser.cel && currentUser.contacts) {
    if (currentUser.cel === values.cel)
      throw new Error('No se puede agregar a uno mismo como contacto');
    if (currentUser.contacts.find((e: any) => e.cel === values.cel))
      throw new Error('El usuario ya existe como contacto');
  } else
    throw new Error(
      'El usuario actual parece no tener permiso en la plataforma'
    );
};

const updateCurrentUser = async (values: NewContact, id: any) => {
  const currentUser = await getOne('users', id);
  if (currentUser)
    return await update(id, collections.users, {
      ...currentUser,
      contacts: [...currentUser.contacts, { ...values }],
    });
};

const addContactHandler = async (
  values: NewContact,
  currentUser: any,
  callback: () => Promise<void>
) => {
  try {
    validateCurrentUser(values, currentUser);
    const newContact = await getWithQuery(
      usersCollection,
      'cel',
      queryOperators.equal,
      values.cel
    );
    if (newContact.length) {
      await updateCurrentUser(values, currentUser.id);
      await callback();
      Swal.fire('Se ha agregado un contacto correctamente');
    } else throw new Error('No existe usuario con este teléfono');
  } catch (error: Error | FirebaseError | unknown) {
    if (error instanceof FirebaseError) {
      Swal.fire(error.message);
    } else if (error instanceof Error) {
      console.log(error);
      Swal.fire(error.message);
    } else Swal.fire('Algo ha fallado');
  }
};

export default addContactHandler;
