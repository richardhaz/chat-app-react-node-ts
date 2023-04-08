import { model, Schema } from 'mongoose';

import { ConversationModel } from '@/models';

const Conversation = new Schema<ConversationModel>(
  {
    members: [
      {
        type: String,
        required: true,
      },
    ],
    lastMessage: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ConversationSchema = model('conversations', Conversation);
