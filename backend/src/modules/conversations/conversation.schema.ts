import { model, Schema } from 'mongoose';

import { ConversationModel } from '@models/conversation.model';

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
    messageStatus: {
      type: String,
      default: 'delivered',
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
