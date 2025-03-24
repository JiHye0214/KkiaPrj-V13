package com.project.kkiaprj.service;

import com.project.kkiaprj.domain.Favorite;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FavoriteService {

    // 최애 글 목록 조회 (페이징)
    List<Favorite> list(Integer page, String sq, Model model);

    List<Favorite> findTop5();

    // 특정 최애 글 likeCnt 변경 (좋아요 추가 시 num : 1 / 좋아요 해제 시 num : -1)
    int changeLikeCnt(Long num, Long favoriteId);

    // 최애 글 상세 조회 (조회수 증가X)
    Favorite detailById(Long id);

    // 최애 글 상세 조회 (조회수 증가O)
    Favorite detail(Long id, Model model);

    // 최애 글 작성
    int write(Favorite favorite, Map<String, MultipartFile> files);

    // 최애 글 수정
    int update(
            Favorite favorite
            , Map<String, MultipartFile> files
            , Long[] delfile
    );

    // 최애 글 삭제
    int delete(Long id);

}
