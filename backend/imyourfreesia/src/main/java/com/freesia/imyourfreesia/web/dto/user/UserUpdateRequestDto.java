package com.freesia.imyourfreesia.web.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class UserUpdateRequestDto {

    @ApiModelProperty(example = "유저 닉네임")
    @NotNull
    @Size(min = 3, max = 50)
    private String nickname;

    @Builder
    public UserUpdateRequestDto(String nickname) {
        this.nickname = nickname;
    }
}