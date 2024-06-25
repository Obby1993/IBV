
import { Options } from 'multer-storage-cloudinary';

import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import cloudinary from '../../../lib/cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request, Response } from 'express';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'events', // Nom du dossier où les images seront stockées sur Cloudinary
  } as Options['params'],
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.single('file');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    uploadMiddleware(req as unknown as Request, res as unknown as Response, (err: any) => {
      if (err) {
        return reject(new Error('Erreur lors du téléchargement de l\'image'));
      }
      const { file } = (req as any);
      if (!file) {
        return reject(new Error('Aucun fichier téléchargé'));
      }
      resolve(res.status(200).json({ url: file.path }));
    });
  });
}

export {};
