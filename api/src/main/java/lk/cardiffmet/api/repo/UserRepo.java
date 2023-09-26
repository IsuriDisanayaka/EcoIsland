package lk.cardiffmet.api.repo;

import lk.cardiffmet.api.entity.User;
import javax.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


import java.util.List;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    @Query(value = "SELECT * FROM  user where id like ?%  ", nativeQuery = true)
    List<User> findByIdLike(@NotNull int input);


    @Query(value="SELECT * FROM user where full_name like %?% ",nativeQuery = true)
    List<User> findByFullNameLike(String input);

    @Query(value="SELECT * FROM user where address like %?% ",nativeQuery = true)
    List<User> findByAddress(String input);

    @Query(value="SELECT * FROM user where contact like ?% ",nativeQuery = true)
    List<User> findByContact(String input);


    @Query(value="SELECT * FROM user where nic like %?% ",nativeQuery = true)
    List<User> findByNic(String input);

    @Query(value="SELECT * FROM user where date_of_birth  ",nativeQuery = true)
    List<User> findByDateOfBirth(String input);

    @Query(value="SELECT * FROM user where gender like %?%",nativeQuery = true)
    List<User> findByGender(String input);



    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    public User findByVerificationCode(String code);
    @Query(value = "SELECT COUNT(*) FROM User")
    int getTotalUsers();

}
