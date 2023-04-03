import mongoose, { model, Schema } from 'mongoose';

import { MESSAGE_STATUS } from '@/constants';
import { MessageModel } from '@/models';

const Message = new Schema<MessageModel>(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      status: {
        enum: MESSAGE_STATUS,
        type: String,
        required: true,
        default: MESSAGE_STATUS.DELIVERED,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MessageSchema = model('messages', Message);
