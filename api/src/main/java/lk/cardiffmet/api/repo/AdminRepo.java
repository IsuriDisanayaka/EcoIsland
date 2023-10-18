package lk.cardiffmet.api.repo;

import lk.cardiffmet.api.entity.Admin;
import lk.cardiffmet.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/30/23
 **/
@Repository
public interface AdminRepo extends JpaRepository<Admin,Integer> {
    Admin findByEmail(String email);


    Boolean existsAdminByEmailAndPassword(String email,String password);
}
