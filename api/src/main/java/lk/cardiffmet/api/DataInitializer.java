package lk.cardiffmet.api;

import lk.cardiffmet.api.entity.Admin;
import lk.cardiffmet.api.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/30/23
 **/
@Component
public class DataInitializer implements ApplicationRunner {
    private final AdminRepo adminRepo;

    @Autowired
    public DataInitializer(AdminRepo  adminRepo) {
        this.adminRepo = adminRepo;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {

        Admin admin1 = new Admin();
        admin1.setId(1);
        admin1.setEmail("admin1@example.com");
        admin1.setPassword("12345r");
        adminRepo.save(admin1);

        Admin admin2 = new Admin();
        admin2.setId(2);
        admin2.setEmail("admin1@example.com");
        admin2.setPassword("123");
        adminRepo.save(admin2);

    }


}

