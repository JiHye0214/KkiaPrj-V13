package com.project.kkiaprj.service;

import com.project.kkiaprj.domain.Favorite;
import com.project.kkiaprj.domain.GamePlayer;
import com.project.kkiaprj.domain.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HomeServiceImpl implements HomeService {

    @Autowired
    private GameService gameService;

    @Autowired
    private FavoriteService favoriteService;

    @Override
    public Map<String, Object> getHomeData() {
        ModelMap model = new ModelMap();
        // 기존 서비스 로직 호출
        gameService.homeRender(model);

        // Map 형식으로 자동 변환되는 가벼운 친구들이 있는 반면
        // 변환이 안 되는 거지같은 애들이 있기 때문에
        // 각각 어쩌고를 거쳐야 map에 집어 넣을 수 있음

        // top5Favorites 변환
        List<Map<String,Object>> top5Favorites = convertFavorites(model.get("top5Favorites"));
        // entry 변환
        List<Map<String,Object>> entry = convertPlayers(model.get("entry"));
        // home/away 변환
        Map<String,Object> home = convertTeam(model.get("home"));
        Map<String,Object> away = convertTeam(model.get("away"));

        // 최종 Map 조립
        Map<String, Object> safeMap = new HashMap<>();
        safeMap.put("today", model.get("today"));
        safeMap.put("baseball", model.get("baseball"));
        safeMap.put("gameTime", model.get("gameTime"));
        safeMap.put("home", home);
        safeMap.put("away", away);
        safeMap.put("entry", entry);
        safeMap.put("top5Favorites", top5Favorites);
        safeMap.put("weather", model.get("weather")); // 외부 API 호출 데이터 포함
        safeMap.put("news", model.get("news"));       // 외부 API 호출 데이터 포함

        return safeMap;
    }

    // ================= 변환 헬퍼 =================

    private Map<String,Object> convertTeam(Object teamObj) {
        if (teamObj == null) return null;
        Team t = (Team) teamObj;
        Map<String,Object> map = new HashMap<>();
        map.put("name", t.getName());
        map.put("img", t.getImg());
        map.put("place", t.getPlace());
        map.put("latitude", t.getLatitude());
        map.put("longitude", t.getLongitude());
        return map;
    }

    private List<Map<String,Object>> convertPlayers(Object playersObj) {
        if (playersObj == null) return new ArrayList<>();
        return ((List<GamePlayer>) playersObj).stream()
                .map(p -> {
                    Map<String,Object> map = new HashMap<>();
                    map.put("name", p.getName());
                    map.put("number", p.getNumber());
                    map.put("avgERA", p.getAvgERA());
                    map.put("opsWHIP", p.getOpsWHIP());
                    return map;
                })
                .toList();
    }

    private List<Map<String,Object>> convertFavorites(Object favoritesObj) {
        if (favoritesObj == null) return new ArrayList<>();
        return ((List<Favorite>) favoritesObj).stream()
                .map(f -> {
                    Map<String,Object> map = new HashMap<>();
                    map.put("id", f.getId());
                    map.put("title", f.getTitle());
                    map.put("playerName", f.getPlayerName());
                    map.put("playerNum", f.getPlayerNum());
                    return map;
                })
                .toList();
    }
}


