package com.freesia.imyourfreesia.service;

import com.freesia.imyourfreesia.domain.centers.Centers;
import com.freesia.imyourfreesia.domain.centers.CentersRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CenterService {
    private final CentersRepository centersRepository;

    private static final int FIRST_PAGE_INDEX = 1;
    private static final int LAST_PAGE_INDEX = 16;


    @PostConstruct
    public List<Centers> getSaeilCenterData() throws IOException {

        List<Centers> saeilCenterList = new ArrayList<>();

        // 새일 센터 모든 페이징 순회
        for (int i = FIRST_PAGE_INDEX; i <= LAST_PAGE_INDEX; i++) {
            //System.out.println("--------------page:" + i);
            // 수집 대상 URL
            final String URL = "https://saeil.mogef.go.kr/hom/info/search.do?page=" + i;

            // Connection 생성
            Connection conn = Jsoup.connect(URL);

            // HTML 파싱
            Document document = conn.get();

            Elements centerElements = document.select("table.tableList02 > tbody > tr ");

            // 크롤링 항목 필요 리스트
            // 센터명, 연락처, 주소, 홈페이지
            for (Element e : centerElements) {
                /*
                System.out.println(e.select("td").get(1).text()); // 센터명
                System.out.println(e.select("td").get(2).text()); // 연락처
                System.out.println(e.select("td").get(3).text()); // 주소
                System.out.println(e.select("td").get(5).select("a").attr("href")); // 홈페이지
                */

                Centers centers = Centers.builder()
                        .name(e.select("td").get(1).text())
                        .contact(e.select("td").get(2).text())
                        .address(e.select("td").get(3).text())
                        .websiteUrl(e.select("td").get(5).select("a").attr("href"))
                        .build();

                saeilCenterList.add(centers);
            }
        }
        return centersRepository.saveAll(saeilCenterList);
    }

    /*지역의 새일 센터 정보 가져옴*/
    public List<Centers> findByAddressContains(String address){
        return centersRepository.findByAddressContains(address);
    }
}
