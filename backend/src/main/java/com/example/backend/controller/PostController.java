package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.PostDTO;
import com.example.backend.model.Post;
import com.example.backend.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Get all posts for the logged-in user
    @GetMapping("/byLoggedInUser")
    public List<PostDTO> getUserPostsByLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        return postService.getPostsByUserEmail(userEmail);
    }

    // Get all posts
    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    // Create a post for the logged-in user
    @PostMapping
    public Post createPost(@RequestBody PostDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        dto.setUserEmail(userEmail);

        // Validate the image URLs before saving
        if (dto.getImages() == null || dto.getImages().isEmpty()) {
            throw new IllegalArgumentException("At least one image URL is required.");
        }

        return postService.createPost(dto);
    }

    // Update a post
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody PostDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        if (!postService.isPostOwnedByUser(id, userEmail)) {
            return ResponseEntity.status(403).build();
        }

        Post updatedPost = postService.updatePost(id, dto);
        return ResponseEntity.ok(updatedPost);
    }

    // Delete a post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        if (!postService.isPostOwnedByUser(id, userEmail)) {
            return ResponseEntity.status(403).build();
        }

        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // Update the visibility of a post
    @PutMapping("/{id}/visibility")
    public ResponseEntity<Post> updateVisibility(@PathVariable String id, @RequestBody Map<String, Boolean> body) {
        Boolean isPublic = body.get("isPublic");
        if (isPublic == null) {
            return ResponseEntity.badRequest().build();
        }
        Post updatedPost = postService.updateVisibility(id, isPublic);
        return ResponseEntity.ok(updatedPost);
    }

    // Get only public posts for the home page
    @GetMapping("/public")
    public List<PostDTO> getPublicPosts() {
        return postService.getPublicPosts();
    }
}