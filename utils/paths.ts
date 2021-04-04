import { mkdir } from "fs";
import { FileUpload } from "../context";
import { logger } from "./logger";
import { randStr } from "./randomStringGenerator";

export const paths = async (file: FileUpload): Promise<string | null> => {
  const { mimetype, filename } = await file;
  const [fileType] = mimetype.split('/');
  mkdir(
    `${
      fileType === 'image'
        ? 'media/images'
        : fileType === 'video'
        ? 'media/videos'
        : fileType === 'application'
        ? 'media/docs'
        : null
    }`,
    { recursive: true },
    (err) => {
      if (err) logger.error(err.message, err)
    }
  );
  
  const mediaPath =
    fileType === 'image'
      ? `media/images/${randStr}_${filename}`
      : fileType === 'video'
      ? `media/videos/${randStr}_${filename}`
      : fileType === 'application'
      ? `media/${randStr}_${filename}`
      : null;

      return new Promise(resolve => mediaPath ? resolve(mediaPath) : resolve(null))
}
