package com.project.kkiaprj.controller;

import com.project.kkiaprj.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @RestController: @Controller + @RequestBody
// 왜냐면 @Controller는 view를 찾기 때문에 500 뜸
// 대신 RequestController는 보낼 때 프론트에서 원하는 타입(Map / ResponseEntity...)을 보내야 함
@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping("/")
    public String home_() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public ResponseEntity<Object> home() {
        return ResponseEntity.ok(homeService.getHomeData());
    }
}
