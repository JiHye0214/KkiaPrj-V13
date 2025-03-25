package com.project.kkiaprj.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "game_schedule")
public class GameSchedule {
    // 전체 게임 일정
    // 날짜, 상대
    // api 대체

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String gameDate;

    @Column(nullable = false)
    private String gameTime;

    @Column(nullable = false)
    private boolean homeGame;

    @Column(nullable = false)
    private String opponent;

    @Column(nullable = false)
    private String gameState;
}
