package com.vendorflow.util;

import com.vendorflow.entity.User;
import com.vendorflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    @Autowired
    private UserRepository userRepository;

    /** Get the currently authenticated User entity. */
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return null;
        String email = auth.getName();
        return userRepository.findByEmail(email).orElse(null);
    }

    /** Get current user's role (lowercase: admin / vendor / customer). */
    public String getCurrentRole() {
        User user = getCurrentUser();
        return user != null ? user.getRole() : null;
    }

    /** Get current user's ID. */
    public Long getCurrentUserId() {
        User user = getCurrentUser();
        return user != null ? user.getUserId() : null;
    }

    /** Returns true if current user has the given role. */
    public boolean hasRole(String role) {
        return role.equalsIgnoreCase(getCurrentRole());
    }
}
