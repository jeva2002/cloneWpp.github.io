import { DateTime } from 'luxon';
import { chatsCollection, collections } from '../../../model/db/config';
import { createDoc, getOne, update } from '../../../model/db/services';
import { NewChat, UpdateUser } from '../../../types';

const updateUserChats = async (participantId: string, chatId: string) => {
  const user = await getOne(collections.users, participantId);
  if (user) {
    const updatedUser: UpdateUser = {
      cel: user.cel,
      chats: user.chats ? [...user.chats, chatId] : [chatId],
      contacts: user.contacts,
      description: user.description,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      isConnected: user.isConnected ?? false,
      lastTime:
        user.lastTime ??
        new Date().toLocaleDateString('en-US', DateTime.DATE_SHORT),
      password: user.password,
      profileImg: user.profileImg,
    };
    await update(participantId ?? '', collections.users, updatedUser);
  }
};

export const createNewChat = async (
  message: string,
  currentUserId: string,
  contactId: string
) => {
  const newChat: NewChat = {
    messages: [
      {
        message: message,
        date: new Date().toLocaleDateString('en-US', DateTime.DATE_SHORT),
        hour: new Date()
          .toLocaleDateString('en-US', DateTime.TIME_WITH_SECONDS)
          .split(',')[1],
        sendBy: currentUserId ? currentUserId : '',
        viewed: false,
      },
    ],
    participants: [contactId, currentUserId],
  };
  try {
    const chat = await createDoc(chatsCollection, newChat);
    if (chat.id) {
      newChat.participants.forEach(
        async (participant) => await updateUserChats(participant, chat.id)
      );
    }
  } catch (error) {
    console.log(error);
  }
};
