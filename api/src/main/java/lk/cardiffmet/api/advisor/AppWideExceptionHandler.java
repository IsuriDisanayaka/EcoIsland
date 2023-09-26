package lk.cardiffmet.api.advisor;

import lk.cardiffmet.api.exception.NotFoundException;
import lk.cardiffmet.api.exception.ValidateException;
import lk.cardiffmet.api.utill.StandardResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
@RestControllerAdvice
public class AppWideExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleException (Exception e){
        return new ResponseEntity(new StandardResponse(500,"Error",e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity handleNotFoundException(NotFoundException e){
        return new ResponseEntity(new StandardResponse(404, "Error", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ValidateException.class)
    public  ResponseEntity handleValidationException (ValidateException e){
        return new ResponseEntity(new StandardResponse(400,"Error",e.getMessage()),HttpStatus.BAD_REQUEST);
    }
}
