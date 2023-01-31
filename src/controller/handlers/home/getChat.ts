import {
  chatsCollection,
  collections,
  queryOperators,
  usersCollection,
} from '../../../model/db/config';
import { getOne, getWithQuery } from '../../../model/db/services';
import { ContactData } from '../../../types';

const getContact = async (cel: number) => {
  const contact: any = await getWithQuery(
    usersCollection,
    'cel',
    queryOperators.equal,
    cel
  );
  const formatedContact: ContactData = {
    id: contact[0].id,
    cel,
    description: contact[0].description,
    profileImg: contact[0].profileImg,
    chat: contact[0].chat,
  };
  return formatedContact;
};

export const getContacts = (contacts: number[]) => {
  const contactsList = contacts.map(async (e) => await getContact(e));
  const result = Promise.all(contactsList).then((contacts) => {
    return contacts.map((contact) => {
      if (contact) {
        const formatedContact: ContactData = {
          id: contact?.id,
          cel: contact?.cel,
          description: contact?.description,
          profileImg: contact?.profileImg,
          chat: contact?.chat,
        };
        return formatedContact;
      } else return undefined;
    });
  });
  return result;
};

export const getActiveChats = async (currentUserId: string) => {
  const chats: any = await getWithQuery(
    chatsCollection,
    'participants',
    queryOperators.arrayContains,
    currentUserId
  );
  const contactsIdList = [
    ...chats.map((e: any) =>
      e.participants.filter((e: any) => e !== currentUserId)
    ),
  ].flat();

  const contactsList = contactsIdList.map(
    async (e) => await getOne(collections.users, e)
  );

  const result = Promise.all(contactsList).then((contacts) => {
    return contacts.map((contact, index) => {
      if (contact) {
        const formatedContact: ContactData = {
          id: contact?.id,
          cel: contact?.cel,
          description: contact?.description,
          profileImg: contact?.profileImg,
          chat: chats[index],
        };
        return formatedContact;
      } else return undefined;
    });
  });
  return result;
};
