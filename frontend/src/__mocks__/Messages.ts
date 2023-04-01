import { MessageModel } from '@/shared/models';

export default [
  {
    _id: '39kd93k93ik93kr3r',
    message:
      'I dont really know what hes trynna to do but like i think hes overwelmed and i hope he gets better soon',
    createdAt: 'Today at 6:41 PM',
    startDate: 'January 29, 2023',
    users: [
      {
        _id: '30rfk3902k03kf03kd',
        email: 'larry123@gmail.com',
        firstName: 'Larry',
        lastName: 'Eschnetzel',
        avatar: 'https://i.pravatar.cc/150?img=43'
      },
      {
        _id: '10rfk390fk03kf03kd',
        email: 'pepe123@gmail.com',
        firstName: 'Pepe',
        lastName: 'Gonzales',
        avatar: 'https://i.pravatar.cc/150?img=15'
      }
    ],
    sentBy: ['30rfk3902k03kf03kd']
  },
  {
    _id: '29kd93k93ik934f9or3r',
    message: 'Its al g man, we dont really know when theryre gonna try to say something for us',
    createdAt: 'Today at 6:41 PM',
    startDate: 'January 29, 2023',
    users: [
      {
        _id: '30rfk3902k03kf03kd',
        email: 'larry123@gmail.com',
        firstName: 'Larry',
        lastName: 'Eschnetzel',
        avatar: 'https://i.pravatar.cc/150?img=43'
      },
      {
        _id: '10rfk390fk03kf03kd',
        email: 'pepe123@gmail.com',
        firstName: 'Pepe',
        lastName: 'Gonzales',
        avatar: 'https://i.pravatar.cc/150?img=15'
      }
    ],
    sentBy: ['10rfk390fk03kf03kd']
  }
] as MessageModel[];
