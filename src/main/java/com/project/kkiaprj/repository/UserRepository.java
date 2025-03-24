package com.project.kkiaprj.repository;

import com.project.kkiaprj.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByNameAndEmail(String name, String email);

    User findByNameAndLoginId(String name, String loginId);

    User findByLoginId(String loginId);

    User findByNickname(String nickname);

    User findByEmail(String email);

}
