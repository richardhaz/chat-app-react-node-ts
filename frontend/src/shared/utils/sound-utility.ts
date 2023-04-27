import messageSentSound from '@/assets/audio/message-sent-sound.mp3';
import notificationSound from '@/assets/audio/notification-sound.mp3';

export const playMessageSentSound = () => {
  new Audio(messageSentSound).play();
};

export const playNotificationSound = () => {
  new Audio(notificationSound).play();
};
