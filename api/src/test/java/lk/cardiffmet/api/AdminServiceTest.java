package lk.cardiffmet.api;
import lk.cardiffmet.api.dto.AdminDto;
import lk.cardiffmet.api.entity.Admin;
import lk.cardiffmet.api.repo.AdminRepo;
import lk.cardiffmet.api.service.AdminService;
import lk.cardiffmet.api.service.impl.AdminServiceImpl;
import org.junit.Before;
import org.junit.Test;

import java.lang.reflect.Field;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 10/13/23
 **/
public class AdminServiceTest {

    private AdminService adminService;

    @Before
    public void setUp() {
        adminService = new AdminServiceImpl();
    }

    @Test
    public void testSearchUser() throws Exception {
        AdminRepo adminRepo = mock(AdminRepo.class);
        when(adminRepo.existsAdminByEmailAndPassword("admin@example.com", "password")).thenReturn(true);

        AdminServiceImpl adminServiceImpl = (AdminServiceImpl) adminService;
        setPrivateField(adminServiceImpl, "adminRepo", adminRepo);

        boolean result = adminService.searchUser("admin@example.com", "password");
        assertTrue(result);
    }

    @Test
    public void testGetAdminDetails() throws Exception {
        AdminRepo adminRepo = mock(AdminRepo.class);
        when(adminRepo.findById(1)).thenReturn(Optional.of(new Admin()));

        AdminServiceImpl adminServiceImpl = (AdminServiceImpl) adminService;
        setPrivateField(adminServiceImpl, "adminRepo", adminRepo);

        AdminDto adminDto = adminService.getAdminDetails(1);
        assertNotNull(adminDto);
    }

    // Helper method to set private fields using reflection
    private void setPrivateField(Object object, String fieldName, Object value) throws Exception {
        Field field = object.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(object, value);
    }

}