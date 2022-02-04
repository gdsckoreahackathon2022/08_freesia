package com.freesia.imyourfreesia.domain.emoticon;

import com.freesia.imyourfreesia.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Emoticon")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Emoticon extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 이모티콘 생성 순서 id

    @Column(name = "pid", length = 100, nullable = false)
    private Long pid; // 글 id

    @Column(name = "uid", length = 100, nullable = false)
    private String uid; // 이모티콘 붙인 사람 아이디

    @Column(name = "unified", length = 50, nullable = false)
    private String unified; // 유니코드

    @Builder
    public Emoticon(Long pid, String uid, String unified) {
        this.pid = pid;
        this.uid = uid;
        this.unified = unified;
    }
}
