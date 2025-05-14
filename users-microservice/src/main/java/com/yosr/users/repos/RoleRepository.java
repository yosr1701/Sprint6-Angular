package com.yosr.users.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yosr.users.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findByRole(String role);
}
