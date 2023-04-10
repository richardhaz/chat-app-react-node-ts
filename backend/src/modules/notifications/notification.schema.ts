import { model, Schema } from 'mongoose';

import { NotificationModel } from '@/models';

const Notification = new Schema<NotificationModel>(
  {
    context: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
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

export const NotificationSchema = model('notifications', Notification);
