package lk.cardiffmet.api.controller;

import lk.cardiffmet.api.dto.AdminDto;
import lk.cardiffmet.api.service.AdminService;
import lk.cardiffmet.api.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/30/23
 **/
@RestController
@CrossOrigin
@RequestMapping("/api/v1/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping(path = "/{email}/{password}")
    public ResponseEntity searchAdmin(@PathVariable String email, @PathVariable String password) {
        Boolean isAuth = adminService.searchUser(email, password);
        return new ResponseEntity(new StandardResponse(200, "Done",isAuth.toString() ), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<AdminDto> getAdminDetails(@PathVariable int id) {
        AdminDto adminDto = adminService.getAdminDetails(id);
        return ResponseEntity.ok(adminDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminDto> updateAdminDetails(@PathVariable int id, @RequestBody AdminDto adminDto) {
        AdminDto updatedAdminDto = adminService.updateAdminDetails(id, adminDto);
        return ResponseEntity.ok(updatedAdminDto);
    }


}