import { FirebaseError } from 'firebase/app';
import Swal from 'sweetalert2';
import { collections } from '../../../model/db/config';
import { getOne, update } from '../../../model/db/services';
import { ContactData, Message } from '../../../types';
import { DateTime } from 'luxon';

export const sendMessage = async (
  chatId: string,
  currentUserId: string | undefined,
  message: string
) => {
  try {
    const newMessage: Message = {
      message: message,
      date: new Date().toLocaleDateString('en-US', DateTime.DATE_SHORT),
      hour: new Date()
        .toLocaleDateString('en-US', DateTime.TIME_WITH_SECONDS)
        .split(',')[1],
      sendBy: currentUserId ? currentUserId : '',
      viewed: false,
    };
    const chat = await getOne(collections.chats, chatId);
    chat?.messages.push(newMessage);
    await update(chatId, collections.chats, chat);
  } catch (error: Error | FirebaseError | unknown) {
    if (error instanceof FirebaseError) {
      Swal.fire(error.message);
    } else if (error instanceof Error) {
      console.log(error);
      Swal.fire(error.message);
    } else Swal.fire('Algo ha fallado');
  }
};

export const deleteMessage = async (
  message: Message,
  contact: ContactData | undefined
) => {
  try {
    if (contact) {
      const chat = await getOne(collections.chats, contact.chat.id);
      if (chat) {
        chat.messages = contact.chat?.messages.filter(
          (item) => message !== item
        );
        await update(contact.chat.id, collections.chats, chat);
      }
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
