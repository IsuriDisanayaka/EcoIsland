package lk.cardiffmet.api.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "VARCHAR(100)")
    @NotNull(message = "Name is mandatory")
    private String fristName;

    @Column(columnDefinition = "VARCHAR(100)")
    @NotNull(message = "Name is mandatory")
    private String lastName;

    @Column(columnDefinition = "VARCHAR(100)")
    @NotNull(message = "Address is mandatory")
    private String address;

    @Column(columnDefinition = "VARCHAR(20)")
    @NotNull(message = "Contact is mandatory")
    private String contact;

    @Column(columnDefinition = "VARCHAR(50)")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Column(columnDefinition = "VARCHAR(50)",unique = true)
    @NotBlank(message = "NIC is mandatory")
    private String nic;

   
    @Column(columnDefinition = "DATETIME")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(columnDefinition = "VARCHAR(50)")
    private String gender;


    @Column(columnDefinition = "VARCHAR(255)")
    private String password;
    @Column(columnDefinition = "VARCHAR(255)")
    private String role = "ROLE_USER";


    @CreationTimestamp
    @Column(columnDefinition = "DATETIME")
    private Date createdDate;

    @Column(columnDefinition = "TINYINT")
    @Value("${some.key:false}")
    private boolean isDeleted ;

    @Column(columnDefinition = "VARCHAR(64)")
    private String verificationCode;

    private boolean isEnabled;





}