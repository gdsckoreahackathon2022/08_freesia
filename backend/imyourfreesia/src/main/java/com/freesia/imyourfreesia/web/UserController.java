package com.freesia.imyourfreesia.web;

import com.freesia.imyourfreesia.domain.user.User;
import com.freesia.imyourfreesia.service.UserService;
import com.freesia.imyourfreesia.web.dto.user.UserSaveRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@Api(tags = {"freesia Signup API"}) // Swagger 최상단 Controller 명칭
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "회원가입 API")
    public ResponseEntity<User> signup(
            @Valid @RequestBody UserSaveRequestDto userSaveRequestDto
    ) {
        return ResponseEntity.ok(userService.signup(userSaveRequestDto));
    }

}
