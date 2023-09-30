package lk.cardiffmet.api.dto;

import lk.cardiffmet.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/1/23
 **/

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDto {
    private Long postId;
    private String title;
    private String content;
    private double price;
    private byte[] image;
    private LocalDateTime timestamp;
    private String status;
    private int id;
}
