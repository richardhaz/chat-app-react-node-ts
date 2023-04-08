import { Request, Response } from 'express';

import { ConversationModel } from '@/models';
import { ErrorManager } from '@/utils';

import { UserService } from '../users/user.service';
import { ConversationService } from './conversation.service';
import { CreateConversationDto, FindAllMyConversationsDto, FindConversationDto, UpdateConversationDto } from './dtos';

const findConversation = async (req: Request, res: Response) => {
  try {
    const dto = req.body as FindConversationDto;
    const conversation = await ConversationService.findConversation(dto);

    return res.status(201).json({ ok: true, data: conversation });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_FIND_CONVERSATION');
  }
};

const findAllMyConversations = async (req: Request, res: Response) => {
  try {
    const dto = req.body as FindAllMyConversationsDto;
    const conversations = (await ConversationService.findAllMyConversations(dto)) as ConversationModel[];

    const filtetedConversations = await Promise.all(
      conversations.map(async (cvs) => ({
        _id: cvs._id,
        members: cvs.members,
        lastMessage: cvs.lastMessage,
        senderId: cvs.senderId,
        contact: await UserService.findById(dto.senderId === cvs.members[0] ? cvs.members[1] : cvs.members[0]),
        createdAt: cvs.createdAt,
        updatedAt: cvs.updatedAt,
      })),
    );

    return res.status(200).json({ ok: true, data: filtetedConversations });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_FIND_ALL_MY_CONVERSATIONS');
  }
};

const createConversation = async (req: Request, res: Response) => {
  try {
    const dto = req.body as CreateConversationDto;

    const findConversationDto = { member1: dto.member1, member2: dto.member2 };

    const foundConversation = await ConversationService.findConversation(findConversationDto);

    // if found conversation only update the senderId and lastMessage
    if (foundConversation.length > 0) {
      const updateDto: UpdateConversationDto = {
        conversationId: `${foundConversation[0]._id}`,
        lastMessage: dto.lastMessage,
        senderId: dto.senderId,
      };
      const result = await ConversationService.update(updateDto);
      return res.status(201).json({ ok: true, data: result, message: 'Last Message & senderId Updated' });
    }

    const conversation = await ConversationService.create(dto);

    return res.status(201).json({ ok: true, data: conversation, message: 'Conversaton created' });
  } catch (error) {
    return ErrorManager(res, error, 'ERROR_CREATE_CONVERSATION');
  }
};

export const ConversationController = { findConversation, createConversation, findAllMyConversations };
