package org.example.shoesfactory;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

@SpringBootApplication
public class ShoesfactoryApplication  {
    public static void main(String[] args) {
        SpringApplication.run(ShoesfactoryApplication.class, args);
    }

}
