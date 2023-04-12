import { Request, Response } from 'express';

import { CreateGlobalMessageDto } from './dtos';
import { GlobalMessageService } from './global-messages.service';

const getAllMessages = async (_req: Request, res: Response) => {
  try {
    const result = await GlobalMessageService.getAllMessages();
    return res.status(200).json({ ok: true, data: result });
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async (req: Request, res: Response) => {
  try {
    const dto = req.body as CreateGlobalMessageDto;
    const result = await GlobalMessageService.createMessage(dto);
    return res.status(201).json({ ok: true, data: result });
  } catch (error) {
    console.log(error);
  }
};

export const GlobalMessageController = { getAllMessages, createMessage };
