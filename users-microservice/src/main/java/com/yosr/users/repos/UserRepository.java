package com.yosr.users.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yosr.users.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
	Optional<User> findByEmail(String email);
	}

