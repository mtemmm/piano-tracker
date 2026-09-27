package com.mt.pianotracker.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mt.pianotracker.services.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Cloudinary cloudinary;

    public FileStorageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadFile(MultipartFile file) {

        try {
            Map<?,?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
            return uploadResult.get("secure_url").toString();
        }
        catch (IOException e){
            throw new RuntimeException("Failed uploading - " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteFile(String url) {
        try {
            String publicId = extractPublicIdFromUrl(url);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Error while deleting a file " + e.getMessage());
        }
    }

    private String extractPublicIdFromUrl(String url) {
        int lastSlashIndex = url.lastIndexOf('/');
        int lastDotIndex = url.lastIndexOf('.');
        if(lastSlashIndex != -1 && lastDotIndex != -1 && lastDotIndex > lastSlashIndex){
            return url.substring(lastSlashIndex + 1, lastDotIndex);
        }

        return url;
    }
}
