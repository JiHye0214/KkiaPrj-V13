// 검색 결과 없음
const listWrapChild = document.querySelectorAll("#list-wrap a");
if(listWrapChild.length <= 0) {
    $("#list-wrap").text("검색 결과가 없습니다");
    $("#list-wrap").css({"justify-content" : "center",
                         "align-items" : "center",
                         "font-size" : "20px" ,
                         "font-weight" : "600",
                         "height" : "420px"
    });
}

// 지역 버튼 생성
const regionNames = ["고척", "광주", "대구", "대전", "부산", "수원", "인천", "잠실", "창원"];
const regionBtnWrap = document.querySelector("#region-btn-wrap");
const regionSubmitInput = document.querySelector("#submit-region");
regionNames.forEach((regionName) => {
    regionBtnWrap.innerHTML += `<div class="region">${regionName}</div>`;
});

const allBtn = document.querySelector("#all");
const regionBtns = document.querySelectorAll(".region");
const colorArr = ["#eb008a", "var(--kia-red)", "#0066b3", "#f37321", "#bd0d0d", "#909090", "#cf0a2c", "#80c8ff", "#244c81"];

// sq 비어있으면 '전체' 버튼에 active 추가, 배경색 변경, 글자 진하게
if (regionSubmitInput.value == "") {
    allBtn.classList.add("active");
}

allBtn.onclick = () => {
    if (!allBtn.classList.contains("active")) {
        allBtn.classList.add("active");
        regionSubmitInput.value = "";
        $("[name='region-form']").submit();
    }
}

// 지역 버튼 마우스오버 & 클릭
regionBtns.forEach((region, idx) => {
    if (region.textContent == regionSubmitInput.value) {
        region.classList.add("active");
    }

    region.onmouseover = () => {
        region.style.background = `${colorArr[idx]}`;
    }

    region.onmouseout = () => {
        region.style.background = ``;
    }

    region.onclick = () => {
        if (!region.classList.contains("active")) {
            regionBtns.forEach((el) => {
                el.classList.remove("active");
            })
            region.classList.add("active");

            regionSubmitInput.value = region.textContent;

            $("[name='region-form']").submit();
        }
    }
})

// 각 항목의 지역 태그 색
const regionTags = document.querySelectorAll(".region-tag");
regionTags.forEach((tag) => {
    regionNames.forEach((regionName, i) => {
        if (tag.textContent == regionName) {
            tag.style.backgroundColor = colorArr[i];
        }
    })
})

// ====================================================================================================

// 목록에서 맛집 글 저장(별)
const saveForms = document.querySelectorAll(".save-form");
const starBtns = document.querySelectorAll(".star");
const isSaveClicked = document.querySelectorAll(".isSaveClicked"); // 클릭되어있는 버튼인지 여부
const isLoggedIn = document.querySelector("#isLoggedIn"); // 로그인 여부

starBtns.forEach((star, i) => {
    // 로그인 한 유저에 따라 목록의 각 항목 star 색 변경
    if (isSaveClicked[i].value == "true") {
        star.style.fill = "var(--yellow-btn)";
    } else {
        star.style.fill = "white";
    }

    // 로그인 한 상태라면 save-form[i] 제출
    // 로그인 안 한 상태라면 로그인 페이지로 이동
    star.onclick = () => {
        if (isLoggedIn.value) {
            saveForms[i].submit();
        } else {
            location.href = "/user/logIn";
        }
    }
})
