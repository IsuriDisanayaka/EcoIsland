package lk.cardiffmet.api.service.impl;


import lk.cardiffmet.api.dto.AdminDto;
import lk.cardiffmet.api.dto.UserDto;
import lk.cardiffmet.api.entity.User;
import lk.cardiffmet.api.exception.ValidateException;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.repo.queryFactory.QueryFactory;
import lk.cardiffmet.api.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import net.bytebuddy.utility.RandomString;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/27/23
 **/
@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    QueryFactory queryFactory;


    @Autowired
    JavaMailSender mailSender;


    @Override
    public UserDto saveUser(UserDto dto, String siteURL) throws MessagingException, UnsupportedEncodingException {

        if (userRepo.existsById(dto.getId())) {
            throw new ValidateException("User already exists");
        }
        dto.setVerificationCode(RandomString.make(64));

        String encryptedPassword = encryptPassword(dto.getPassword());

        dto.setPassword(encryptedPassword);


        User user = userRepo.save(mapper.map(dto, User.class ));





        System.out.println(user+"ji");

        if(user!=null){
            sendVerificationEmail(user, siteURL);
        }
        return mapper.map(user, UserDto.class);
    }



    @Override
    public ArrayList<UserDto> getGetAllUsers() {
        List<User>all= userRepo.findAll();
        return mapper.map(all , new TypeToken<ArrayList<UserDto>>(){}.getType());
    };
    private String encryptPassword(String password) {
        // Here, you should use a secure password hashing algorithm, like BCrypt
        // Example using BCrypt:
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        return hashedPassword;
    }

    @Override
    public List<UserDto> searchUsers(String type, String input) {
        List<User>search=queryFactory.GenerateSearchQuery(type,input);
        return mapper.map(search, new TypeToken<ArrayList<UserDto>>(){}.getType());
    }
    @Override
    public void sendVerificationEmail(User user, String siteURL)
            throws UnsupportedEncodingException, MessagingException {
        String toAddress = user.getEmail();
        String fromAddress = "isuriumeshika1@gmail.com";
        String senderName = "Isuri Disanayka";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Happy Shopping,<br>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFristName());
        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();
        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

        @Override
    public boolean verify(String verificationCode) {
            User user = userRepo.findByVerificationCode(verificationCode);

            if (user == null || user.isEnabled()) {
                return false;
            } else {
                user.setVerificationCode(null);
                user.setEnabled(true);
                userRepo.save(user);

                return true;
            }

        }

    @Override
    public boolean login(String email, String password) {
        User user = userRepo.findByEmail(email);

        if (user == null) {
            return false; // User not found
        }

        // Check if the provided password matches the stored encrypted password
        if (BCrypt.checkpw(password, user.getPassword())) {
            // Authentication successful
            return true;
        } else {
            // Authentication failed
            return false;
        }
    }
    @Override
    public UserDto getUserDTOByEmail(String email) {

        User user = userRepo.findByEmail(email);
//        System.out.println("user = " + user);
//        UserDto userDto = new UserDto();
//      userDto.setEmail(user.getEmail());
//        return userDto;
        return mapper.map(user, UserDto.class);


    }

    @Override
    public Boolean searchUser(String email, String password) {

        User user = userRepo.findByEmail(email);

        if (user != null) {
            return BCrypt.checkpw(password, user.getPassword());
        } else {
            return false;
        }


    }

}
