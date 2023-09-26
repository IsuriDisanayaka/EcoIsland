package lk.cardiffmet.api.dto;

import lombok.*;
import java.util.Date;

/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto implements SuperDto {
    private int id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String address;
    private String contact;
    private String email;
    private String nic;
    private String number;
    private Date dateOfBirth;
    private String gender;
    private String Password;
    private String role;
    private Date createdDate;
    private boolean isDeleted;
    private String verificationCode;
    private boolean isEnabled;
}
