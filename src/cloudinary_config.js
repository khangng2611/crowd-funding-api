import {v2 as cloudinary} from 'cloudinary';
import {} from 'dotenv/config'
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});

const getFilenameWithoutExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return filename;
    }
    return filename.substring(0, lastDotIndex);
  }

const imgUpload = async (img) => {
    try {
        let imgName = getFilenameWithoutExtension(img.name);
        let filePath = './temp';
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        filePath = filePath + '/' + imgName;
        let result = "";
        await img.mv(filePath);
        result = await cloudinary.uploader.upload(filePath, { public_id: imgName, });
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        return result['url'];
    }
    catch (e) {
        throw new Error(e);
    }
}

export {imgUpload}