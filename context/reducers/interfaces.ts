import { Reaction, ReactionGroup, Tuser } from "@/store/types";

export interface IMessage {
  _id: string;
  chatId: string;
  content: string;
  chat: IChat;
  file: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
  isReply: {
    messageId: IMessage;
    repliedBy: Tuser;
  };
  isEdit: {
    messageId: IMessage;
    editedBy: Tuser;
  };
  reactions: Reaction[];
  reactionsGroup: ReactionGroup[];
  totalReactions: number;
  sender: Tuser;
  type: string;
  status: string;
  removedBy: Tuser;
  // who seen message and there counts
  seenBy: Tuser[];
  totalseenBy: number;
  isSeen: boolean;
}

export interface IChat {
  _id: string;
  chatId?: string;
  latestMessage?: IMessage ;
  isGroupChat: boolean;
  chatName: string;

  userInfo: Tuser;
  groupInfo: { description: string; image: { url: string;  } };
  groupAdmin?: Tuser[];
  users: Tuser[];
  unseenCount: number;
  createdAt: string;
  chatBlockedBy: Tuser[];
  image:{ url: string;  }
}

export interface State {
  user: Tuser | null;
  selectedChat: IChat | null;
  isSelectedChat: IChat | null;
  messages: IMessage[];
  totalMessagesCount: number;
  totalChats: number;
  chats: IChat[];
}

export interface Action {
  type: string;
  payload?: any;
}
