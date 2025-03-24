// 댓글 작성
const cmtWriteBtn = document.querySelector("#comment-write-btn");
const cmtInput = document.querySelector("#comment-input");

cmtWriteBtn.onclick = () => {
    if (cmtInput.value != "") {
        document.forms["cmt-write-form"].submit();
    }
}

// 댓글 삭제
const delBtns = document.querySelectorAll(".comment-delete-btn");
const delForms = document.querySelectorAll(".comment-delete-form");
const submitDelForms = [];

delForms.forEach((delForm, idx) => {
    // input 으로 넘겨주는 값 개수 달라지면 form 의 자식 개수 확인하기
    if (delForm.childElementCount == 6) {
        submitDelForms.push(delForm);
    }
})

delBtns.forEach((delBtn, idx) => {
    delBtn.onclick = () => {
        if (confirm("댓글을 삭제하시겠습니까?")) {
            submitDelForms[idx].submit();
        }
    }
})
