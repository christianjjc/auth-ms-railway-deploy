import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  //   NATS_SERVERS: string[];
  JWT_SECRET: string;
  COOKIE_SECRET: string;
  COOKIE_JWT_TOKEN_KEY_SERVICE: string;

  URL_TO_DEFAULT_USER_IMAGE: string;

  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_UPLOAD_FOLDER: string;

  CLIENT_URL_ON_DEPLOY: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.string().required(),
    DB_USERNAME: joi.string().required(),

    // NATS_SERVERS: joi.array().items(joi.string().required()),
    JWT_SECRET: joi.string().required(),
    COOKIE_SECRET: joi.string().required(),
    COOKIE_JWT_TOKEN_KEY_SERVICE: joi.string().required(),

    URL_TO_DEFAULT_USER_IMAGE: joi.string().required(),

    CLOUDINARY_CLOUD_NAME: joi.string().required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),
    CLOUDINARY_UPLOAD_FOLDER: joi.string().required(),

    CLIENT_URL_ON_DEPLOY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  //* server micro service
  port: envVars.PORT,

  //* typeOrm
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUserName: envVars.DB_USERNAME,

  //* NATS
  //natsServers: envVars.NATS_SERVERS,
  jwtSecret: envVars.JWT_SECRET,
  cookieSecret: envVars.COOKIE_SECRET,
  cookieJwtTokenKeyService: envVars.COOKIE_JWT_TOKEN_KEY_SERVICE,

  urlToDefaultImage: envVars.URL_TO_DEFAULT_USER_IMAGE,

  cloudinaryCloudName: envVars.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: envVars.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: envVars.CLOUDINARY_API_SECRET,
  cloudinaryUploadFolder: envVars.CLOUDINARY_UPLOAD_FOLDER,

  clientUrlOnDeploy: envVars.CLIENT_URL_ON_DEPLOY,
};
