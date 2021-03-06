package com.freesia.imyourfreesia.domain.posts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uid; //작성자 아이디

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; //글 내용

    @Builder
    public Posts(String uid, String content){
        this.uid = uid;
        this.content = content;
    }

    public Posts update(String content){
        this.content = content;
        return this;
    }
}
