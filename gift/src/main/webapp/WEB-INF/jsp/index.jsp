<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>毕业送礼物啦</title>
		<link rel="stylesheet" type="text/css" href="../fonts/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-table.min.css">
		<link rel="stylesheet" type="text/css" href="../css/base.css">
		<link rel="stylesheet" type="text/css" href="../css/gift.css">
	</head>
	<body>
		<div class="g-mask">
			<div class="g-spinner-container">
				<i class="fa fa-spinner fa-spin"></i>
			</div>
			<div class="g-wait-msg"></div>
		</div>
		<div class="g-header clearfix">
			<div class="g-header-title" title="联系方式"
							data-container="body" data-toggle="popover"
							data-placement="bottom"
							data-content="qq&nbsp;:<span class='text-primary'>919142075</span><br>电话:<span class='text-primary'>18340861248</span>"
							data-trigger="hover" data-html="true">你好，欢迎来选择礼物</div>
			
			<div class="g-myorders">礼物单</div>
			<div class="g-giftlocked">
				<i class='fa fa-lock'></i>我选的礼物<s><i>◇</i></s>
				<div class="g-giftlocked-list">
					<i id="lockgift-spinner" class="fa fa-spinner fa-spin"></i>
					<div class="g-none-msg">
						选个礼物吧～
					</div>
					<div class="g-giftlocked-list-content">
						
					</div>
					<button id="btnConfirm">确认礼物单</button>
				</div>
			</div>
			<div class="g-header-ad"></div>
			<!-- 拉下工具栏 -->
			<div class="g-drawer" title="网站使用"
							data-container="body" data-toggle="popover"
							data-placement="bottom"
							data-content="1.<span class='text-primary'>点击礼物查看详情</span><br>2.<span class='text-primary'>点击锁定</span><br>3.<span class='text-primary'>在上方我选的礼物中点击确认</span><br>4.<span class='text-primary'>输入收货信息</span><br>5.<span class='text-primary'>联系我或等待我联系</span>"
							data-trigger="hover" data-html="true"><i class="fa fa-gift"></i></div>
		</div>
		<div class="g-container">
			<div class="g-container-content">
				<div class="g-list g-books clearfix">
					<h1>书籍</h1>
				</div>
				<div class="g-list g-groceries clearfix">
					<h1>杂货</h1>
				</div>
				<div class="g-totop">
					<i class="fa fa-arrow-up"></i>
				</div>
			</div>
			<div class="g-barbox">
				<div class="g-bar"></div>
			</div>
		</div>
		
		<div class="g-modals">
			
			<div class="g-item-modal">
				<div class="g-item-modal-container">
					
					<div class="g-item-modal-content">
						<div class="g-close">byebye</div>
						<div class="g-item-modal-basic clearfix">
							<div class="g-item-modal-img">
								<img src="">
								<div class="g-item-modal-img-showarea"></div>
								<div class="g-item-modal-img-detail">
									<img src="">
								</div>
							</div>
							<div class="g-item-modal-tb">
								<div class="g-item-modal-title"></div>
								<div class="g-item-modal-brief"></div>
								<button id="lockBtn" class="">锁定</button>
							</div>
						</div>
						<div class="g-item-modal-detail"></div>
					</div>
					
					<div class="g-barbox">
						<div class="g-bar"></div>
					</div>
				</div>
			</div>
			<div class="g-order-modal">
				<div class="g-order-container">
					<div class="g-close">byebye</div>
					<div class="g-order-head">
						填写一下收货信息吧
					</div>
					<div class="g-input">
						<label>your学号</label>
						<input type="text" name="userid" placeholder="听说不好好填学号的人有可能会被老金嫌弃">
					</div>
					<div class="g-input">
						<label>你的名字</label>
						<input type="text" name="username" placeholder="みつは">
					</div>
					<div class="g-input">
						<label>location.href</label>
						<input type="text" name="address" placeholder="在哪接头，男生可以来宿舍4#405">
					</div>
					<div class="g-input">
						<label>手机、qq，邮箱也行</label>
						<input type="text" name="contact" placeholder="可以加我滴qq:919142075">
					</div>
					<button id="confirmOrderBtn" class="g-btn">哦了</button>
				</div>
			</div>
			<div class="g-myorders-modal">
				<div class="g-myorders-container">
					<div class="g-close">byebye</div>
					<div class="g-myorders-head">
						查看一下订单状态
					</div>
					<div class="g-input">
						<label>你的学号</label>
						<input type="text" name="userid" placeholder="输入学号就可以查询你的订单啦。">
					</div>
					<button id="searchOrderBtn" class="g-btn">818</button>
				<table id="myordersTable"></table>
			</div>
			
		</div>
		<script src="../js/jquery-3.3.1.min.js"></script>
		<script src="../js/popper.min.js"></script>
		<script src="../js/bootstrap.min.js"></script>
		<script src="../js/bootstrap-table.min.js"></script>
		<script src="../js/bootstrap-table-zh-CN.min.js"></script>
		<script src="../js/gift.js"></script>
	</body>
</html>