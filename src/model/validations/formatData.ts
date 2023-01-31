import { DocumentData } from "firebase/firestore";
import { CurrentUserData } from "../../types";

export const formatCurrentUser = (doc: unknown | undefined, id: string) => {
  if (doc) {
    const user: any = { ...doc };
    const formatedUser: CurrentUserData = {
      cel: user.cel,
      description: user.description,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      id: id,
      profileImg: user.profileImg,
      contacts: user.contacts,
      chat: user.chat,
    };
    return formatedUser;
  }
}