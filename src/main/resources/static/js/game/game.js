// 일정 넣기
const teamArr = [];
const gameArr = [];

// 팀 DB
const $team = document.querySelectorAll(".team-wrap .team-item");
$team.forEach((team) => {
    let arr = team.innerText.split("/");
    teamArr.push({
        code : arr[0],
        img : arr[1],
        place : arr[2]
    })
})

// 스케줄 DB
const $game = document.querySelectorAll(".game-wrap .game-item");
$game.forEach((game) => {
    let arr = game.innerText.split("/");
    gameArr.push({
        gameDate : arr[0],
        gameTime : arr[1],
        homeGame : arr[2],
        opponent : arr[3],
        gameState : arr[4]
    })
})

const gameSetting = () => {

    const $month = document.querySelector(".year-month");
    const $dateArr = document.querySelectorAll("#cal-dates .day span");
    const $aTag = document.querySelectorAll(".tag");

    $dateArr.forEach((date, index) => {
        // 일정 셋팅
        let that = `${$month.innerText}.${date.innerText}`;
        gameArr.forEach((game) => {
            if(game.gameDate == that) { // 기록 있으면
                const imgValue = teamArr.find(team => team.code === game.opponent)?.img;
                $($aTag[index]).append(`<div class="opponent-ci display-flex-set"><img src="${'/img/' + imgValue}"/><div/>`);

                if(game.homeGame == "true") {
                    $($aTag[index]).addClass("home");
                } else {
                    $($aTag[index]).removeClass("home");
                }
            }
        })
    })
};

// 달력 ------------------
$(document).ready(function () {
    calendarInit();
});

/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

const calendarInit = () => {
    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const realToday = thisMonth; // 오늘 날짜 표시
    let drawDate = { // 클릭한 날짜 css
        yearMonth: realToday.getFullYear() + "." + (realToday.getMonth() + 1),
        date: realToday.getDate()
    }

    // 달력에서 표기하는 날짜 객체
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    renderCalender(thisMonth);

    // 캘린더 렌더링
    function renderCalender(thisMonth) {
        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0); // 0번째는 지난달 마지막날을 의미한다
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // 현재 월 표기
        $(".year-month").text(currentYear + "." + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector("#cal-dates");
        calendar.innerHTML = "";

        // 지난달
        for (var i = prevDate - prevDay; i <= (prevDay == 6 ? 0 : prevDate); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + "</div>";
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="tag day current display-flex"><p class="display-flex-set"><span>' + i + "</span></p></div>";
        }
        // 다음달
        for (var i = 1; i <= (6 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + "</div>";
        }

        // 오늘 날짜에 색깔
        if ($(".year-month").text() == realToday.getFullYear() + "." + (realToday.getMonth() + 1)) {
            const $theseDays = document.querySelectorAll("#cal-dates .tag.day");

            $("#cal-dates .tag.day span").each((dayIndex, day) => { // $.each 말고 .each 써도 됨
                if (realToday.getDate() == parseInt($(day).text(), 10)) {
                    const todayNumber = $($theseDays[dayIndex]).find("span");
                    $(todayNumber).addClass("today");
                }
            });
        }
        // 클릭 day css
        if ($(".year-month").text() == drawDate.yearMonth) {
            const $theseDays = document.querySelectorAll("#cal-dates .tag.day");

            $("#cal-dates .tag.day span").each((dayIndex, day) => { // $.each 말고 .each 써도 됨
                if (parseInt($(day).text(), 10) == drawDate.date) {
                    $($theseDays[dayIndex]).addClass("dayClick");
                }
            });
        }

        gameSetting();
    }

    // 클릭 시 그것만 색깔 변경
    $("#cal-dates").on("click", ".tag.day", function(event) {
        event.stopPropagation();

        $("#cal-dates .tag.day").removeClass("dayClick");
        $(this).addClass("dayClick");

        // 왼쪽 바에 정보 띄우기
        renderInform();
    });

    const renderInform = () => {
        const clickMonth = $(".year-month").text();
        const clickDate = $("#cal-dates").find("div.dayClick span").text().trim();
        let setFullDate = clickMonth + "." + clickDate;

        // 현재 클릭한 날짜 셋팅
        drawDate.yearMonth = clickMonth;
        drawDate.date = clickDate;

        // 게임 상세 정보...
        let matchFound = false; // 경기 여부 체크
        gameArr.forEach((game) => {
            if (game.gameDate === setFullDate) {
                matchFound = true;
                const teamValue = teamArr.find(team => team.code === game.opponent);

                const newContent = `
                    <div id="bar-state" class="display-flex-set">
                        <p class='inform-items ${game.gameState == "soon" ? "soon" : ""}'>${game.gameState == "soon" ? "경기 예정" : "경기 종료"}</p>
                        <p id="game-result" class='inform-items'>${game.gameState == "win" ? "승" : game.gameState == "lose" ? "패" : game.gameState == "draw" ? "무" : ""}</p>
                    </div>
                    <div id="bar-date">${game.gameDate + " " + game.gameTime}</div>
                    <div id="bar-location">
                        ${game.homeGame == "true" ? "광주-기아챔피언스필드" : teamValue.place}
                    </div>
                    <div id="bar-opponent" class="display-flex-set">
                        <img id="home-logo" src="/img/v13.png"/>
                        vs
                        <img id="opponent-logo" src="${'/img/' + teamValue.img}" />
                    </div>
                    <div id="bar-detail-btn" class="inform-items btn-hover">
                        자세히 보기  ➡️
                    </div>
                    <img id="bar-bottom-img" src="/img/2025_cheer_pc.png"/>
                `;

                if ($("#bar-inform").is(":hidden")) {
                    $("#bar-inform-fade").html(newContent);
                    applyGameResultStyle(game.gameState);
                    $("#bar-inform").fadeIn(300);
                } else {
                    // 기존 내용이 있을 때는 애니메이션 적용
                    $("#bar-inform-fade").fadeOut(300, function () {
                        $(this).html(newContent);
                        applyGameResultStyle(game.gameState);
                        $(this).fadeIn(300);
                    });
                }

                // 게임 결과 스타일 적용 함수
                function applyGameResultStyle(gameState) {
                    let $gameResult = $("#game-result");
                    switch (gameState) {
                        case "win":
                            $gameResult.css({ "background-color": "var(--kia-red)", "display": "block" });
                            break;
                        case "lose":
                            $gameResult.css({ "background-color": "", "display": "block" });
                            break;
                        case "cancel":
                            $gameResult.css({ "background-color": "lightgray", "display": "block" });
                            break;
                        default:
                            $gameResult.css("display", "none");
                    }
                }

                $("#bar-inform").off("click").on("click", "#bar-detail-btn", function () {
                    let setMonth = clickMonth;
                    let setDate = clickDate;
                    let dateComplete = "";
                    let setTeamCode = "";
                    let url = "";

                    // year month 가공 (1자리 월을 2자리로 변환)
                    let arr = setMonth.split(".");
                    if (arr[1].length === 1) {
                        arr[1] = `0${arr[1]}`;
                        setMonth = arr.join("");
                    }

                    // date 가공 (1자리 날짜를 2자리로 변환)
                    if (setDate.length === 1) {
                        setDate = `0${setDate}`;
                    }

                    dateComplete = setMonth + setDate;
                    setTeamCode = game.opponent;

                    if(game.gameState == "soon") {
                        url = `https://tigers.co.kr/game/schedule/major/${setMonth}`;
                    } else {
                        url = `https://tigers.co.kr/game/schedule/view?type=major&gameKey=${dateComplete}${setTeamCode}0&gameDate=${dateComplete}`;
                    }

                    window.open(url, "_blank"); // 새 창 열기
                });
            }
        });

        if(!matchFound) {
            $("#bar-inform").fadeOut(300);
        }
    };

    renderInform();


    // 이전달로 이동
    $(".go-prev").on("click", function () {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $(".go-next").on("click", function () {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth);
    });
}


