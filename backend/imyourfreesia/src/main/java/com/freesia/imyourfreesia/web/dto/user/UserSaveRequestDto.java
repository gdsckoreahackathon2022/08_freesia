package com.freesia.imyourfreesia.web.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.freesia.imyourfreesia.domain.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class UserSaveRequestDto {

    @ApiModelProperty(example = "유저 아이디")
    @NotNull
    @Size(min = 3, max = 50)
    private String userid;

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

    @Builder
    public UserSaveRequestDto(String userid, String username, String password, String nickname, String contact, String email){
        this.userid = userid;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.contact = contact;
        this.email = email;
    }

    public User toEntity(){
        return User.builder()
                .userid(userid)
                .username(username)
                .password(password)
                .nickname(nickname)
                .contact(contact)
                .email(email)
                .build();
    }

}
