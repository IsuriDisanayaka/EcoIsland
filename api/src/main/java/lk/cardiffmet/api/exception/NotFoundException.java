package lk.cardiffmet.api.exception;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}