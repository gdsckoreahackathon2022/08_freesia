package com.freesia.imyourfreesia.domain.emoticon;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface EmoticonRepository extends JpaRepository<Emoticon, Long> {
    List<Emoticon> findByPid(Long pid);
    Collection<Emoticon> deleteByPidAndUidAndUnified(Long pid, String uid, String unified);}
