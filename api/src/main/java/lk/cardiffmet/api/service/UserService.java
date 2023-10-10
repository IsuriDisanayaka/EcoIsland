package lk.cardiffmet.api.service;

import lk.cardiffmet.api.dto.UserDto;
import lk.cardiffmet.api.entity.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.ArrayList;


/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/27/23
 **/
public interface UserService {
    UserDto  saveUser(UserDto dto ,String siteURL) throws MessagingException, UnsupportedEncodingException;
    ArrayList<UserDto> getGetAllUsers();
    List<UserDto>searchUsers(String type,String input);
 void sendVerificationEmail(User user, String siteURL) throws UnsupportedEncodingException, MessagingException;
   boolean verify(String verificationCode);

   UserDto getUserDTOByEmail(String email) ;

 Boolean searchUser(String email, String password) ;
boolean login(String email, String password);
    UserDto updateUser(int userId, UserDto updatedUserDto);
    void deleteUser(int userId);
    }
