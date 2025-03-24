package com.project.kkiaprj.controller;

import com.project.kkiaprj.Util.U;
import com.project.kkiaprj.domain.Food;
import com.project.kkiaprj.domain.FoodComment;
import com.project.kkiaprj.service.FoodCommentService;
import com.project.kkiaprj.service.FoodSaveService;
import com.project.kkiaprj.service.FoodService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/community/food")
public class FoodController {

    @Value("${app.api.mapKey}")
    private String mapKey;

    @Autowired
    private FoodService foodService;

    @Autowired
    private FoodCommentService foodCommentService;

    @Autowired
    private FoodSaveService foodSaveService;

    List<String> regions = List.of("고척", "광주", "대구", "대전", "부산", "수원", "인천", "잠실", "창원");

    // 맛집 글 목록 페이지
    @GetMapping("/list")
    public String list(
            @RequestParam(name = "page", required = false, defaultValue = "1") Integer page
            , @RequestParam(name = "sq", required = false, defaultValue = "") String sq
            , HttpServletRequest request
            , Model model
    ) {
        String uri = U.getRequest().getRequestURI();
        request.getSession().setAttribute("prevPage", uri);

        boolean isValidRegion = false;
        for (String r : regions) {
            if (sq.equals(r) || sq.isEmpty()) {
                isValidRegion = true;
            }
        }

        if (isValidRegion) {
            foodService.list(page, sq, model);
            return "community/food/list";
        } else {
            return "redirect:/community/food/list";
        }
    }

    // 맛집 글 상세 페이지
    @GetMapping("/detail/{id}")
    public String detail(
            @PathVariable(name = "id") Long id
            , Model model
    ) {
        model.addAttribute("mapKey", mapKey);
        model.addAttribute("listItem", foodService.detail(id, model));
        model.addAttribute("page", "food"); // 커뮤니티 게시판들에서 comment fragment 공유하므로 댓글 작성ㆍ삭제 시 제출 form action 경로 지정 위함
        return "community/food/detail";
    }

    // 맛집 글 작성 페이지
    @GetMapping("/write")
    public void write(Model model) {
        model.addAttribute("mapKey", mapKey);
    }

    // 맛집 글 수정 페이지
    @GetMapping("/update/{id}")
    public String update(
            @PathVariable(name = "id") Long id
            , Model model
    ) {
        model.addAttribute("mapKey", mapKey);
        model.addAttribute("food", foodService.detailById(id));
        return "community/food/update";
    }

    // ----------------------------------------------------------------------------------------------------

    // 맛집 글 지역 필터
    @PostMapping("/regionSelect")
    public String regionSelect(
            String sq
            , RedirectAttributes redirectAttr
    ) {
        redirectAttr.addAttribute("sq", sq);
        return "redirect:/community/food/list";
    }

    // 목록에서 저장(별) 추가 & 삭제
    @PostMapping("/listSaveToggle")
    public String listSaveToggle(
            Long foodId
            , Integer page
            , String sq
            , RedirectAttributes redirectAttr
    ) {
        Long userId = U.getLoggedUser().getId();
        boolean isSaveCheck = foodSaveService.isSaveCheck(userId, foodId);

        if (!isSaveCheck) {
            // 로그인한 유저가 아직 저장하지 않은 글이라면
            foodSaveService.insertSave(userId, foodId); // food_save 테이블에 데이터 추가
            foodService.changeSaveCnt(1L, foodId); // food 테이블의 saveCnt +1
        } else {
            // 로그인한 유저가 이미 저장한 글이라면
            foodSaveService.deleteSave(userId, foodId); // food_save 테이블에서 데이터 삭제
            foodService.changeSaveCnt(-1L, foodId); // food 테이블의 saveCnt -1
        }

        redirectAttr.addAttribute("page", page);
        redirectAttr.addAttribute("sq", sq);
        return "redirect:/community/food/list";
    }

    // 상세에서 저장(별) 추가 & 삭제
    @PostMapping("/detailSaveToggle")
    public String detailSaveToggle(
            Long foodId
            , RedirectAttributes redirectAttr
    ) {
        Long userId = U.getLoggedUser().getId();
        boolean isSaveCheck = foodSaveService.isSaveCheck(userId, foodId);

        if (!isSaveCheck) {
            // 로그인 한 유저가 아직 저장하지 않은 글이라면
            foodSaveService.insertSave(userId, foodId); // food_save 테이블에 데이터 추가
            foodService.changeSaveCnt(1L, foodId); // food 테이블의 saveCnt +1
        } else {
            // 로그인 한 유저가 이미 저장한 글이라면
            foodSaveService.deleteSave(userId, foodId); // food_save 테이블에서 데이터 삭제
            foodService.changeSaveCnt(-1L, foodId); // food 테이블의 saveCnt -1
        }

        redirectAttr.addAttribute("id", foodId);
        return "redirect:/community/food/detail/{id}";
    }

    // 맛집 글 작성
    @PostMapping("write")
    public String wirteOk(
            Food food
            , @RequestParam List<String> restaurantName
            , @RequestParam List<String> content
            , @RequestParam List<String> address
            , @RequestParam List<Double> lat
            , @RequestParam List<Double> lng
            , Model model
    ) {
        model.addAttribute("result", foodService.write(food, restaurantName, content, address, lat, lng));
        model.addAttribute("action", "작성");
        return "community/food/success";
    }

    // 맛집 글 수정
    @PostMapping("/update")
    public String updateOk(
            Food food
            , @RequestParam List<String> restaurantName
            , @RequestParam List<String> content
            , @RequestParam List<String> address
            , @RequestParam List<Double> lat
            , @RequestParam List<Double> lng
            , Model model
    ) {
        model.addAttribute("result", foodService.update(food, restaurantName, content, address, lat, lng));
        model.addAttribute("action", "수정");
        return "community/food/success";
    }

    // 맛집 글 삭제
    @PostMapping("/delete")
    public String deleteOk(
            Long id
            , Model model
    ) {
        model.addAttribute("result", foodService.delete(id));
        model.addAttribute("action", "삭제");
        return "community/food/success";
    }

    // ----------------------------------------------------------------------------------------------------

    // 댓글 작성
    @PostMapping("/cmtWrite")
    public String cmtWriteOk(
            FoodComment foodComment
            , Long listItemId
            , Model model
    ) {
        model.addAttribute("result", foodCommentService.write(foodComment, listItemId));
        model.addAttribute("action", "댓글 작성");
        return "community/food/success";
    }

    // 댓글 삭제
    @PostMapping("/cmtDelete")
    public String cmtDeleteOk(
            Long id
            , Model model
    ) {
        model.addAttribute("result", foodCommentService.delete(id));
        model.addAttribute("action", "댓글 삭제");
        return "community/food/success";
    }

}
