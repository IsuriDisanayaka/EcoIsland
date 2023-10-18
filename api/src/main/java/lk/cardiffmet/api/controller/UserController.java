package lk.cardiffmet.api.controller;

import lk.cardiffmet.api.dto.UserDto;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.service.AdminService;
import lk.cardiffmet.api.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lk.cardiffmet.api.service.UserService;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;


/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/27/23
 **/



@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity saveUser(@RequestBody UserDto userDto, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {

        UserDto user = userService.saveUser(userDto, getSiteURL(request) + "/api/v1/user");

        return new ResponseEntity(new StandardResponse(200, "Done", user), HttpStatus.CREATED);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }


    @GetMapping
    public ResponseEntity getAllUsers() {
        ArrayList<UserDto> getAllUsers = userService.getGetAllUsers();

        return new ResponseEntity(new StandardResponse(200, "Done", getAllUsers), HttpStatus.OK);
    }

    @GetMapping(path = "/{type}/{input}")
    public ResponseEntity Search(@PathVariable("type") String type, @PathVariable("input") String input) {
        List<UserDto> search = userService.searchUsers(type, input);
        return new ResponseEntity(new StandardResponse(200, "Done", search), HttpStatus.OK);

    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (userService.verify(code)) {
            // Verification successful, return HTML response
            StringBuilder successHtml = new StringBuilder();
            successHtml.append("<html>");
            successHtml.append("<head>");
            successHtml.append("<title>Verification Successful</title>");
            successHtml.append("<style>");
            successHtml.append(".message { font-size: 36px; }");
            successHtml.append("</style>");
            successHtml.append("</head>");
            successHtml.append("<body>");
            successHtml.append("<div class=\"container\">");
            successHtml.append("<p class=\"message\">Please SignIn</p>");
            successHtml.append("<p class=\"message\">Verification Successful ✔️</p>");
            successHtml.append("</div>");
            successHtml.append("</body>");
            successHtml.append("</html>");

            return successHtml.toString();
        } else {
            StringBuilder failureHtml = new StringBuilder();
            failureHtml.append("<html>");
            failureHtml.append("<head>");
            failureHtml.append("<title>Verification Failed</title>");
            failureHtml.append("<style>");
            failureHtml.append(".message { font-size: 36px; }");
            failureHtml.append("</head>");
            failureHtml.append("<body>");
            failureHtml.append("<div class=\"container\">");
            failureHtml.append("<p class=\"message\">Verification Failed ❌</p>");
            failureHtml.append("</div>");
            failureHtml.append("</body>");
            failureHtml.append("</html>");

            return failureHtml.toString();
        }
    }


    @Autowired
    private UserRepo userRepo;

    @GetMapping("/total")
    public int getTotalUsers() {
        return userRepo.getTotalUsers();
    }
    @PostMapping(path = "/login")
    public ResponseEntity login(@RequestBody UserDto userDto) {
        boolean isAuthenticated = userService.login(userDto.getEmail(), userDto.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok(new StandardResponse(200, "Login successful", null));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new StandardResponse(401, "Login failed", null));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable int id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(new StandardResponse(200, "User deleted successfully", null));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse(404, e.getMessage(), null));
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable int id, @RequestBody UserDto userDto) {
        try {
            UserDto updatedUser = userService.updateUser(id, userDto);
            return ResponseEntity.ok(new StandardResponse(200, "User updated successfully", updatedUser));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StandardResponse(404, e.getMessage(), null));
        }
    }


}
