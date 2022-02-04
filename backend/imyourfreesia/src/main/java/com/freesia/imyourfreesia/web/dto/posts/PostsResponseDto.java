package com.freesia.imyourfreesia.web.dto.posts;

import com.freesia.imyourfreesia.domain.posts.Posts;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class PostsResponseDto {
    @ApiModelProperty(example = "게시글 아이디")
    private Long id;
    @ApiModelProperty(example = "게시글 작성자 아이디")
    private String uid;
    @ApiModelProperty(example = "게시글 내용")
    private String content;

    public PostsResponseDto(Posts entity){
        this.id = entity.getId();
        this.uid = entity.getUid();
        this.content = entity.getContent();
    }

}
