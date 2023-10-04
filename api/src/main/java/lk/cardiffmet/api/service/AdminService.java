package lk.cardiffmet.api.service;

import lk.cardiffmet.api.dto.AdminDto;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/30/23
 **/
public interface AdminService {
     AdminDto getAdminDetails(int id);
     AdminDto updateAdminDetails(int id, AdminDto adminDto);

     AdminDto getAdminDTOByEmail(String email) ;


    Boolean searchUser(String email, String password);
}