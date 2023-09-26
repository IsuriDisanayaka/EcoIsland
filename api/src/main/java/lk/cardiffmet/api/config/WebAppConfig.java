package lk.cardiffmet.api.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/**
 * @author Isuri Disanayaka <isuriumeshika1@gmail.com>
 * @since 9/26/23
 **/
@Configuration
public class WebAppConfig {

        @Bean
        public ModelMapper modelMapper(){
            return new ModelMapper();
        }
}
