package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import com.freesia.imyourfreesia.domain.emoticon.EmoticonRepository;
import com.freesia.imyourfreesia.web.dto.emoticon.EmoticonSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EmoticonService {
    private final EmoticonRepository emoticonRepository;

    @Transactional
    public Long save(EmoticonSaveRequestDto emotionSaveRequestDto) {
        return emoticonRepository.save(emotionSaveRequestDto.toEntity()).getId();
    }

    @Transactional
    public List<Emoticon> findByPid(Long pid) {
        return emoticonRepository.findByPid(pid);
    }

    @Transactional
    public Collection<Emoticon> delete(Long pid, String uid, String unified) {
        return emoticonRepository.deleteByPidAndUidAndUnified(pid, uid, unified);
    }
}
