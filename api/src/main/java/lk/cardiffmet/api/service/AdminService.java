package lk.cardiffmet.api.service;

import lk.cardiffmet.api.dto.AdminDto;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/30/23
 **/
public interface AdminService {
    Boolean searchUser(String email,String password);
     AdminDto getAdminDetails(int id);
     AdminDto updateAdminDetails(int id, AdminDto adminDto);
}