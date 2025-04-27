package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "posts")
public class Post {

    @Id
    private String id;
    private String caption;
    private String images;
    private boolean isPublic;
    private String userEmail;

    public Post() {}

    public Post(String caption, String images, boolean isPublic, String userEmail) {
        this.caption = caption;
        this.images = images;
        this.isPublic = isPublic;
        this.userEmail = userEmail;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCaption() { return caption; }
    public void setTitle(String caption) { this.caption = caption; }

    public String getImages() { return images; }
    public void setImage(String images) { this.images = images; }

    public boolean getIsPublic() { return isPublic; }
    public void setIsPublic(boolean isPublic) { this.isPublic = isPublic; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

}