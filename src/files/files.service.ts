import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { envs } from 'src/config';
import { v4 as uuid } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService {
  private readonly logger = new Logger('FilesService');
  constructor() {
    cloudinary.config({
      cloud_name: envs.cloudinaryCloudName,
      api_key: envs.cloudinaryApiKey,
      api_secret: envs.cloudinaryApiSecret,
    });
  }

  async processImageUser(files: Array<Express.Multer.File>, id: string, urlToDelete: string) {
    try {
      //! Change Name of files
      const filesWithNewName = [];
      files.map(async (file) => {
        file.originalname = `${id}--${uuid()}`;
        filesWithNewName.push(file);
      });
      await this.deleteUserImageOnCloudinary(urlToDelete);
      return await this.uploadImageToCloudinary(filesWithNewName);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async uploadImageToCloudinary(images: Array<Express.Multer.File>) {
    try {
      const urlsDevueltas = [];
      const uploadedPromises = images.map(async (image) => {
        try {
          const buffer = image.buffer;
          const base64Image = Buffer.from(buffer).toString('base64');
          return cloudinary.uploader
            .upload(`data:image/png;base64,${base64Image}`, { public_id: image.originalname, folder: envs.cloudinaryUploadFolder })
            .then((r) => {
              urlsDevueltas.push({ url: r.secure_url });
            });
        } catch (error) {
          console.error(error);
          return null;
        }
      });
      await Promise.all(uploadedPromises);
      return urlsDevueltas;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  deleteUserImageOnCloudinary = async (imageUrl: string) => {
    if (!imageUrl.startsWith('http')) {
      return {
        ok: false,
        message: 'Solo se pueden borrar imágenes subidas a la nube',
      };
    }
    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
    try {
      await cloudinary.uploader.destroy(`${envs.cloudinaryUploadFolder}/${imageName}`);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  };

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error!, check server logs.');
  }
}
