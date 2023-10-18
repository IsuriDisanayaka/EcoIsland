package lk.cardiffmet.api.service;

import lk.cardiffmet.api.dto.PostDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/
public interface PostService {
    PostDto createPost(PostDto postDto);
     PostDto updatePost(int postId, PostDto postDto);
    PostDto getPost(int postId);
    void deletePost(int postId);
    List<PostDto> getAllPosts();
   PostDto verifyPost(int postId);

}
