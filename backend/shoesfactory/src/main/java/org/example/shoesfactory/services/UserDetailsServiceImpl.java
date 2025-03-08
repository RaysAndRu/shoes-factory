package org.example.shoesfactory.services;

import org.example.shoesfactory.models.Role;
import org.example.shoesfactory.models.User;
import org.example.shoesfactory.repositories.RoleRepository;
import org.example.shoesfactory.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

@Service
public class UserDetailsServiceImpl  implements UserDetailsService {
    private  final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User  foundUser =  userRepository.getUserByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        System.out.println("Trying to load user: " + foundUser);
        return new org.springframework.security.core.userdetails.User(foundUser.getLogin(), foundUser.getPasswordHash(),
                Collections.singleton(new SimpleGrantedAuthority(foundUser.getRole().getTitle()) )   );
    }
}
