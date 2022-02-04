package com.freesia.imyourfreesia.web.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/* 롬복 어노테이션 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    /* @Valid 관련 어노테이션 */
    @ApiModelProperty(example = "유저 아이디") // Swagger에 해당 필드가 무엇인지 나타냄
    @NotNull
    @Size(min = 3, max = 50)
    private String userid;

    @ApiModelProperty(example = "유저 비밀번호")
    @NotNull
    @Size(min = 3, max = 100)
    private String password;
}
