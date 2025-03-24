$("#market-delete-btn").on("click", function(){
    if(confirm("삭제하시겠습니까?")) {
        $("#market-delete-form").submit();
    }
})

// 팝업
const recipientId = document.querySelector("#recipientId");
$("#market-chat-btn").on("click", function() {
    let talkOption = "width = 450px, height = 630px, top = 100px, left = 300px";
    let talkUrl = `/market/talk/${recipientId.value}`;
    openTalk = window.open(talkUrl, "chat-popup", talkOption);
})


