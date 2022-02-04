package com.freesia.imyourfreesia.web.dto.posts;

import com.freesia.imyourfreesia.domain.posts.Posts;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    @ApiModelProperty(example = "게시글 작성자 아이디")
    private String uid;
    @ApiModelProperty(example = "게시글 제목")
    private String title;
    @ApiModelProperty(example = "게시글 내용")
    private String content;

    @Builder
    public PostsSaveRequestDto(String uid, String title, String content){
        this.uid=uid;
        this.title=title;
        this.content=content;
    }

    public Posts toEntity(){
        return Posts.builder()
                .uid(uid)
                .title(title)
                .content(content)
                .build();
    }
}
