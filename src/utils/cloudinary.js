import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Normalize path for Windows
        const safePath = path.resolve(localFilePath).replace(/\\/g, "/");

        const response = await cloudinary.uploader.upload(safePath, {
            resource_type: "auto"
        });

        console.log("File is uploaded:", response.url);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
