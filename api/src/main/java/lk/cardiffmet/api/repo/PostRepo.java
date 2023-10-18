package lk.cardiffmet.api.repo;

import lk.cardiffmet.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/
public interface PostRepo extends JpaRepository<Post, Integer> {
    @Query(value = "SELECT COUNT(*) FROM Post")
    int getTotalPosts();
}