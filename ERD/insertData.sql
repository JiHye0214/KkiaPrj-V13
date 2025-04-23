-- 기존 데이터 삭제
-- chatGPT 존나미워 한번에 실행 Alt + X 인데 무슨 Ctrl + Enter ㅇㅈㄹ
-- 니 때문에 지금 몇 시간을 버렸냐 누굴 탓하냐 내 탓이지 너무 의존했다 하...

DELETE FROM favorite_like;
DELETE FROM favorite_comment;
DELETE FROM favorite_img;
DELETE FROM favorite;
DELETE FROM food_save;
DELETE FROM food_comment;
DELETE FROM food_item;
DELETE FROM food;
DELETE FROM post_comment;
DELETE FROM post_img;
DELETE FROM post;

DELETE FROM market_img;
DELETE FROM market_talk;
DELETE FROM market_talk_list;
DELETE FROM market;
DELETE FROM live_chat;
DELETE FROM game_schedule;
DELETE FROM game_record;
DELETE FROM game_player;
DELETE FROM team;
DELETE FROM user;
DELETE FROM user_img;

ALTER TABLE favorite_like AUTO_INCREMENT = 1;
ALTER TABLE favorite_comment AUTO_INCREMENT = 1;
ALTER TABLE favorite_img AUTO_INCREMENT = 1;
ALTER TABLE favorite AUTO_INCREMENT = 1;
ALTER TABLE food_save AUTO_INCREMENT = 1;
ALTER TABLE food_comment AUTO_INCREMENT = 1;
ALTER TABLE food_item AUTO_INCREMENT = 1;
ALTER TABLE food AUTO_INCREMENT = 1;
ALTER TABLE post_comment AUTO_INCREMENT = 1;
ALTER TABLE post_img AUTO_INCREMENT = 1;
ALTER TABLE post AUTO_INCREMENT = 1;

ALTER TABLE market_img AUTO_INCREMENT = 1;
ALTER TABLE market_talk AUTO_INCREMENT = 1;
ALTER TABLE market_talk_list AUTO_INCREMENT = 1;
ALTER TABLE market AUTO_INCREMENT = 1;
ALTER TABLE live_chat AUTO_INCREMENT = 1;
ALTER TABLE game_schedule AUTO_INCREMENT = 1;
ALTER TABLE game_record AUTO_INCREMENT = 1;
ALTER TABLE game_player AUTO_INCREMENT = 1;
ALTER TABLE team AUTO_INCREMENT = 1;
ALTER TABLE user_img AUTO_INCREMENT = 1;
ALTER TABLE user AUTO_INCREMENT = 1;

-- 유저 프사
-- 얘 먼저 하고 user 하면 됨 !
INSERT INTO user_img (fileName, sourceName, userId) VALUES
("2017.jpg", "2017.jpg", 1),
("2017.jpg", "2017.jpg", 2),
("2017.jpg", "2017.jpg", 3),
("2017.jpg", "2017.jpg", 4)
;

-- 유저
INSERT INTO user(loginId, password, name, nickname, email, birth, gender, createdDate, userImgId, authority) VALUES
('1234', '$2a$10$K6ipjV2LUKV2ncw3FE9wwe1PEn3lHepog5kKu/vutJ2K9HFLQ/12m', '김우승', '어우기', 'djdnrl@mail.com', "2000-4-12", "여자", now(), 1, "ADMIN"),
('apple1234', '$2a$10$6gVaMy7.lbezp8bGRlV2fOArmA3WAk2EHxSKxncnzs28/m3DXPyA2', '박사과', '말랑한고구마', 'apple@mail.com', "2001-6-3", "여자", now(), 2, "MEMBER"),
('melon1234', '$2a$10$7LTnvLaczZbEL0gabgqgfezQPr.xOtTab2NAF/Yt4FrvTSi0Y29Xa', '김멜론', '맑은아침햇살', 'melon@mail.com', "2002-2-24", "남자", now(), 3, "MEMBER"),
('cherry1234', '$2a$10$53OEi/JukSMPr3z5RQBFH.z0TCYSUDPtxf1/8caRyRVdDNdHA9QHi', '이체리', '마라탕먹고싶다', 'cherry@mail.com', "2003-10-19", "남자", now(), 4, "MEMBER")
;

-- 맛집 글
INSERT INTO food(title, region, saveCnt, viewCnt, createdDate, userId) VALUES
('맛집글1', '광주', 0, 0, now(), 2),
('맛집글2', '광주', 0, 0, now(), 2),
('맛집글3', '광주', 0, 0, now(), 3),
('맛집글4', '대구', 0, 0, now(), 3),
('맛집글5', '부산', 0, 0, now(), 4),
('맛집글6', '대구', 0, 0, now(), 4),
('맛집글7', '광주', 0, 0, now(), 2),
('맛집글8', '광주', 0, 0, now(), 2),
('맛집글9', '대전', 0, 0, now(), 3),
('맛집글10', '수원', 0, 0, now(), 3),
('맛집글11', '광주', 0, 0, now(), 4),
('맛집글12', '대전', 0, 0, now(), 4),
('맛집글13', '인천', 0, 0, now(), 2),
('맛집글14', '잠실', 0, 0, now(), 2),
('맛집글15', '광주', 0, 0, now(), 3),
('맛집글16', '광주', 0, 0, now(), 3),
('맛집글17', '고척', 0, 0, now(), 4),
('맛집글18', '수원', 0, 0, now(), 4),
('맛집글19', '광주', 0, 0, now(), 2),
('맛집글20', '광주', 0, 0, now(), 2)
;

-- 페이징 테스트용 다량 데이터
-- INSERT INTO food(title, region, saveCnt, viewCnt, isSaveClicked, createdDate, userId)
-- SELECT title, region, saveCnt, viewCnt, isSaveClicked, now(), userId
-- FROM food;

-- 맛집 글 항목
INSERT INTO food_item(restaurantName, content, address, lat, lng, foodId) VALUES
('라스트춘선 안양점', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1045-9', 37.3908408022861, 126.953373087799, 1),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 1),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 2),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 3),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 4),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 5),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 6),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 7),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 8),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 9),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 10),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 11),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 12),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 13),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 14),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 15),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 16),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 17),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 18),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 19),
('호랑이굴', '로컬 식당이라 주민들밖에 모르는데 택시 기사님 추천받아서 갔다.', '경기 안양시 동안구 호계동 1043-1', 37.39201269687231, 126.95482912267362, 20)
;

-- 맛집 글 댓글
INSERT INTO food_comment(content, createdDate, userId, foodId) VALUES
('말랑한고구마가 1번 글에 댓글 작성', now(), 2, 1),
('말랑한고구마가 2번 글에 댓글 작성', now(), 2, 2),
('말랑한고구마가 3번 글에 댓글 작성', now(), 2, 3),
('말랑한고구마가 4번 글에 댓글 작성', now(), 2, 4),
('맑은아침햇살이 1번 글에 댓글 작성', now(), 3, 1),
('맑은아침햇살이 2번 글에 댓글 작성', now(), 3, 2),
('맑은아침햇살이 3번 글에 댓글 작성', now(), 3, 3),
('맑은아침햇살이 4번 글에 댓글 작성', now(), 3, 4),
('마라탕먹고싶다가 1번 글에 댓글 작성', now(), 4, 1),
('마라탕먹고싶다가 2번 글에 댓글 작성', now(), 4, 2),
('마라탕먹고싶다가 3번 글에 댓글 작성', now(), 4, 3),
('마라탕먹고싶다가 4번 글에 댓글 작성', now(), 4, 4)
;

-- 최애 글
INSERT INTO favorite(title, playerName, playerNum, likeCnt, viewCnt, createdDate, userId) VALUES
('최애글1', '유지성', '4',  0, 0, now(), 2),
('최애글2', '곽도규', '9', 0, 0, now(), 2),
('최애글3', '황동하', '10', 0, 0, now(), 3),
('최애글4', '윤영철', '13', 0, 0, now(), 3),
('최애글5', '김현수', '15', 0, 0, now(), 4),
('최애글6', '임기영', '17', 0, 0, now(), 4),
('최애글7', '유지성', '4',  0, 0, now(), 2),
('최애글8', '곽도규', '9', 0, 0, now(), 2),
('최애글9', '황동하', '10', 0, 0, now(), 3),
('최애글10', '윤영철', '13', 0, 0, now(), 3),
('최애글11', '김현수', '15', 0, 0, now(), 4),
('최애글12', '임기영', '17', 0, 0, now(), 4),
('최애글13', '황동하', '10', 0, 0, now(), 2),
('최애글14', '윤영철', '13', 0, 0, now(), 2),
('최애글15', '김현수', '15', 0, 0, now(), 3),
('최애글16', '임기영', '17', 0, 0, now(), 3)
;

-- 페이징 테스트용 다량 데이터
-- INSERT INTO favorite(title, playerName, playerNum, content, likeCnt, viewCnt, isLikeClicked, createdDate, userId)
-- SELECT title, playerName, playerNum, content, likeCnt, viewCnt, isLikeClicked, now(), userId
-- FROM favorite;

-- 최애 글 이미지
INSERT INTO favorite_img (fileName, sourceName, favoriteId) VALUES
("player1.jpg", "player1.jpg", 1),
("player2.jpg", "player2.jpg", 2),
("브이 도영.jpg", "브이 도영.jpg", 3),
("잘생긴 도영.jpg", "잘생긴 도영.jpg", 4),
("하트 영철.jpg", "하트 영철.jpg", 5),
("goods.jpg", "goods.jpg", 6),
("tiger.png", "tiger.png", 7),
("player1.jpg", "player1.jpg", 8),
("player2.jpg", "player2.jpg", 9),
("브이 도영.jpg", "브이 도영.jpg", 10),
("잘생긴 도영.jpg", "잘생긴 도영.jpg", 11),
("하트 영철.jpg", "하트 영철.jpg", 12),
("goods.jpg", "goods.jpg", 13),
("tiger.png", "tiger.png", 14),
("브이 도영.jpg", "브이 도영.jpg", 15),
("잘생긴 도영.jpg", "잘생긴 도영.jpg", 16),
("player2.jpg", "player2.jpg", 16)
;

-- 최애 글 댓글
INSERT INTO favorite_comment(content, createdDate, userId, favoriteId) VALUES
('말랑한고구마가 1번 글에 댓글 작성', now(), 2, 1),
('말랑한고구마가 2번 글에 댓글 작성', now(), 2, 2),
('말랑한고구마가 3번 글에 댓글 작성', now(), 2, 3),
('말랑한고구마가 4번 글에 댓글 작성', now(), 2, 4),
('말랑한고구마가 5번 글에 댓글 작성', now(), 2, 5),
('말랑한고구마가 6번 글에 댓글 작성', now(), 2, 6),
('맑은아침햇살이 1번 글에 댓글 작성', now(), 3, 1),
('맑은아침햇살이 2번 글에 댓글 작성', now(), 3, 2),
('맑은아침햇살이 3번 글에 댓글 작성', now(), 3, 3),
('맑은아침햇살이 4번 글에 댓글 작성', now(), 3, 4),
('맑은아침햇살이 5번 글에 댓글 작성', now(), 3, 5),
('맑은아침햇살이 6번 글에 댓글 작성', now(), 3, 6),
('마라탕먹고싶다가 1번 글에 댓글 작성', now(), 4, 1),
('마라탕먹고싶다가 2번 글에 댓글 작성', now(), 4, 2),
('마라탕먹고싶다가 3번 글에 댓글 작성', now(), 4, 3),
('마라탕먹고싶다가 4번 글에 댓글 작성', now(), 4, 4),
('마라탕먹고싶다가 5번 글에 댓글 작성', now(), 4, 5),
('마라탕먹고싶다가 6번 글에 댓글 작성', now(), 4, 6)
;

-- 자유게시판 글 
INSERT INTO post(title, category, content, viewCnt, createdDate, userId) VALUES
('자유글1', '동행구함', '안녕하세요', 0, now(), 2),
('자유글2', '직관나눔', '안녕하세요', 0, now(), 2),
('자유글3', '갸빠일상', '안녕하세요', 0, now(), 3),
('자유글4', '기타', '안녕하세요', 0, now(), 3),
('자유글5', '동행구함', '안녕하세요', 0, now(), 4),
('자유글6', '직관나눔', '안녕하세요', 0, now(), 4),
('자유글7', '갸빠일상', '안녕하세요', 0, now(), 2),
('자유글8', '기타', '안녕하세요', 0, now(), 2),
('자유글9', '동행구함', '안녕하세요', 0, now(), 3),
('자유글10', '직관나눔', '안녕하세요', 0, now(), 3),
('자유글11', '갸빠일상', '안녕하세요', 0, now(), 4),
('자유글12', '기타', '안녕하세요', 0, now(), 4),
('자유글13', '동행구함', '안녕하세요', 0, now(), 2),
('자유글14', '직관나눔', '안녕하세요', 0, now(), 2),
('자유글15', '갸빠일상', '안녕하세요', 0, now(), 3),
('자유글16', '기타', '안녕하세요', 0, now(), 3)
;

-- 자유게시판 이미지
INSERT INTO post_img (fileName, sourceName, postId) VALUES
("player1.jpg", "player1.jpg", 1),
("player2.jpg", "player2.jpg", 2),
("브이 도영.jpg", "브이 도영.jpg", 3),
("잘생긴 도영.jpg", "잘생긴 도영.jpg", 4),
("하트 영철.jpg", "하트 영철.jpg", 5),
("goods.jpg", "goods.jpg", 6),
("tiger.png", "tiger.png", 7),
("player1.jpg", "player1.jpg", 8),
("player2.jpg", "player2.jpg", 9),
("브이 도영.jpg", "브이 도영.jpg", 10),
("잘생긴 도영.jpg", "잘생긴 도영.jpg", 11),
("하트 영철.jpg", "하트 영철.jpg", 12),
("goods.jpg", "goods.jpg", 13),
("tiger.png", "tiger.png", 14),
("브이 도영.jpg", "브이 도영.jpg", 15),
("잘생긴 도영.jpg", "잘생긴 도영.jpg", 16),
("player2.jpg", "player2.jpg", 16)
;

-- 자유게시판 댓글 
INSERT INTO post_comment(content, createdDate, userId, postId) VALUES
('말랑한고구마가 1번 글에 댓글 작성', now(), 2, 1),
('말랑한고구마가 2번 글에 댓글 작성', now(), 2, 2),
('말랑한고구마가 3번 글에 댓글 작성', now(), 2, 3),
('말랑한고구마가 4번 글에 댓글 작성', now(), 2, 4),
('말랑한고구마가 5번 글에 댓글 작성', now(), 2, 5),
('말랑한고구마가 6번 글에 댓글 작성', now(), 2, 6),
('맑은아침햇살이 1번 글에 댓글 작성', now(), 3, 1),
('맑은아침햇살이 2번 글에 댓글 작성', now(), 3, 2),
('맑은아침햇살이 3번 글에 댓글 작성', now(), 3, 3),
('맑은아침햇살이 4번 글에 댓글 작성', now(), 3, 4),
('맑은아침햇살이 5번 글에 댓글 작성', now(), 3, 5),
('맑은아침햇살이 6번 글에 댓글 작성', now(), 3, 6),
('마라탕먹고싶다가 1번 글에 댓글 작성', now(), 4, 1),
('마라탕먹고싶다가 2번 글에 댓글 작성', now(), 4, 2),
('마라탕먹고싶다가 3번 글에 댓글 작성', now(), 4, 3),
('마라탕먹고싶다가 4번 글에 댓글 작성', now(), 4, 4),
('마라탕먹고싶다가 5번 글에 댓글 작성', now(), 4, 5),
('마라탕먹고싶다가 6번 글에 댓글 작성', now(), 4, 6)
;

-- 마켓 글 작성
INSERT INTO market (product, content, price, region, userId, createdDate) VALUES
('김도영 유니폼 자수 마킹 3번 입은 거 팝니다', '김도영 유니폼 자수 마킹 3번 입은 거 a팝니다', 100000, '광주광역시 북구', 1, now()),
('호통이 2묶음', '호통이 2묶음', 50000, '광주광역시 북구', 2, now()),
('윤영철 싸인볼', '윤영철 싸인볼', 50000, '광주광역시 북구', 3, now()),
('이의리 아이콘 유니폼', '이의리 아이콘 유니폼', 100000, '광주광역시 북구', 4, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('영철이의 미소', '영철이 내년에는 10승 하고 신인상 받자', 9999999, '서울특별시 송파구', 1, now()),
('상품1', '호통이 2묶음', 50000, '광주광역시 북구', 2, now()),
('상품2', '호통이 2묶음', 50000, '광주광역시 북구', 2, now()),
('상품3', '호통이 2묶음', 50000, '광주광역시 북구', 2, now()),
('상품4', '호통이 2묶음', 50000, '광주광역시 북구', 2, now()),
('상품5', '호통이 2묶음', 50000, '광주광역시 북구', 2, now()),
('상품6', '호통이 2묶음', 50000, '광주광역시 북구', 2, now())
;

-- 마켓 글 이미지
INSERT INTO market_img (fileName, sourceName, marketId) VALUES
('goods.jpg', 'good.jpg', 1),
('goods.jpg', 'good.jpg', 1),
('goods.jpg', 'good.jpg', 1),
('goods.jpg', 'good.jpg', 1),
('goods.jpg', 'good.jpg', 1),
('goods.jpg', 'good.jpg', 1),
('goods.jpg', 'good.jpg', 1),
('player2.jpg', 'player2.jpg', 2),
('tiger.png', 'tiger.png', 2),
('브이 도영.jpg', '브이 도영.jpg', 3),
('잘생긴 도영.jpg', '잘생긴 도영.jpg', 4),
('하트 영철.jpg', '하트 영철.jpg', 5),
('하트 영철.jpg', '하트 영철.jpg', 6),
('하트 영철.jpg', '하트 영철.jpg', 7),
('하트 영철.jpg', '하트 영철.jpg', 8),
('하트 영철.jpg', '하트 영철.jpg', 9),
('하트 영철.jpg', '하트 영철.jpg', 10),
('하트 영철.jpg', '하트 영철.jpg', 11),
('하트 영철.jpg', '하트 영철.jpg', 12),
('player2.jpg', 'player2.jpg', 13),
('player2.jpg', 'player2.jpg', 14),
('player2.jpg', 'player2.jpg', 15),
('player2.jpg', 'player2.jpg', 16),
('player2.jpg', 'player2.jpg', 17),
('player2.jpg', 'player2.jpg', 18)
;

-- 마켓 채팅방
INSERT INTO market_talk_list (name) VALUES 
('4_2')
;

-- 마켓 채팅
INSERT INTO market_talk (content, recipientId, createdDate, userId, marketTalkListId) VALUES 
('안녕하세요', 4, now(), 2, 1),
('안녕하세요2', 4, now(), 2, 1),
('안녕하세요3', 4, now(), 2, 1),
('안녕하세요4', 4, now(), 2, 1),
('안녕하세요4', 2, now(), 4, 1),
('안녕하세요4', 2, now(), 4, 1),
('안녕하세요4', 2, now(), 4, 1),
('안녕하세요4', 4, now(), 2, 1)
;

-- 구단 정보
INSERT INTO team (code, name, img, place, latitude, longitude) VALUES
("NCHT", "Dinos", "team-dinos.png", "창원NC파크", 35.2228007, 128.5820053),
("HTSK", "Landers", "team-landers.png", "인천SSG랜더스필드", 37.4369986, 126.6932732),
("OBHT", "Bears", "team-bears.png", "잠실야구장", 37.5121518, 127.0719083),
("HHHT", "Eagles", "team-eagles.png", "대전한화생명볼파크", 36.3161662, 127.4315378),
("WOHT", "Heros",  "team-heros.png", "고척스카이돔", 37.4982302,  126.8671030),
("SSHT", "Lions", "team-lions.png", "대구삼성라이온즈파크", 35.8410568, 128.6816571),
("HTLT", "Giants", "team-giants.png", "사직야구장", 35.1940153, 129.0615412),
("HTLG", "Twins", "team-twins.png", "잠실야구장", 37.5121518, 127.0719083),
("KTHT", "Wiz", "team-wiz.png", "수원KT위즈파크", 37.2997194, 127.0097703),
("KKIA", "Tigers", "v13.png", "광주기아챔피언스필드", 35.1682047, 126.8891093)
;

-- 직관 기록
INSERT INTO game_record (userId, recordDate, recordMemo, recordPlace, recordResult) VALUES 
(1, "2025.1.2", "안녕", "잠실야구장", "win"),
(1, "2025.1.4", "기아", "잠실야구장", "win"),
(1, "2025.1.24", "우승", "잠실야구장", "win"),
(1, "2025.1.3", "무조건", "잠실야구장", "win")
;

-- 선수 정보
-- api 대신 

INSERT INTO game_player (name, number, average) VALUES
("곽도규", 0, 27.000),
("박찬호", 1, 0.222),
("박민", 2, DEFAULT),   -- 기본값 0.000 적용
("김선빈", 3, 0.440),
("유지성", 4, DEFAULT),   -- 기본값 0.000 적용
("김도영", 5, 0.500),
("이창진", 8, DEFAULT),   -- 기본값 0.000 적용
("윤도현", 9, 0.333),
("김태형", 10, DEFAULT),
("조상우", 11, 2.450),
("김두현", 12, DEFAULT),
("윤영철", 13, 9.000),
("김규성", 14, 0.400),
("박정우", 15, 0.500),
("최원준", 16, 0.286),
("임기영", 17, 27.000),
("윤중현", 19, DEFAULT),
("이준영", 20, 6.750),
("김사윤", 21, DEFAULT),
("주효상", 22, DEFAULT),
("최정용", 23, DEFAULT),
("김승현", 24, DEFAULT),
("이우성", 25, 0.250),
("한승택", 26, DEFAULT),
("김호령", 27, DEFAULT),
("이형범", 28, 0.000),
("변우혁", 29, 0.286),
("박준표", 31, DEFAULT),
("김현수", 32, DEFAULT),
("올러", 33, 4.090),
("최형우", 34, 0.290),
("김석환", 35, DEFAULT),
("박재현", 36, 0.125),
("강동훈", 37, DEFAULT),
("장재혁", 38, DEFAULT),
("최지민", 39, 2.450),
("네일", 40, 0.000),
("황동하", 41, 6.430),
("김태군", 42, 0.167),
("김건국", 43, DEFAULT),
("이상준", 44, DEFAULT),
("위즈덤", 45, 0.292),
("김정엽", 46, DEFAULT),
("나성범", 47, 0.296),
("이의리", 48, DEFAULT),
("김민주", 49, DEFAULT),
("유승철", 50, 4.500),
("전상현", 51, 10.130),
("황대인", 52, DEFAULT),
("김기훈", 53, DEFAULT),
("양현종", 54, 4.090),
("한준수", 55, 0.222),
("오선우", 56, DEFAULT),
("고종욱", 57, DEFAULT),
("서건창", 58, 0.167),
("양수호", 59, DEFAULT),
("김도현", 60, 0.000),
("김민재", 61, DEFAULT),
("정해영", 62, 9.000),
("이호민", 63, DEFAULT),
("손승락", 68, DEFAULT),
("김대유", 69, DEFAULT),
("진갑용", 70, DEFAULT),
("이범호", 71, DEFAULT),
("정재훈", 73, DEFAULT),
("박기남", 74, DEFAULT),
("조재영", 75, DEFAULT),
("김주찬", 76, DEFAULT),
("홍세완", 77, DEFAULT),
("최희섭", 78, DEFAULT),
("이정호", 79, DEFAULT),
("이현곤", 80, DEFAULT),
("타케시", 83, DEFAULT),
("이동걸", 85, DEFAULT),
("이해창", 87, DEFAULT),
("조승범", 89, DEFAULT),
("박효일", 90, DEFAULT),
("김석연", 91, DEFAULT),
("서덕원", 93, DEFAULT),
("이상화", 97, DEFAULT),
("김민우", 99, DEFAULT)
;


-- 공식 일정
-- api 대신
INSERT INTO game_schedule (gameDate, gameTime, homeGame, opponent, gameState) VALUES
-- boolean 0 / 1
("2025.3.22", "14:00", TRUE, "NCHT", "win"),
("2025.3.23", "14:00", TRUE, "NCHT", "lose"),
("2025.3.25", "18:30", TRUE, "WOHT", "win"),
("2025.3.26", "18:30", TRUE, "WOHT", "lose"),
("2025.3.27", "18:30", TRUE, "WOHT", "lose"),
("2025.3.28", "18:30", false, "HHHT", "lose"),
("2025.3.29", "14:00", false, "HHHT", "lose"),
("2025.3.30", "14:00", false, "HHHT", "win"),
("2025.4.1", "18:30", TRUE, "SSHT", "cancel"),
("2025.4.2", "18:30", TRUE, "SSHT", "lose"),
("2025.4.3", "18:30", TRUE, "SSHT", "win"),
("2025.4.4", "18:30", false, "HTLG", "lose"),
("2025.4.5", "14:00", false, "HTLG", "cancel"),
("2025.4.6", "14:00", false, "HTLG", "lose"),
("2025.4.8", "18:30", false, "HTLT", "win"),
("2025.4.9", "18:30", false, "HTLT", "win"),
("2025.4.10", "18:30", false, "HTLT", "lose"),
("2025.4.11", "18:30", TRUE, "HTSK", "lose"),
("2025.4.12", "17:00", TRUE, "HTSK", "cancel"),
("2025.4.13", "14:00", TRUE, "HTSK", "win"),
("2025.4.15", "18:30", TRUE, "KTHT", "win"),
("2025.4.16", "18:30", TRUE, "KTHT", "lose"),
("2025.4.17", "18:30", TRUE, "KTHT", "win"),
("2025.4.18", "18:30", false, "OBHT", "lose"),
("2025.4.19", "17:00", false, "OBHT", "win"),
("2025.4.20", "14:00", false, "OBHT", "win"),
("2025.4.22", "18:30", false, "SSHT", "cancel"),
("2025.4.23", "18:30", false, "SSHT", "soon"),
("2025.4.24", "18:30", false, "SSHT", "soon"),
("2025.4.25", "18:30", TRUE, "HTLG", "soon"),
("2025.4.26", "17:00", TRUE, "HTLG", "soon"),
("2025.4.27", "14:00", TRUE, "HTLG", "soon"),
("2025.4.29", "18:30", false, "NCHT", "soon"),
("2025.4.30", "18:30", false, "NCHT", "soon"),
("2025.5.1", "18:30", false, "NCHT", "soon"),
("2025.5.2", "18:30", true, "HHHT", "soon"),
("2025.5.3", "17:00", true, "HHHT", "soon"),
("2025.5.4", "14:00", true, "HHHT", "soon"),
("2025.5.5", "14:00", false, "WOHT", "soon"),
("2025.5.6", "14:00", false, "WOHT", "soon"),
("2025.5.7", "18:30", false, "WOHT", "soon"),
("2025.5.9", "18:30", false, "HTSK", "soon"),
("2025.5.10", "17:00", false, "HTSK", "soon"),
("2025.5.11", "14:00", false, "HTSK", "soon"),
("2025.5.13", "18:30", true, "HTLT", "soon"),
("2025.5.14", "18:30", true, "HTLT", "soon"),
("2025.5.15", "18:30", true, "HTLT", "soon"),
("2025.5.16", "18:30", true, "OBHT", "soon"),
("2025.5.17", "17:00", true, "OBHT", "soon"),
("2025.5.18", "14:00", true, "OBHT", "soon"),
("2025.5.20", "18:30", false, "KTHT", "soon"),
("2025.5.21", "18:30", false, "KTHT", "soon"),
("2025.5.22", "18:30", false, "KTHT", "soon"),
("2025.5.23", "18:30", false, "SSHT", "soon"),
("2025.5.24", "17:00", false, "SSHT", "soon"),
("2025.5.25", "14:00", false, "SSHT", "soon"),
("2025.5.27", "18:30", true, "WOHT", "soon"),
("2025.5.28", "18:30", true, "WOHT", "soon"),
("2025.5.29", "18:30", true, "WOHT", "soon"),
("2025.5.30", "18:30", false, "KTHT", "soon"),
("2025.5.31", "17:00", false, "KTHT", "soon"),
("2025.6.1", "17:00", false, "KTHT", "soon"),
("2025.6.3", "18:30", false, "OBHT", "soon"),
("2025.6.4", "18:30", false, "OBHT", "soon"),
("2025.6.5", "18:30", false, "OBHT", "soon"),
("2025.6.6", "17:00", true, "HHHT", "soon"),
("2025.6.7", "17:00", true, "HHHT", "soon"),
("2025.6.8", "17:00", true, "HHHT", "soon"),
("2025.6.10", "18:30", true, "SSHT", "soon"),
("2025.6.11", "18:30", true, "SSHT", "soon"),
("2025.6.12", "18:30", true, "SSHT", "soon"),
("2025.6.13", "18:30", false, "NCHT", "soon"),
("2025.6.14", "17:00", false, "NCHT", "soon"),
("2025.6.15", "17:00", false, "NCHT", "soon"),
("2025.6.17", "18:30", TRUE, "KTHT", "soon"),
("2025.6.18", "18:30", TRUE, "KTHT", "soon"),
("2025.6.19", "18:30", TRUE, "KTHT", "soon"),
("2025.6.20", "18:30", false, "HTSK", "soon"),
("2025.6.21", "17:00", false, "HTSK", "soon"),
("2025.6.22", "17:00", false, "HTSK", "soon"),
("2025.6.24", "18:30", false, "WOHT", "soon"),
("2025.6.25", "18:30", false, "WOHT", "soon"),
("2025.6.26", "18:30", false, "WOHT", "soon"),
("2025.6.27", "18:30", false, "HTLG", "soon"),
("2025.6.28", "17:00", false, "HTLG", "soon"),
("2025.6.29", "17:00", false, "HTLG", "soon"),
("2025.7.1", "18:30", true, "HTSK", "soon"),
("2025.7.2", "18:30", true, "HTSK", "soon"),
("2025.7.3", "18:30", true, "HTSK", "soon"),
("2025.7.4", "18:30", true, "HTLT", "soon"),
("2025.7.5", "18:00", true, "HTLT", "soon"),
("2025.7.6", "18:00", true, "HTLT", "soon"),
("2025.7.8", "18:30", false, "HHHT", "soon"),
("2025.7.9", "18:30", false, "HHHT", "soon"),
("2025.7.10", "18:30", false, "HHHT", "soon"),
("2025.7.17", "18:30", true, "NCHT", "soon"),
("2025.7.18", "18:30", true, "NCHT", "soon"),
("2025.7.19", "18:00", true, "NCHT", "soon"),
("2025.7.20", "18:00", true, "NCHT", "soon"),
("2025.7.22", "18:30", true, "HTLG", "soon"),
("2025.7.23", "18:30", true, "HTLG", "soon"),
("2025.7.24", "18:30", true, "HTLG", "soon"),
("2025.7.25", "18:30", false, "HTLT", "soon"),
("2025.7.26", "18:00", false, "HTLT", "soon"),
("2025.7.27", "18:00", false, "HTLT", "soon"),
("2025.7.29", "18:30", true, "OBHT", "soon"),
("2025.7.30", "18:30", true, "OBHT", "soon"),
("2025.7.31", "18:30", true, "OBHT", "soon"),
("2025.8.1", "18:30", true, "HHHT", "soon"),
("2025.8.2", "18:00", true, "HHHT", "soon"),
("2025.8.3", "18:00", true, "HHHT", "soon"),
("2025.8.5", "18:30", false, "HTLT", "soon"),
("2025.8.6", "18:30", false, "HTLT", "soon"),
("2025.8.7", "18:30", false, "HTLT", "soon"),
("2025.8.8", "18:30", true, "NCHT", "soon"),
("2025.8.9", "18:00", true, "NCHT", "soon"),
("2025.8.10", "18:00", true, "NCHT", "soon"),
("2025.8.12", "18:30", false, "SSHT", "soon"),
("2025.8.13", "18:30", false, "SSHT", "soon"),
("2025.8.14", "18:30", false, "SSHT", "soon"),
("2025.8.15", "18:00", false, "OBHT", "soon"),
("2025.8.16", "18:00", false, "OBHT", "soon"),
("2025.8.17", "18:00", false, "OBHT", "soon"),
("2025.8.19", "18:30", true, "WOHT", "soon"),
("2025.8.20", "18:30", true, "WOHT", "soon"),
("2025.8.21", "18:30", true, "WOHT", "soon"),
("2025.8.22", "18:30", true, "HTLG", "soon"),
("2025.8.23", "18:00", true, "HTLG", "soon"),
("2025.8.24", "18:00", true, "HTLG", "soon"),
("2025.8.26", "18:30", false, "HTSK", "soon"),
("2025.8.27", "18:30", false, "HTSK", "soon"),
("2025.8.28", "18:30", false, "HTSK", "soon"),
("2025.8.29", "18:30", false, "KTHT", "soon"),
("2025.8.30", "18:00", false, "KTHT", "soon"),
("2025.8.31", "18:00", false, "KTHT", "soon")
;
DESC game_schedule;

COMMIT;

