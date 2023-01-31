import { FirebaseError } from 'firebase/app';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import { collections } from '../../../model/db/config';
import { getOne, update } from '../../../model/db/services';
import { UpdateUser } from '../../../types';
import { ValuesUpdateUser } from '../../../view/components/Home/userOptions/UserProfile/EditProfile';

export const updateCurrentUser = async (
  id: string | undefined,
  updateData: ValuesUpdateUser
) => {
  try {
    const user = await getOne(collections.users, id ?? '');
    if (user) {
      const updatedUser: UpdateUser = {
        cel: user.cel,
        chats: user.chats,
        contacts: user.contacts,
        description: updateData.description,
        email: user.email,
        firstname: updateData.firstname,
        lastname: updateData.lastname,
        isConnected: user.isConnected ?? false,
        lastTime:
          user.lastTime ??
          new Date().toLocaleDateString('en-US', DateTime.DATE_SHORT),
        password: user.password,
        profileImg: updateData.profileImg,
      };
      await update(id ?? '', collections.users, updatedUser);
      Swal.fire('Usuario actualizado corectamente');
    }
  } catch (error: Error | FirebaseError | unknown) {
    if (error instanceof FirebaseError) {
      Swal.fire(error.message);
    } else if (error instanceof Error) {
      console.log(error);
      Swal.fire(error.message);
    } else Swal.fire('Algo ha fallado');
  }
};
