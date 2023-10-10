package lk.cardiffmet.api.service.impl;

import lk.cardiffmet.api.dto.PostDto;
import lk.cardiffmet.api.entity.Post;
import lk.cardiffmet.api.entity.User;
import lk.cardiffmet.api.repo.PostRepo;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/
@Transactional
@Service
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final Storage storage;


    @Autowired
    public PostServiceImpl(PostRepo postRepo, UserRepo userRepo,Storage storage) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.storage = storage;
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepo.findAll();
        List<PostDto> postDtos = posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return postDtos;
    }

    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = convertToEntity(postDto);
        post.setStatus("pending");
        Post savedPost = postRepo.save(post);
        return convertToDTO(savedPost);
    }

      @Override
    public PostDto updatePost(int postId, PostDto postDto) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            Post existingPost = postOptional.get();
            existingPost.setTitle(postDto.getTitle());
            existingPost.setContent(postDto.getContent());
            existingPost.setPrice(postDto.getPrice());
            Post updatedPost = postRepo.save(existingPost);
            return convertToDTO(updatedPost);
        }
        throw new EntityNotFoundException("Post with ID " + postId + " not found");

    }

    @Override
    public PostDto getPost(int postId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            return convertToDTO(postOptional.get());
        }
        throw new EntityNotFoundException("Post with ID " + postId + " not found");
    }


    @Override
    public void deletePost(int postId) {
        postRepo.deleteById(postId);

    }
    @Override
    public PostDto verifyPost(int postId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            Post existingPost = postOptional.get();
            existingPost.setStatus("approved");
            Post updatedPost = postRepo.save(existingPost);
            return convertToDTO(updatedPost);
        }
        throw new EntityNotFoundException("Post with ID " + postId + " not found");
    }

    private PostDto convertToDTO(Post post) {
        PostDto postDto = new PostDto();
        postDto.setPostId(post.getPostId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setPrice(post.getPrice());
        postDto.setImageUrl(post.getImageUrl());
        postDto.setStatus(post.getStatus());
        postDto.setId(post.getUser().getId());
        postDto.setFristName(post.getUser().getFristName());
        postDto.setContact(post.getUser().getContact());
        postDto.setAddress(post.getUser().getAddress());

        System.out.println("User ID in convertToDTO: " + post.getUser().getId());

        return postDto;
    }





    private Post convertToEntity(PostDto postDto) {
        Post post = new Post();

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setPrice(postDto.getPrice());
         post.setImageUrl(postDto.getImageUrl());
        post.setStatus(postDto.getStatus());


        Optional<User> userOptional = userRepo.findById(postDto.getId());
        System.out.println("userId = " + postDto.getId());

        if (userOptional.isPresent()) {
            post.setUser(userOptional.get());
        } else {

            throw new EntityNotFoundException("User with ID " + postDto.getId() + " not found");
        }
        return post;
    }





}
