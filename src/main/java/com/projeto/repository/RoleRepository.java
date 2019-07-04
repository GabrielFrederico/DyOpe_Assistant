package com.projeto.repository;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Role;
import com.projeto.models.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends CrudRepository<Role, Serializable> {
	Optional<Role> findByNome(RoleName nome);
	 Boolean existsByNome(RoleName nome);
}
