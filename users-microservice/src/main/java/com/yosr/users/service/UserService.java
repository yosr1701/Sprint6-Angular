package com.yosr.users.service;

import java.util.List;

import com.yosr.users.entities.Role;
import com.yosr.users.entities.User;
import com.yosr.users.service.register.RegistrationRequest;

public interface UserService {
	
	User saveUser(User user);
	User findUserByUsername(String username);
	Role addRole(Role role);
	User addRoleToUser(String username, String rolename);
	
	User registerUser(RegistrationRequest request);
	
	List<User> findAllUsers();
}
