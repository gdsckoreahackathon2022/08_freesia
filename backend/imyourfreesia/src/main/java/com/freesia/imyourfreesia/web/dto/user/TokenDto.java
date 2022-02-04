package com.freesia.imyourfreesia.web.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    @ApiModelProperty(example = "토큰")
    private String token;
}