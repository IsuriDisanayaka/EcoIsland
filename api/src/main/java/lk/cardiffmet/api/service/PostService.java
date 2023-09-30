package lk.cardiffmet.api.service;

import lk.cardiffmet.api.dto.PostDto;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/
public interface PostService {
    PostDto  createPost(PostDto postDto);
    PostDto updatePost(Long postId, PostDto postDto);
    PostDto getPost(Long postId);
    void deletePost(Long postId);
}
