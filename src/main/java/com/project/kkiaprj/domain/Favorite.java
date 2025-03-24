package com.project.kkiaprj.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "favorite")
public class Favorite extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 25, nullable = false)
    private String title;

    @Column(length = 10, nullable = false)
    private String playerName;

    @Column(length = 10, nullable = false)
    private String playerNum;

    @ColumnDefault(value = "0")
    private long likeCnt;

    @ColumnDefault(value = "0")
    private long viewCnt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "userId")
    @ToString.Exclude
    private User user;

    @OneToMany(mappedBy = "favorite", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<FavoriteImg> favoriteImgs = new ArrayList<>();

    @OneToMany(mappedBy = "favorite", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<FavoriteComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "favorite", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<FavoriteLike> favoriteLikes = new ArrayList<>();

}
