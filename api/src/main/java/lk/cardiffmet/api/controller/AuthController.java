package lk.cardiffmet.api.controller;

import lk.cardiffmet.api.dto.AdminDto;
import lk.cardiffmet.api.dto.UserDto;
import lk.cardiffmet.api.service.AdminService;
import lk.cardiffmet.api.service.UserService;
import lk.cardiffmet.api.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/8/23
 **/
@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;
@GetMapping(path = "/{email}/{password}")
public ResponseEntity<?> authenticate(@PathVariable String email, @PathVariable String password) {

    Boolean isAdminAuthenticated = adminService.searchUser(email, password);
    Boolean isUserAuthenticated = userService.searchUser(email, password);

    if (isAdminAuthenticated) {
        AdminDto adminDTO = adminService.getAdminDTOByEmail(email);
        return new ResponseEntity<>(new StandardResponse(200, "Admin authentication successful", adminDTO), HttpStatus.OK);
    } else if (isUserAuthenticated) {
        UserDto userDTO = userService.getUserDTOByEmail(email);
        return new ResponseEntity<>(new StandardResponse(200, "User authentication successful", userDTO), HttpStatus.OK);
    } else {
        return new ResponseEntity<>(new StandardResponse(401, "Authentication failed", null), HttpStatus.UNAUTHORIZED);
    }
}

}






