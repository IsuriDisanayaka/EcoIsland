package lk.cardiffmet.api.utill;

import lombok.*;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public class StandardLogger {
        private String type;
        private String message;

}
