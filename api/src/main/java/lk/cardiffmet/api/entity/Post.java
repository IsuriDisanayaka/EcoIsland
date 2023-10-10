package lk.cardiffmet.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;
    @Column(columnDefinition = "VARCHAR(100)")
    @NotNull(message = "Title is mandatory")
    private String title;
    @Column(columnDefinition = "VARCHAR(300)")
    @NotNull(message = "content is mandatory")
    private String content;

    private double price;
    private String imageUrl;

    @CreationTimestamp
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime timestamp;

    @Column(columnDefinition = "VARCHAR(30) default 'pending'")
    private String status;
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "id")
    private User user;



}
