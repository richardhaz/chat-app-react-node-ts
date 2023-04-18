import multer from 'multer';
import multerS3 from 'multer-s3';

import { envConfig, s3 } from '@/config';
import { RequestExtended } from '@/models';
import { formatFileName } from '@/utils';

const bucket = `${envConfig().aws.s3.bucketName}`;
const projectName = `${envConfig().aws.s3.projectName}`;

const uploadFileMiddleware = (path: string) => {
  return multer({
    storage: multerS3({
      bucket,
      s3,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req: RequestExtended, file, cb) => {
        const fileName = formatFileName(req, file);
        const fullPath = `${projectName}/${path}/${fileName}`;
        cb(null, fullPath);
      },
    }),
  });
};

export { uploadFileMiddleware };
