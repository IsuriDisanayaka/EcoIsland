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
    private int postId;
    private String title;
    private String content;
    private double price;
    private LocalDateTime timestamp;
    private String status;
    private String imageUrl;
    private int id;
    private  String fristName ;
    private String contact;
    private String address;
}
