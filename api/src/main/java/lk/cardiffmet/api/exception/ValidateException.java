package lk.cardiffmet.api.exception;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
public class ValidateException  extends RuntimeException {
    public ValidateException (String message){
        super(message);
    }
}
