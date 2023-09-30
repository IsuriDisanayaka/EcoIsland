package lk.cardiffmet.api.repo;

import lk.cardiffmet.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/
public interface PostRepo extends JpaRepository<Post, Long> {
}