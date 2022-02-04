package com.freesia.imyourfreesia.web;

import com.freesia.imyourfreesia.domain.emoticon.Emoticon;
import com.freesia.imyourfreesia.service.EmoticonService;
import com.freesia.imyourfreesia.web.dto.emoticon.EmoticonSaveRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Api(tags = {"freesia Emoticon API"}) // Swagger 최상단 Controller 명칭
public class EmoticonController {

    private final EmoticonService emoticonService;

    @PostMapping("/emoticon")
    @ApiOperation(value = "이모티콘 추가", notes = "이모티콘 추가 API")
    public ResponseEntity<Long> save(@RequestBody EmoticonSaveRequestDto emotionSaveRequestDto) {
        return ResponseEntity.ok(emoticonService.save(emotionSaveRequestDto));
    }

    @GetMapping("/emoticon")
    @ApiOperation(value = "글에 따른 이모티콘 조회", notes = "글에 따른 이모티콘 조회 API")
    @ApiImplicitParam(name = "pid", value = "글 아이디")
    public ResponseEntity<List<Emoticon>> findByPid(@RequestParam Long pid) {
        return ResponseEntity.ok(emoticonService.findByPid(pid));
    }

    @DeleteMapping("/emoticon")
    @ApiOperation(value = "글에 따른 이모티콘 삭제", notes = "글에 따른 이모티콘 삭제 API")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pid", value = "글 아이디"),
            @ApiImplicitParam(name = "uid", value = "사용자 아이디"),
            @ApiImplicitParam(name = "unified", value = "유니코드"),
    })
    public ResponseEntity<Collection<Emoticon>> delete(@RequestParam Long pid, @RequestParam String uid, @RequestParam String unified) {
        return ResponseEntity.ok(emoticonService.delete(pid, uid, unified));
    }
}
