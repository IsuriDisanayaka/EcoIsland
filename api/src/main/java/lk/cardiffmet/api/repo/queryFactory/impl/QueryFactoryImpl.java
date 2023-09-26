package lk.cardiffmet.api.repo.queryFactory.impl;

import lk.cardiffmet.api.entity.User;
import lk.cardiffmet.api.repo.UserRepo;
import lk.cardiffmet.api.repo.queryFactory.QueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.List;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/29/23
 **/
@Component
public class QueryFactoryImpl implements QueryFactory {

    @Autowired
    UserRepo userRepo;


    @Override
    public List<User> GenerateSearchQuery(String type, String input) {
        switch (type) {
            case "id":
                return userRepo.findByIdLike(Integer.parseInt(input));
            case "fullName":
                return userRepo.findByFullNameLike(input);
            case "address":
                return userRepo.findByAddress(input);
            case "contact":
                return userRepo.findByContact(input);
            case "nic":
                return userRepo.findByNic(input);
            case "dateOfBirth":
                return userRepo.findByDateOfBirth(input);
            case "gender":
                return userRepo.findByGender(input);


            default:
                return null;

        }

    }}