package lk.cardiffmet.api.repo.queryFactory;

import lk.cardiffmet.api.entity.User;

import java.util.List;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/29/23
 **/
public interface QueryFactory {
    List<User> GenerateSearchQuery(String type, String input);
}
