import { Request, Response } from 'express';

import { MessageModel } from '@models/message.model';
import { RequestExtended } from '@models/req-extended.model';
import { ErrorManager } from '@utils/error-manager';

import { UserService } from '../users/user.service';
import { CreateMessageDto, GetChatMessageDto } from './dtos';
import { MessageService } from './message.service';

const createMessage = async (req: Request, res: Response) => {
  try {
    const dto = req.body as CreateMessageDto;
    const messages = await MessageService.createMessage(dto);
    return res.status(201).json({ ok: true, data: messages });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_CREATE_MESSAGE');
  }
};

const getAllMessages = async (req: RequestExtended, res: Response) => {
  try {
    const dto = req.body as GetChatMessageDto;
    const messages = (await MessageService.getAllMessages(dto)) as MessageModel[];
    const filteredMessages = messages.map((msg) => ({
      _id: msg._id,
      fromSelf: msg.sender.toString() === dto.from,
      senderId: msg.sender,
      messageIdentifier: msg.messageIdentifier,
      message: msg.message.text,
      status: msg.message.status,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
    }));
    return res.status(200).json({ ok: true, data: filteredMessages });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_GET_ALL_MESSAGES');
  }
};

const getLastestMessage = async (req: RequestExtended, res: Response) => {
  try {
    const dto = req.body as GetChatMessageDto;
    const messages = (await MessageService.getLastestMessage(dto)) as MessageModel[];
    const filteredMessages = await Promise.all(
      messages.map(async (msg) => ({
        _id: msg._id,
        receiverDetails: await UserService.findById(`${dto.to}`),
        message: msg.message.text,
        status: msg.message.status,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
      })),
    );

    return res.status(200).json({ ok: true, data: filteredMessages });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_GET_ALL_MESSAGES');
  }
};

export const MessageController = { createMessage, getAllMessages, getLastestMessage };
