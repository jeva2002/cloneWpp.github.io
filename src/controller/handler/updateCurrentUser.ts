import { FirebaseError } from 'firebase/app';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import { collections } from '../../model/db/config';
import { getOne, update } from '../../model/db/crud';
import { UpdateUser } from '../../model/types';
import { ValuesUpdateUser } from '../../view/components/Home/userOptions/UserProfile/EditProfile';

export const updateCurrentUser = async (
  id: string,
  updateData: ValuesUpdateUser
) => {
  try {
    const user = await getOne(collections.users, id);
    if (user) {
      const updatedUser: UpdateUser = {
        cel: user.cel,
        chats: user.chat,
        contacts: user.contacts,
        description: updateData.description,
        email: user.email,
        firstname: updateData.firstname,
        lastname: updateData.lastname,
        isConnected: user.isConnected ?? false,
        lastTime: user.lastTime ?? new Date().toLocaleDateString('en-US', DateTime.DATE_SHORT),
        password: user.password,
        profileImg: updateData.profileImg,
      };
      await update(id, updatedUser);
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
