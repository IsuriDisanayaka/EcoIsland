package lk.cardiffmet.api;
import lk.cardiffmet.api.dto.PostDto;
import lk.cardiffmet.api.entity.Post;
import lk.cardiffmet.api.entity.User;
import lk.cardiffmet.api.repo.PostRepo;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.service.impl.PostServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import org.mockito.MockitoAnnotations;


import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/13/23
 **/
@RunWith(MockitoJUnitRunner.class)
public class PostServiceImplTest {
    @InjectMocks
    private PostServiceImpl postService;

    @Mock
    private PostServiceImpl postServiceMock;
    @Mock
    private PostRepo postRepoMock;

    @Mock
    private PostRepo postRepo;

    @Mock
    private UserRepo userRepo;
    @Mock
    private UserRepo userRepoMock;

    private Post post;
    @Before
        public void setUp() {

        post = new Post();
        post.setPostId(1);
        post.setTitle("This is a test post");
        post.setContent("This is the content of the test post");
        post.setPrice(1000);

    }



    @Test
    public void createPostTest() {
        PostDto postDto = new PostDto();
        postDto.setTitle("This is a test post");
        postDto.setContent("This is the content of the test post");
        postDto.setPrice(1000);
        postDto.setId(1);

        postServiceMock.createPost(postDto);

        verify(postServiceMock, times(1)).createPost(any(PostDto.class));
    }

}