package lk.cardiffmet.api.utill;

import lombok.*;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StandardResponse {
    private int code;
    private String message;
    private Object data;
}
