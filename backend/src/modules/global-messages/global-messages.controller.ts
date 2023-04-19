import { Request, Response } from 'express';

import { GlobalMessageModel } from '@models/global-message.model';
import { ErrorManager } from '@utils/error-manager';

import { CreateGlobalMessageDto, GetGlobalMessagesDto } from './dtos';
import { GlobalMessageService } from './global-messages.service';

const getAllMessages = async (req: Request, res: Response) => {
  try {
    const dto = req.body as GetGlobalMessagesDto;

    const globalMessages = (await GlobalMessageService.getAllMessages()) as GlobalMessageModel[];

    const result = await Promise.all(
      globalMessages.map(async (item) => ({
        _id: item._id,
        fromSelf: `${item.sender}` === dto.from,
        message: item.message.text,
        messageStatus: item.message.status,
        sender: await GlobalMessageService.getUserSocketDetail(`${item.sender}`),
        createdAt: item.createdAt,
        messageIdentifier: item.messageIdentifier,
        updatedAt: item.updatedAt,
      })),
    );

    return res.status(200).json({ ok: true, data: result });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_GET_ALL_GLOBAL_MESSAGES');
  }
};

const createMessage = async (req: Request, res: Response) => {
  try {
    const dto = req.body as CreateGlobalMessageDto;
    const result = await GlobalMessageService.createMessage(dto);
    return res.status(201).json({ ok: true, data: result });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_CREATE_GLOBAL_MESSAGE');
  }
};

export const GlobalMessageController = { getAllMessages, createMessage };
