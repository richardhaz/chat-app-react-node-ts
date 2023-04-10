import { RequestExtended } from '@/models';

export const formatFileName = (req: RequestExtended, file: Express.Multer.File) => {
  const ext = file.originalname.split('.').pop();
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  req.imageName = `${file.fieldname}-${uniqueSuffix}.${ext}`;
  return req.imageName;
};
