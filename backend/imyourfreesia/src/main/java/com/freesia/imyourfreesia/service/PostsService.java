package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.posts.Posts;
import com.freesia.imyourfreesia.domain.posts.PostsRepository;
import com.freesia.imyourfreesia.web.dto.posts.PostsResponseDto;
import com.freesia.imyourfreesia.web.dto.posts.PostsSaveRequestDto;
import com.freesia.imyourfreesia.web.dto.posts.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;
    
    /*게시글 저장*/
    @Transactional
    public Posts save(PostsSaveRequestDto postsSaveRequestDto){
        return postsRepository.save(postsSaveRequestDto.toEntity());
    }

    /*게시글 리스트 조회*/
    @Transactional
    public List<Posts> list(){
        return postsRepository.findAll();
    }

    /*게시글 상세페이지 조회*/
    @Transactional
    public PostsResponseDto findById(Long id){
        Posts postsEntity = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        return new PostsResponseDto(postsEntity);
    }

    /*게시글 수정*/
    @Transactional
    public Posts update(Long id, PostsUpdateRequestDto postsUpdateRequestDto){
        Posts posts = postsRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        return posts.update(postsUpdateRequestDto.getTitle(), postsUpdateRequestDto.getContent());
    }

    /*게시글 삭제*/
    @Transactional
    public void delete(Long id){
        Posts posts = postsRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        postsRepository.delete(posts);
    }
}
