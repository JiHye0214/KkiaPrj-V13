package com.project.kkiaprj.service;

import com.project.kkiaprj.domain.GamePlayer;
import com.project.kkiaprj.domain.GameSchedule;
import com.project.kkiaprj.domain.Team;
import com.project.kkiaprj.repository.GamePlayerRepository;
import com.project.kkiaprj.repository.GameScheduleRepository;
import com.project.kkiaprj.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class GameServiceImpl implements GameService {
    @Value("${app.api.clientId}")
    private String clientId;
    @Value("${app.api.clientSecret}")
    private String clientSecret;
    @Value("${app.api.weatherKey}")
    private String weatherKey;
    @Value("${app.api.mapKey}")
    private String mapKey;

    @Autowired
    GameScheduleRepository gameScheduleRepository;
    @Autowired
    GamePlayerRepository gamePlayerRepository;
    @Autowired
    TeamRepository teamRepository;

    @Override
    public void gameRender(Model model) {
        List<GameSchedule> schedules = gameScheduleRepository.findAll();
        List<Team> teams = teamRepository.findAll();

        model.addAttribute("schedules", schedules);
        model.addAttribute("teams", teams);
    }

    @Override
    public void homeRender(Model model) {

        boolean baseball = false;
        Team home = new Team();
        Team away = new Team();
        String gameTime = "";
        Object weatherObj = new Object();
        List<GamePlayer> entry = new ArrayList<>();
        Long [] entryArr = {36L, 5L, 47L, 45L, 34L, 3L, 42L, 25L, 9L, 40L}; // test

        // 오늘 날짜
//        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.M.dd")); // 이게 되네 ?
        String date = "2025.3.22";
        // 공식 일정
        List<GameSchedule> schedules = gameScheduleRepository.findAll();
        // 엔트리
        List<GamePlayer> gamePlayers = gamePlayerRepository.findAll();
        // 뉴스
        Object newsList = getNews();

        // 일정 + 날씨
        for (GameSchedule schedule : schedules) {
            // 경기 있으면
            if(Objects.equals(schedule.getGameDate(), date)){ // 여기 원래 date 들어가야됨
                baseball = true;
                Team opponent = teamRepository.findByCode(schedule.getOpponent()); // 오늘 상태팀 객체
                Team kia = teamRepository.findByCode("KKIA");
                gameTime = schedule.getGameTime(); // 시작 시간

                if(schedule.isHomeGame()) { // 기아 홈
                    away = opponent;
                    home = kia;
                    weatherObj = getWeather(kia.getLatitude(), kia.getLongitude());
                } else { // 상대 홈
                    away = kia;
                    home = opponent;
                    weatherObj = getWeather(opponent.getLatitude(), opponent.getLongitude());
                }

                // 엔트리
                for(Long num : entryArr) {
                    for(GamePlayer player : gamePlayers) {
                        if(Objects.equals(player.getNumber(), num)) {
                            entry.add(player);
                        }
                    }
                }
            }

        }

        model.addAttribute("baseball", baseball);
        model.addAttribute("home", home);
        model.addAttribute("away", away);
        model.addAttribute("gameTime", gameTime);
        model.addAttribute("weather", weatherObj);
        model.addAttribute("mapKey", mapKey);
        model.addAttribute("entry", entry);
        model.addAttribute("today", date); // 여기 원래 date 들어가야됨
        model.addAttribute("news", newsList);
    }

    // 날씨 가져오기
    public Object getWeather(double lat, double lon) {

        // API 요청 URI 생성
        // * 선물 포장
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.openweathermap.org/data/2.5/weather")
                .queryParam("lat",lat)
                .queryParam("lon",lon)
                .queryParam("appid","e2f1ef8ab369be1544125c13be7aa1d6")
                .queryParam("units","metric")
                .queryParam("lang","kr")
                .build()
                .toUri();


        // API 요청 전송
        // * 선물 보내기
        // 아래는 헤더를 넣기 위함
        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .build();


        // 우체국
        RestTemplate restTemplate = new RestTemplate();

        // API 응답 수신
        // * ResponseEntity : 선물 받아옴 / restTemplate.exchange : 선물 도착
        ResponseEntity<Object> result = restTemplate.exchange(req, Object.class);

        // API 응답 본문 반환
        // * 선물 언박싱
        return result.getBody();
    }

    // 뉴스 가져오기
    public Object getNews() {
        String query = "기아타이거즈";
        ByteBuffer buffer = StandardCharsets.UTF_8.encode(query);
        String encode = StandardCharsets.UTF_8.decode(buffer).toString();

        URI uri = UriComponentsBuilder
                .fromUriString("https://openapi.naver.com")
                .path("/v1/search/news.json")
                .queryParam("query",encode)
                .queryParam("display",7)
                .queryParam("start",1)
                .queryParam("sort","sim")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        // 아래는 헤더를 넣기 위함
        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .header("X-Naver-Client-Id", clientId)
                .header("X-Naver-Client-Secret",clientSecret)
                .build();

        ResponseEntity<Object> result = restTemplate.exchange(req, Object.class);

        return result.getBody();
    }
}
