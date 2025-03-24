const $imgWrap = document.querySelector(".swiper");
const $imgArr = document.querySelectorAll(".swiper-slide > img");

// 이미지 없으면 아예 없애기
if($imgArr.length == 0) {
    $imgWrap.style.display = `none`;
} else {
    $imgWrap.style.display = ``;
}

if($imgArr.length < 5) {
    $imgWrap.style.overflowX = `hidden`;
}