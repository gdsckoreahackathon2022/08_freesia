package com.freesia.imyourfreesia.web;

import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.service.UserService;
import com.freesia.imyourfreesia.web.dto.user.UserResponseDto;
import com.freesia.imyourfreesia.web.dto.user.UserSaveRequestDto;
import com.freesia.imyourfreesia.web.dto.user.UserUpdateRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@Api(tags = {"freesia Signup API"}) // Swagger 최상단 Controller 명칭
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "회원가입 API")
    public ResponseEntity<User> signup(@Valid @RequestBody UserSaveRequestDto userSaveRequestDto) {
        return ResponseEntity.ok(userService.signup(userSaveRequestDto));
    }

    @GetMapping("/user")
    @ApiOperation(value = "유저 정보 조회", notes = "유저 정보 조회 API")
    @ApiImplicitParam(name = "userid", value = "유저 아이디")
    public ResponseEntity<UserResponseDto> findUser(@RequestParam String userid) {
        return ResponseEntity.ok(userService.findUser(userid));
    }

    @PutMapping("/user")
    @ApiOperation(value = "유저 정보 수정", notes = "유저 정보 수정 API")
    @ApiImplicitParam(name = "userid", value = "유저 아이디")
    public String updateNickname(@RequestParam String userid, @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        return userService.update(userid, userUpdateRequestDto);
    }
}
