package lk.cardiffmet.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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
    private Long postId;
    @Column(columnDefinition = "VARCHAR(100)")
    @NotNull(message = "Title is mandatory")
    private String title;
    @Column(columnDefinition = "VARCHAR(300)")
    @NotNull(message = "content is mandatory")
    private String content;

    private double price;
    @Lob
    @Column(name = "image", columnDefinition = "BLOB")
    private byte[] image;
    @CreationTimestamp
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime timestamp;

    @Column(columnDefinition = "VARCHAR(30) default 'readytoapprove'")
    private String status;
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;
}
