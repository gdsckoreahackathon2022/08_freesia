package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.user.Authority;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.util.SecurityUtil;
import com.freesia.imyourfreesia.web.dto.user.UserSaveRequestDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // UserRepository, PasswordEncoder를 주입 받음
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* 회원 가입 로직 수행 */
    @Transactional
    public User signup(UserSaveRequestDto userSaveRequestDto) {
        // 파라미터로 받은 UserDto의 userId을 기준으로 해서
        // 이미 DB에 존재하는지 찾음
        if (userRepository.findOneWithAuthoritiesByUserid(userSaveRequestDto.getUserid()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        // DB에 존재하지 않으면 Authority와
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER") // (*) signup 메소드를 통해 가입한 회원은 USER ROLE을 가짐
                .build();                   // +) data.sql에서 자동생성되는 admin 계정은
                                            // USER, ADMIN ROLE을 가지고 있었음

        // User 정보를 생성해서
        User user = User.builder()
                .userid(userSaveRequestDto.getUserid())
                .username(userSaveRequestDto.getUsername())
                .password(passwordEncoder.encode(userSaveRequestDto.getPassword()))
                .nickname(userSaveRequestDto.getNickname())
                .contact(userSaveRequestDto.getContact())
                .email(userSaveRequestDto.getEmail())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        // UserRepository의 save 메소드를 통해 DB에 정보를 저장함
        return userRepository.save(user);
    }

    /* 어떠한 username을 이든 username에 해당하는 유저 객체와 권한정보 가져옴 */
    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String userid) {
        return userRepository.findOneWithAuthoritiesByUserid(userid);
    }

    /* 현재 SecurityContext에 저장된 username에 해당하는 유저 객체와 권한정보만 가져옴 */
    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUserid);
    }
}