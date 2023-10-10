package lk.cardiffmet.api;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import lk.cardiffmet.api.dto.UserDto;
import lk.cardiffmet.api.entity.User;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.repo.queryFactory.QueryFactory;
import lk.cardiffmet.api.service.impl.UserServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/13/23
 **/

@RunWith(SpringJUnit4ClassRunner.class)
public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private UserServiceImpl userServiceMock;
    @Mock
    private UserRepo userRepo;

    @Mock
    private ModelMapper mapper;
  ;


    @Mock
    private QueryFactory queryFactory;

    @Mock
    private JavaMailSender mailSender;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test

    public void saveUserTest() throws MessagingException, UnsupportedEncodingException {
        UserDto userDto = new UserDto();
        userDto.setFristName("Isuri");
        userDto.setLastName("Disanayaka");
        userDto.setEmail("isuriumeshika1@gmail.com");
        userDto.setPassword("123");


            userServiceMock.saveUser(userDto, "http://localhost:8080/api/v1/user");

            verify(userServiceMock, times(1)).saveUser(any(UserDto.class), anyString());



    }

    @Test
    public void testLogin() {
        String email = "test@example.com";
        String password = "password";

        User user = new User();
        user.setEmail(email);
        user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
        when(userRepo.findByEmail(email)).thenReturn(user);

        boolean isAuthenticated = userService.login(email, password);

        assertTrue(isAuthenticated);
    }
    @Test
    public void testGetAllUsers() {
        List<User> userList = new ArrayList<>();
        User user1 = new User();
        user1.setId(1);
        user1.setFristName("User1");
        userList.add(user1);

        User user2 = new User();
        user2.setId(2);
        user2.setFristName("User2");
        userList.add(user2);

        when(userRepo.findAll()).thenReturn(userList);

        List<UserDto> userDtos = userService.getGetAllUsers();

        assertNotNull(userDtos);
        assertEquals(2, userDtos.size());
    }


    @Test
    public void testUpdateUser() {
        int userId = 1;
        UserDto updatedUserDto = new UserDto();
        updatedUserDto.setEmail("updated@example.com");

        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setEmail("original@example.com");

        when(userRepo.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepo.save(existingUser)).thenReturn(existingUser);
        when(mapper.map(updatedUserDto, User.class)).thenReturn(existingUser);

        UserDto updatedUser = userService.updateUser(userId, updatedUserDto);

        assertNotNull(updatedUser);
        assertEquals(updatedUserDto.getEmail(), updatedUser.getEmail());
    }


}
