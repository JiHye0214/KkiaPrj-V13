package com.project.kkiaprj.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "game_player")
public class GamePlayer {
    // 2025 1군 선수 명단
    // 선수 이름, 번호
    // api 대체

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long number;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, precision = 10, scale = 3) // 소수점 3자리 설정
    private BigDecimal average;

    // 기본값 설정 (null이면 0.000)
    @PrePersist
    @PreUpdate
    public void setDefaultValues() {
        if (this.average == null) {
            this.average = BigDecimal.ZERO.setScale(3); // 0.000으로 설정
        }
    }
}
