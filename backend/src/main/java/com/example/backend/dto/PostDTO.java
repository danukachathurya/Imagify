package com.example.backend.dto;

public class PostDTO {
    private String id;
    private String caption;
    private String images;
    private boolean isPublic;
    private String userEmail;
    private String username;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public String getImages() { return images; }
    public void setImages(String images) { this.images = images; }

    public boolean getIsPublic() { return isPublic; }
    public void setIsPublic(boolean isPublic) { this.isPublic = isPublic; }
}