import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'  // file-system manager from node.js apply operations on file to read, write, unlink, copy, etc.


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const uploadResult = await cloudinary.uploader.upload(localFilePath,{
            resource_type : 'auto'
        });
        
        console.log('File has been uploaded successfully on Cloudinary !!');
        console.log(uploadResult); // uploadResult.url
        return uploadResult;

    } catch (error) {
        // First file is upoaded on local-server.
        // If file got corrupted while uploading, then remove that mallicious-file from system

        fs.unlinkSync(localFilePath);
        // remove the locally saved temporary file as the upload-operation got failed
        
        return null;
    }
}

export { uploadFile }

/* 
    (async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
*/