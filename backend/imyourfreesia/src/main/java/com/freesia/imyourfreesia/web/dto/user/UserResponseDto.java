package com.freesia.imyourfreesia.web.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.freesia.imyourfreesia.domain.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class UserResponseDto {

    @ApiModelProperty(example = "유저 이름")
    @NotNull
    @Size(min = 3, max = 50)
    private String username;

    @ApiModelProperty(example = "유저 비밀번호")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    @ApiModelProperty(example = "유저 닉네임")
    @NotNull
    @Size(min = 3, max = 50)
    private String nickname;

    @ApiModelProperty(example = "유저 연락처")
    @NotNull
    @Size(min = 3, max = 20)
    private String contact;

    @ApiModelProperty(example = "유저 이메일")
    @NotNull
    @Size(min = 3, max = 100)
    private String email;

    public UserResponseDto(User entity) {
        this.username = entity.getUsername();
        this.password = entity.getPassword();
        this.nickname = entity.getNickname();
        this.contact = entity.getContact();
        this.email = entity.getEmail();
    }
}
