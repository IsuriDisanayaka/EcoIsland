package lk.cardiffmet.api.service.impl;

import lk.cardiffmet.api.dto.AdminDto;
import lk.cardiffmet.api.dto.UserDto;
import lk.cardiffmet.api.entity.Admin;
import lk.cardiffmet.api.entity.User;
import lk.cardiffmet.api.repo.AdminRepo;
import lk.cardiffmet.api.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/30/23
 **/
@Transactional
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminRepo adminRepo;


    @Autowired
    ModelMapper mapper;

    @Override
    public Boolean searchUser(String email, String password) {
        return adminRepo.existsAdminByEmailAndPassword(email, password);
    }

    @Override
    public AdminDto getAdminDetails(int id) {
        Optional<Admin> adminOptional = adminRepo.findById(id);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            return mapAdminToDto(admin);
        } else {
            throw new EntityNotFoundException("Admin with ID " + id + " not found");
        }
    }
    @Override
    public AdminDto updateAdminDetails(int id, AdminDto adminDto) {
        Optional<Admin> adminOptional = adminRepo.findById(id);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            admin.setEmail(adminDto.getEmail());
            admin.setPassword(adminDto.getPassword());
            Admin updatedAdmin = adminRepo.save(admin);
            return mapAdminToDto(updatedAdmin);
        } else {
            throw new EntityNotFoundException("Admin with ID " + id + " not found");
        }
    }



    private AdminDto mapAdminToDto(Admin admin) {
        AdminDto adminDTO = new AdminDto();
        adminDTO.setId(admin.getId());
        adminDTO.setEmail(admin.getEmail());
        adminDTO.setPassword(admin.getPassword());

        return adminDTO;
    }
    @Override
    public AdminDto getAdminDTOByEmail(String email) {

        Admin admin = adminRepo.findByEmail(email);

        return mapper.map(admin, AdminDto.class);

    }


}