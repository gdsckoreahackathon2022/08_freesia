package com.freesia.imyourfreesia.web.dto.emoticon;

import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;

public class EmoticonSaveRequestDto {

    @ApiModelProperty(example = "글 아이디")
    private Long pid;

    @ApiModelProperty(example = "작성자 아이디")
    private String uid;

    @ApiModelProperty(example = "유니코드")
    private String unified;

    @Builder
    public EmoticonSaveRequestDto(Long pid, String uid, String unified) {
        this.pid = pid;
        this.uid = uid;
        this.unified = unified;
    }

    public Emoticon toEntity() {
        return Emoticon.builder()
                .pid(pid)
                .uid(uid)
                .unified(unified)
                .build();
    }
}