<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="../css/base.css">
		<link rel="stylesheet" type="text/css" href="../css/manager.css">
		<title>我要登录</title>
	</head>
	<body>
		<div class="g-login">
			<input type="text" name="id" placeholder="id">
			<input type="password" name="password" placeholder="密码">
			<button>登录</button>
		</div>
		<script src="../js/jquery-3.3.1.min.js"></script>
		<script>
			$(function () {
				$("[name=id]").focus();
				//快捷键
				$("[name=id]").on("keydown",function (e) {
					if(e.keyCode==13){
						$("[name=password]").focus();
					}
				});
				$("[name=password]").on("keydown",function (e) {
					if(e.keyCode==13){
						$("button").click();
					}
				});
				//登录按钮
				$("button").on("click",function () {
					var id=$("[name=id]").val().trim();
					var pwd=$("[name=password]").val().trim();
					if(!id||!pwd)return;
					$.post("/user/login",{"id":id,"password":pwd},function (data) {
						if(data.status==200){
							location.href="/page/manager-orders";
						}else {
							alert("登录错了，怎么搞的。。。");
							$("[name=password]").focus();
						}
					})
				});
			});
		</script>
	</body>
</html>