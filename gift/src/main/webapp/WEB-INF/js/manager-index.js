$(function () {
	//退出登录
    $("#g-logout").on("click",function () {
        $.post("/user/logout",null,function () {
            location.href="/page/manager-login";
        });
    });
})