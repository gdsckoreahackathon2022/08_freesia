package com.freesia.imyourfreesia.web.dto.posts;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsUpdateRequestDto {
    @ApiModelProperty(example = "게시글 내용")
    private String content;

    @Builder
    public PostsUpdateRequestDto(String content){
        this.content = content;
    }

}
