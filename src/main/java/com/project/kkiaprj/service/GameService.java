package com.project.kkiaprj.service;

import com.project.kkiaprj.domain.GameSchedule;
import org.springframework.ui.Model;

import java.util.List;

public interface GameService {

    void gameRender(Model model);

    // 홈 정보 다 가져오기
    void homeRender(Model model);

}
