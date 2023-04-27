import mongoose, { model, Schema } from 'mongoose';

import { MESSAGE_STATUS } from '@constants/message.constant';
import { GlobalMessageModel } from '@models/global-message.model';

const GlobalMessages = new Schema<GlobalMessageModel>(
  {
    messageIdentifier: {
      type: String,
      required: false,
    },
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

export const GlobalMessageSchema = model('global_messages', GlobalMessages);
