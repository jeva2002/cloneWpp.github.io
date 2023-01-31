import { deleteMessage } from '../../../../../controller/handlers/home';
import { ContactData, Message as IMessage } from '../../../../../types';
import Message from './Message/Message';

interface Props {
  currentChat: ContactData | undefined;
}

const MessagesList: React.FunctionComponent<Props> = ({ currentChat }) => {
  const handleDelete = (message: IMessage) => {
    deleteMessage(message, currentChat);
  };

  return (
    <section className='messages-list d-flex flex-column'>
      {currentChat?.chat?.messages
        ? currentChat?.chat.messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              handleDelete={handleDelete}
            />
          ))
        : null}
    </section>
  );
};

export default MessagesList;
