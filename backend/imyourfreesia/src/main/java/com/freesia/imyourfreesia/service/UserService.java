package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.user.Authority;
import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.domain.user.UserRepository;
import com.freesia.imyourfreesia.web.dto.user.UserResponseDto;
import com.freesia.imyourfreesia.web.dto.user.UserSaveRequestDto;
import com.freesia.imyourfreesia.web.dto.user.UserUpdateRequestDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User signup(UserSaveRequestDto userSaveRequestDto) {
        if (userRepository.findOneWithAuthoritiesByUserid(userSaveRequestDto.getUserid()).orElse(null) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

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

        return userRepository.save(user);
    }

    @Transactional
    public UserResponseDto findUser(String userid) {
        User userEntity = userRepository.findByUserid(userid).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. userid="+ userid));
        return new UserResponseDto(userEntity);
    }

    @Transactional
    public String update(String userid, UserUpdateRequestDto userUpdateRequestDto) {
        User userEntity = userRepository.findByUserid(userid).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. userid="+ userid));
        userEntity.update(userUpdateRequestDto.getNickname());
        return userid;
    }
}