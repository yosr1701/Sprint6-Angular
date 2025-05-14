package com.yosr.users.restController;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.yosr.users.entities.User;
import com.yosr.users.repos.UserRepository;
import com.yosr.users.service.UserService;
import com.yosr.users.service.register.RegistrationRequest;


@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRep;
	
	@GetMapping("all")
	public List<User> getAllUsers() {
	return userService.findAllUsers();
	}
	
	@PostMapping("/register")
	public User register(@RequestBody RegistrationRequest request) {
		return userService.registerUser(request);
	}

}
