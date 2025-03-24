// 일정 넣기
const gameArr = [];
const teamArr = {
    NCHT: "/img/team-dinos.png",
    HTSK: "/img/team-landers.png",
    OBHT: "/img/team-bears.png",
    HHHT: "/img/team-eagles.png",
    HTWO: "/img/team-heros.png",
    SSHT: "/img/team-lions.png",
    HTLT: "/img/team-giants.png",
    HTLG: "/img/team-twins.png",
    KTHT: "/img/team-wiz.png"
};

const $game = document.querySelectorAll(".game-wrap .game-item");
$game.forEach((game) => {
    let arr = game.innerText.split("/");
    gameArr.push({
        gameDate : arr[0],
        homeGame : arr[1],
        opponent : arr[2],
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
                $($aTag[index]).append(`<div class="opponent-ci display-flex-set"><img src="${teamArr[game.opponent]}"/><div/>`);

                if(game.homeGame == "true") {
                    $($aTag[index]).addClass("home");
                } else {
                    $($aTag[index]).removeClass("home");
                }
            }
        })

        // 공식으로 이동
        date.onclick= () => {

            let setMonth = $month.innerText;
            let setDate = date.innerText;
            let dateComplete = "";
            let setTeamCode = "";

            // year month 가공
            let arr = setMonth.split(".");
            if(arr[1].length == 1) {
                arr[1] = `0${arr[1]}`;
                setMonth = arr.join("");
            }
            // date 가공
            if(date.innerText.length == 1){
                setDate = `0${date.innerText}`;
            }

            dateComplete = setMonth + setDate;

            gameArr.forEach((game) => {
                if(game.gameDate == that) { // 기록 있으면
                    setTeamCode = game.opponent;
                    url = `https://tigers.co.kr/game/schedule/view?type=major&gameKey=${dateComplete}${setTeamCode}0&gameDate=${dateComplete}`
                    window.open(`${url}`, "_blank"); // 새창 열기
                }
            })

        }
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
    const realToday = thisMonth;

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
                    $($theseDays[dayIndex]).addClass("dayClick");

                    const todayNumber = $($theseDays[dayIndex]).find("span");
                    $(todayNumber).addClass("today");
                }
            });
        }

        gameSetting();
    }

    // 클릭시 그것만 테두리
    $("#cal-dates").on("click", ".tag.day", function(event) {
        event.stopPropagation();

        $("#cal-dates .tag.day").removeClass("dayClick");
        $(this).addClass("dayClick");

        // 왼쪽 바에 정보 띄우기
        renderInform();
    });

    function renderInform() {
        const clickMonth = $(".year-month").text();
        const clickDay = $("#cal-dates").find("div.dayClick span").text(); // dayClick 클래스를 가진 div 태그 가져오기
        $("#bar-date").text(clickMonth + " - " + clickDay);
    }

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


