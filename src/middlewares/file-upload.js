import multer from "multer" 
import path, { dirname } from "path"
import { fileURLToPath } from "url"

export const __dirname = dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
   destination(req, file, cb){
      const directory = path.resolve(__dirname, '..', 'public', 'images')
      cb(null, directory);
   },
   filename(req, file, cb){
      const {profileId} = req.params
      const fileExtension = path.extname(file.originalname);
      cb(null, profileId + fileExtension);
   }
})

const imagesTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
   if(imagesTypes.includes(file.mimetype)){
      cb(null, true);
   }else{
      const error = new Error('Invalid file type. Only PNG, JPG, and JPEG files are allowed.');
      error.code = 'INVALID_FILE_TYPE';
      cb(error, false);
   }
}

export const fileUpload = multer({
   storage, fileFilter,
   limits:{
      fileSize: 1024 * 1024 * 10  //10 mb
   }
})

