package lk.cardiffmet.api.service.impl;

import lk.cardiffmet.api.dto.PostDto;
import lk.cardiffmet.api.entity.Post;
import lk.cardiffmet.api.repo.PostRepo;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/
@Transactional
@Service
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final UserRepo userRepo;

    @Autowired
    public PostServiceImpl(PostRepo postRepo, UserRepo userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = convertToEntity(postDto);
        post.setStatus("readytoapprove");
        Post savedPost = postRepo.save(post);
        return convertToDTO(savedPost);
    }

    @Override
    public PostDto updatePost(Long postId, PostDto postDto) {
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
    public PostDto getPost(Long postId) {
        Optional<Post> postOptional = postRepo.findById(postId);
        if (postOptional.isPresent()) {
            return convertToDTO(postOptional.get());
        }
        throw new EntityNotFoundException("Post with ID " + postId + " not found");
    }


    @Override
    public void deletePost(Long postId) {
        postRepo.deleteById(postId);

    }
    private PostDto convertToDTO(Post post) {
        PostDto postDto = new PostDto();
        postDto.setPostId(post.getPostId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setPrice(post.getPrice());
        postDto.setImage(post.getImage());
        postDto.setStatus(post.getStatus());
        postDto.setId(post.getUser().getId()); // Set the user ID
        return postDto;
    }
    private Post convertToEntity(PostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setPrice(postDto.getPrice());
        post.setImage(postDto.getImage());
        post.setStatus(postDto.getStatus());
        post.setUser(userRepo.findById(postDto.getId()).orElseThrow(() ->
                new EntityNotFoundException("User with ID " + postDto.getId() + " not found"))
        );
        return post;
    }
}
