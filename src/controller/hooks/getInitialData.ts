import { useEffect } from 'react';
import { Contact, ContactData, CurrentUserData } from '../../types';
import { getContacts, getActiveChats } from '../handlers/home';
import { useDispatch } from 'react-redux';
import { setActiveChats } from '../features';
import { setContacts, setCurrentChat } from '../features/chats';

export const useSetContacts = (currentUser: CurrentUserData | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      getContacts(
        currentUser.contacts.map((contact: Contact) => contact.cel)
      ).then((res) => {
        dispatch(setContacts(res));
      });
    }
  }, [currentUser]);
};

export const useSetActiveChats = (currentUser: CurrentUserData | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      getActiveChats(currentUser.id).then(
        (res: (ContactData | undefined)[]) => {
          dispatch(setActiveChats(res));
          if (res.length > 0) dispatch(setCurrentChat(res[0]));
        }
      );
    }
    return () => {
      dispatch(setCurrentChat(undefined));
    };
  }, [currentUser]);
};
