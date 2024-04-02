export type Tuser = {
  _id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  role: string;
  createdAt: string;
  lastActive: string;
  isOnline:boolean
};

//reactions

export type Reaction = {
  _id: string;
  emoji: string;
  reactBy: Tuser;

  messageId: string;
  createdAt: string;
  updatedAt: string;
};
//reactions group
export type ReactionGroup = {
 _id: string;
 count:number
};
