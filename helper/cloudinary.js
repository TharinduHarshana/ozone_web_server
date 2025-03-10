const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: "dosh08loc",
    api_key: "648885616248498",
    api_secret: "4I0WITnCZoToyO6-Q3lXXaT7ero"

});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",

    })
    return result;
}

const upload = multer({storage: storage});
module.exports = {upload, ImageUploadUtil};