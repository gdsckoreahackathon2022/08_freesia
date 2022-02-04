package com.freesia.imyourfreesia.web;

import com.freesia.imyourfreesia.domain.centers.Centers;
import com.freesia.imyourfreesia.service.CenterService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags={"freesia Centers API"})
@RequiredArgsConstructor
@RestController
public class CentersController {
    private final CenterService centerService;

    /*서울 지역 새일 센터 정보 불러옴*/
    @GetMapping("/center")
    @ApiOperation(value = "서울 지역 새일 센터 정보 불러오기", notes = "서울 지역 새일 센터 정보 불러오기 API")
    @ApiImplicitParam(name = "address", value = "주소")
    public ResponseEntity<List<Centers>> loadCenter(@RequestParam String address) {

        return ResponseEntity.ok()
                .body(centerService.findByAddressContains(address));

    }
}
