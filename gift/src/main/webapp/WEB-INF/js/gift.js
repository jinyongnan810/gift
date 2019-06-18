$(function() {
	//
	initJQ();
	var page = giftpage();
	initpage(page);
	console.log("金勇男 18340861248");
	console.log("发生问题的时候一般刷新就可以啦。");
});

function giftpage() {
	//包装一些变量和函数
	var giftpage = {};
	//定义一些变量

	var bgs; //背景图片们
	var ads;
	//放大镜
	var small;
	var smallimg;
	var showarea;
	var big;
	var bigimg;
	var totalW;
	var totalH;
	var rate;
	var imgOffsetX;
	var imgOffsetY;
	var imgPosX;
	var imgPosY;
	var showareaWidth;
	var showareaHalfWidth;
	//bar
	var windowH;

	var itembarmoving = false;
	var itemcontentH;
	var itembarrate;
	var itembarH;
	var itembar;
	var itemcontent;
	var itembardrag;
	var itembarYBefore;

	var barmoving = false;
	var contentH;
	var barrate;
	var barH;
	var bar;
	var content;
	var bardrag;
	var barYBefore;

	function initMagnifier() {
		// 放大镜
		small = $(".g-item-modal-img");
		smallimg = $(".g-item-modal-img>img");
		showarea = $(".g-item-modal-img-showarea");
		big = $(".g-item-modal-img-detail");
		bigimg = $(".g-item-modal-img-detail img");
		totalW = bigimg.width();
		totalH = bigimg.height();
		imgOffsetX = smallimg.offset().left;
		imgOffsetY = smallimg.offset().top;
		imgPosX = smallimg.position().left;
		imgPosY = smallimg.position().top;
		rate = totalW / 270;
		showareaWidth = 480 / rate;
		showareaHalfWidth = showareaWidth / 2;
		showarea.css("width", showareaWidth).css("height", showareaWidth);
		big.hide();
		showarea.hide();
		smallimg.off("mouseenter").on("mouseenter", function() {
			if (big.is(":hidden"))
				big.fadeIn();
			if (showarea.is(":hidden"))
				showarea.fadeIn();
		})
		small.off("mousemove").on("mousemove", function(e) {
			var x = e.pageX - imgOffsetX;
			var y = e.pageY - imgOffsetY;

			var bigCenterX = x * rate;
			var bigCenterY = y * rate;
			bigimg.css("top", ((-1) * bigCenterY + 240)).css("left", ((-1) * bigCenterX + 240));
			var top = imgPosY + y - showareaHalfWidth;
			var left = imgPosX + x - showareaHalfWidth;
			showarea.css("top", top).css("left", left);

		});
		small.off("mouseleave").on("mouseleave", function() {
			big.fadeOut();
			showarea.fadeOut();
		});
		//放大镜结束
	}

	function initItemBar() {
		itemcontent = $(".g-item-modal-content");
		itembar = $(".g-item-modal .g-bar");
		itemcontentH = itemcontent.height();
		windowH = $(window).height();
		itembarrate = itemcontentH / windowH;
		itembarH = windowH / itembarrate;

		if (itembarH >= windowH) {
			$(".g-item-modal .g-barbox").hide();
		} else {
			$(".g-item-modal .g-barbox").show();
			itembar.css("height", itembarH);
			$(".g-item-modal").on("mousewheel", function() {
				var deltay = event.deltaY;
				var newtop = itemcontent.position().top - deltay;
				var barDeltay = deltay / itembarrate;
				var barnewtop = itembar.position().top + barDeltay;
				if (newtop >= 0) {
					newtop = 0;
					barnewtop = 0;
				} else if (newtop < (-itemcontentH + windowH)) {
					newtop = -itemcontentH + windowH;
					barnewtop = windowH - itembarH;
				}
				itemcontent.css("top", newtop);
				itembar.css("top", barnewtop);
				return false; //不要让父级动
			});
			itembar.on("mousedown", function(e) {
				itembarmoving = true;
				itembarYBefore = itembar.position().top;
				itembardrag = e.pageY;
				return false;
			});
			$(".g-item-modal").on("mousemove", function(e) {
				if (itembarmoving) {
					var diff = e.pageY - itembardrag;
					var bartop = itembarYBefore + diff;
					if (bartop < 0) bartop = 0;
					if ((bartop + itembarH) > windowH) bartop = windowH - itembarH;
					itembar.css("top", bartop);
					itemcontent.css("top", (-1) * bartop * itembarrate);
				}
			}).on("mouseup", function(e) {
				itembarmoving = false;
			});
		}
	}

	function initBar() {
		content = $(".g-container-content");
		bar = $(".g-container>.g-barbox .g-bar");
		contentH = content.height();
		windowH = $(window).height();
		barrate = contentH / windowH;
		barH = windowH / barrate;

		if (barH >= windowH) {
			$(".g-container>.g-barbox").hide();
		} else {
			$(".g-container>.g-barbox").show();
			bar.css("height", barH);
			content.on("mousewheel", function() {
				var top = Number(content.position().top);
				if (top >= -40) {
					$(".g-totop").css("opacity", 0.1);
				} else {
					$(".g-totop").css("opacity", 1);
				}
				var deltay = event.deltaY;
				var newtop = content.position().top - deltay;
				var barDeltay = deltay / barrate;
				var barnewtop = bar.position().top + barDeltay;
				if (newtop >= 0) {
					newtop = 0;
					barnewtop = 0;
				} else if (newtop < (-contentH + windowH)) {
					newtop = -contentH + windowH;
					barnewtop = windowH - barH;
				}
				content.css("top", newtop);
				bar.css("top", barnewtop);
				return false; //不要让父级动
			});
			bar.on("mousedown", function(e) {
				barmoving = true;
				barYBefore = bar.position().top;
				bardrag = e.pageY;
				return false;
			});
			$(window).on("mousemove", function(e) {
				if (barmoving) {
					var diff = e.pageY - bardrag;
					var bartop = barYBefore + diff;
					if (bartop < 0) bartop = 0;
					if ((bartop + barH) > windowH) bartop = windowH - barH;
					bar.css("top", bartop);
					content.css("top", (-1) * bartop * barrate);
					var top = Number(content.position().top);
					if (top >= -40) {
						$(".g-totop").css("opacity", 0.1);
					} else {
						$(".g-totop").css("opacity", 1);
					}
				}
			}).on("mouseup", function(e) {
				barmoving = false;
			});
		}
	}

	function clearItemBar() {
		$(".g-item-modal").off("mousewheel");
		$(".g-item-modal").off("mouseup").off("mousemove");
		itembar.css("top", 0);
		itemcontent.css("top", 0);
	}

	function clearBar() {
		if (!content) return;
		content.off("mousewheel");
		$(window).off("mouseup").off("mousemove");
		bar.css("top", 0);
		content.css("top", 0);
	}

	giftpage.getMyLockedGifts = getLockedGifts;
	giftpage.getAds = function() {
		get("/ad/list", null, function(data) {
			if (data.status == 200) {
				ads = data.data;
				if (!ads || ads.length == 0) return;
				var randomAd = ads[Math.floor(Math.random() * ads.length)].content;
				$(".g-wait-msg").html(randomAd);
				var ad = ads.shift();
				$(".g-header-ad").html(ad.content);
				ads.push(ad);
				$(".g-header-ad").fadeIn(200);
				setInterval(function() {
					$(".g-header-ad").fadeOut(200, function() {
						var ad = ads.shift();
						$(".g-header-ad").html(ad.content);
						ads.push(ad);
						$(".g-header-ad").fadeIn(200);
					});

				}, 5000);
			} else {

			}
		})
	}
	giftpage.getGifts = function() {
		get("/giftapis/list", null, function(data) {
			if (data.status == 200) {
				var gifts = data.data;
				for (var i = 0; i < gifts.length; i++) {
					var gift = gifts[i];
					var status = gift.status;
					var statusClass;
					if (status == 0) statusClass = "g-item-delivered";
					else if (status > 1) statusClass = "g-item-locked";
					else statusClass = "";
					var item = $('<div class="g-item ' + statusClass + '" id="gift-' + gift.id + '" data-id="' + gift.id + '"><div class="g-item-img"><img src="' + gift.img + '"></div><div class="g-item-title">' + gift.title + '</div></div>');
					if (gift.type == 0) {
						$(".g-books").append(item);
					} else {
						$(".g-groceries").append(item);
					}
				}
				$(".g-mask").remove();
			} else {
				alert("获取礼物列表错误啦，天了噜，刷新下试试～");
			}
		})
	}
	giftpage.initEvents = function() {
		//礼品里表变化
		$(".g-container").on("DOMNodeInserted", function() {
			clearBar();
			initBar();
		})
		//窗口大小变化
		$(window).on("resize", function() {
			windowH = $(this).height();
			barrate = contentH / windowH;
			barH = windowH / barrate;
			bar.css("height", barH);
			if (!$(".g-item-modal").is(":hidden")) {
				itembarrate = itemcontentH / windowH;
				itembarH = windowH / itembarrate;
				itembar.css("height", itembarH);
			}
		});
		//鼠标指向我的礼物单弹出礼物单
		$(".g-giftlocked").on("mouseenter", function() {
			$(".g-giftlocked-list").fadeIn(500);
		}).on("mouseleave", function() {
			$(".g-giftlocked-list").fadeOut(500);
		});
		//点击礼品弹出详情框
		function showGiftDetail(id) {
			if (!id) return;
			var spinner = $('<i class="fa fa-spinner fa-spin g-gift-loading"></i>');
			$("#gift-" + id).attr("disabled", "disabled");
			spinner.appendTo($("#gift-" + id));

			get("/giftapis/one", {
				"id": id
			}, function(data) {
				$("#gift-" + id).removeAttr("disabled").find(".g-gift-loading").remove();
				if (data.status == 200) {
					var item = data.data;
					$(".g-item-modal").data("id", item.id);
					$(".g-item-modal").data("status", item.status);
					$(".g-item-modal .g-item-modal-img img").attr("src", item.img);
					$(".g-item-modal .g-item-modal-img .g-item-modal-img-detail img").attr("src", item.img);
					$(".g-item-modal .g-item-modal-title").html(item.title);
					$(".g-item-modal .g-item-modal-brief").html(item.brief);
					$(".g-item-modal .g-item-modal-detail").html(item.detail);
					if (item.status > 1) {
						$(".g-item-modal button").addClass("locked").html("已锁定" + getTime(item.status));
						var timer = setInterval(function() {
							var time = Number($(".g-item-modal").data("status"));
							time--;
							if (time == 0) {
								$("#lockBtn").removeClass("locked").html("锁定");
								clearInterval($("#lockBtn").data("timer"));
							}
							$(".g-item-modal").data("status", time);
							$("#lockBtn").html("已锁定" + getTime(time));
						}, 1000);
						$("#lockBtn").data("timer", timer);
					} else if (item.status == 0) {
						$(".g-item-modal button").addClass("delivered").html("已送出");
					} else {
						$(".g-item-modal button").removeClass("locked").removeClass("delivered").html("锁定");
					}
					$(".g-item-modal").fadeIn(500);
					//bar
					// setTimeout(function() {
					// 	initItemBar();
					// }, 100);


					setTimeout(function() {
						initMagnifier();
					}, 1000);
				} else {
					alert("咋没找到呢。。");
				}
			});
		}

		$(".g-container").on("click", ".g-item", function() {
			var id = $(this).attr("data-id");
			showGiftDetail(id);
		});
		$(".g-giftlocked-list-content").on("click", ".g-minigift", function() {
			var id = $(this).attr("data-id");
			showGiftDetail(id);
		});
		$(".g-giftlocked-list-content").on("click", ".g-minigift i", function(e) {
			e.stopPropagation();
			if (confirm("确定要解除锁定吗？")) {
				var id = $(this).parent().attr("data-id");
				$.post("/giftapis/unlock", {
					"id": id
				}, function(data) {
					if (data.status == 200) {
						if ($(".g-item-modal").data("id") == id) {
							$("#lockBtn").removeClass("locked").html("锁定");
							clearInterval($("#minigift-" + id).data("timer"));
							clearInterval($("#lockBtn").data("timer"));
						}
						$("#gift-" + id).removeClass("g-item-locked");
						$("#minigift-" + id).remove();
						if (!$(".g-giftlocked-list-content .g-minigift")[0]) {
							$(".g-none-msg").fadeIn(500);
							$("#btnConfirm").fadeOut(500);
						}
					} else {
						alert(data.msg);
					}
				});
			}
		});
		$("#btnConfirm").on("click", function() {
			$(".g-order-modal").fadeIn(500);
		})
		//滚动事件
		//var scrolllock=false;
		$(".g-totop").on("click", function() {
			$(".g-container-content").animate({
				"top": 0
			});
			bar.animate({
				"top": 0
			});
			$(".g-totop").css("opacity", 0.1);
		});
		// $(".g-container").on("scroll", function() {
		// 	//if(scrolllock)return;

		// 	//scrolllock=true;
		// 	//setTimeout(function() {scrolllock=false;},100);
		// });
		// 模态框
		$(".g-item-modal").on("click", function(e) {
			if ($(e.target).is(".g-item-modal")) {
				clearInterval($("#lockBtn").data("timer"));
				$(".g-item-modal").fadeOut(500);
				clearItemBar();
			}
		});
		$(".g-order-modal").on("click", function(e) {
			if ($(e.target).is(".g-order-modal")) {
				$(".g-order-modal").fadeOut(500);
			}
		});
		$(".g-myorders-modal").on("click", function(e) {
			if ($(e.target).is(".g-myorders-modal")) {
				$(".g-myorders-modal").fadeOut(500);
			}
		});
		$(window).on("keydown", function(e) {
			if (e.keyCode == 27) {
				if (!$(".g-item-modal").is(":hidden")) {
					clearInterval($("#lockBtn").data("timer"));
					$(".g-item-modal").fadeOut(500);
					clearItemBar();
				}
				if (!$(".g-order-modal").is(":hidden")) {
					$(".g-order-modal").fadeOut(500);
				}
				if (!$(".g-myorders-modal").is(":hidden")) {
					$(".g-myorders-modal").fadeOut(500);
				}
				if (!$(".g-eggs-modal").is(":hidden")) {
					$(".g-eggs-modal").fadeOut(500);
				}

			}
		});
		$(".g-drawer").on("click", function() {
			var clicks = $(this).data("clicks");
			if (!clicks) {
				clicks = 0;
			}
			clicks++;
			if (clicks == 1) {
				setTimeout(function() {
					$(".g-drawer").data("clicks", 0);
				}, 1000);
			}
			if (clicks == 7) {
				$(this).data("clicks", 0);
				var modal = $('<div class="g-eggs-modal"><div class="g-eggs-container"><div class="g-close">byebye</div><div class="g-eggs-head">\u5f00\u542f\u79d8\u5bc6\u5173\u53e3</div><div class="g-input"><label>\u731c\u4e00\u731c</label><input type="text" name="password" placeholder="\u7f16\u7a0b\u6700\u91cd\u8981\u7684\u4e24\u4e2a\u5355\u8bcd\u662f"></div><button id="getEggsBtn" class="g-btn">let us try</button></div></div>');

				$(".g-eggs-modal").remove();
				$(".g-modals").prepend(modal);
				$(".g-eggs-modal").on("click", function(e) {
					if ($(e.target).is(".g-eggs-modal")) {
						$(".g-eggs-modal").fadeOut(500);
					}
				});
				$(".g-eggs-modal").fadeIn(500);

			} else {
				$(this).data("clicks", clicks);
			}
		});
		$(".g-item-modal-content").resize(function() {
			initItemBar();
		})
		$(".g-item-modal button").on("click", function() {

			if ($(this).hasClass("delivered")) return;
			if ($(this).hasClass("locked")) {
				if (confirm("确定要解除锁定吗？")) {
					var id = $(".g-item-modal").data("id");
					$.post("/giftapis/unlock", {
						"id": id
					}, function(data) {
						$(".g-item-modal button").removeAttr("disabled");
						if (data.status == 200) {
							clearInterval($("#lockBtn").data("timer"));
							clearInterval($("#minigift-" + id).data("timer"));
							$("#lockBtn").removeClass("locked").html("锁定");
							$("#gift-" + id).removeClass("g-item-locked");
							$("#minigift-" + id).remove();
							if (!$(".g-giftlocked-list-content .g-minigift")[0]) {
								$(".g-none-msg").fadeIn(500);
								$("#btnConfirm").fadeOut(500);
							}
						} else {
							alert(data.msg);
						}
					});
				}
				return;
			}
			var id = $(".g-item-modal").data("id");
			$(".g-item-modal button").attr("disabled", "disabled").html("锁定中");
			$.post("/giftapis/lock", {
				"id": id
			}, function(data) {
				$(".g-item-modal button").removeAttr("disabled");
				if (data.status == 200) {
					$(".g-item-modal button").addClass("locked").html("已锁定" + getTime(600));
					$("#gift-" + id).addClass("g-item-locked");
					$(".g-item-modal").data("status", 600);
					var timer = setInterval(function() {
						var time = Number($(".g-item-modal").data("status"));
						time--;
						if (time == 0) {
							$("#lockBtn").removeClass("locked").html("锁定");
							$("#gift-" + id).removeClass("g-item-locked");
							clearInterval($("#lockBtn").data("timer"));
							return;
						}
						$(".g-item-modal").data("status", time);
						$("#lockBtn").html("已锁定" + getTime(time));
					}, 1000);
					$("#lockBtn").data("timer", timer);
					getLockedGifts();
				} else {
					$(".g-item-modal button").html("锁定");
					alert(data.msg);
				}
			})
		});
		$("#confirmOrderBtn").on("click", function() {
			var userid = $(".g-order-modal [name=userid]").val().trim();
			var username = $(".g-order-modal [name=username]").val().trim();
			var address = $(".g-order-modal [name=address]").val().trim();
			var contact = $(".g-order-modal [name=contact]").val().trim();
			var useridRegex = /^201[4567]9[1234][0123456789]\d{2}$/;
			if (!useridRegex.test(userid)) {
				$(".g-order-modal [name=userid]").focus();
				alert("这是啥学号");
				return;
			}
			if (!username) {
				$(".g-order-modal [name=username]").focus();
				alert("emmm");
				return;
			}
			if (!address) {
				$(".g-order-modal [name=address]").focus();
				alert("orz");
				return;
			}

			$.post("/giftapis/createorder", {
				"userid": userid,
				"username": username,
				"address": address,
				"contact": contact
			}, function(data) {
				if (data.status == 200) {
					var gifts = data.data;
					var msg = "你选择的";
					for (var i = 0; i < gifts.length; i++) {
						if (i == 0) {
							msg += gifts[i].title;
						} else if (i == gifts.length - 1 && gifts.length >= 2) {
							msg += "和" + gifts[i].title;
						} else {
							msg += "、" + gifts[i].title;
						}
					}
					msg += "已经被我看到了，一会联系你哦～";
					alert(msg);
					window.location.reload();
				} else {
					alert(data.msg);
				}
			})
		});
		$("#searchOrderBtn").on("click", function() {
			var userid = $(".g-myorders-modal [name=userid]").val().trim();
			searchMyOrders(userid);
		});
		$(".g-myorders").on("click", function() {
			$(".g-myorders-modal").fadeIn(500);
		});
		$(".g-modals").on("click", "#getEggsBtn", function() {
			var password = $(".g-eggs-modal [name=password]").val();
			if (!password) return;
			$.get("/giftapis/egg/" + password, null, function(data) {
				if (data.status == 200) {
					var eggs = data.data;
					if (!eggs || eggs.length == 0) return;
					var container = $(".g-container-content");
					$(".g-eggs").remove();
					var div = $("<div class='g-list g-eggs'><h1>\u5f69\u86cb</h1></div>");

					for (var i = 0; i < eggs.length; i++) {
						var statusClass;
						var gift = eggs[i];
						var status = gift.status;
						if (status == 0) statusClass = "g-item-delivered";
						else if (status > 1) statusClass = "g-item-locked";
						else statusClass = "";
						var item = $('<div class="g-item ' + statusClass + '" id="gift-' + gift.id + '" data-id="' + gift.id + '"><div class="g-item-img"><img src="' + gift.img + '"></div><div class="g-item-title">' + gift.title + '</div></div>');
						div.append(item);
					}
					container.prepend(div);
					$(".g-eggs-modal").fadeOut(500);
					$(".g-container-content").animate({
						"top": 0
					});
					bar.animate({
						"top": 0
					});
					$(".g-totop").css("opacity", 0.1);

				} else {
					alert("啥事都没发生。。");
				}
			});
		});
	}
	giftpage.changebg = function() {
		if (!bgs) {
			get("/resource/getbg", null, function(data) {
				if (data.status == 200)
					bgs = JSON.parse(data.data);
			});
		}
		var timer = setInterval(function() {
			if (!bgs) return;
			var bgindex = Math.floor(Math.random() * bgs.length);
			$(".g-container").css("background-image", "url(/images/" + bgs[bgindex] + ")");
		}, 60000);
		return timer;
	}


	return giftpage;
}


function getLockedGifts() {
	get("/giftapis/mylockedgifts", null, function(data) {
		if (data.status == 200) {
			var giftlist = data.data;
			$("#lockgift-spinner").fadeOut(500);
			var listdiv = $(".g-giftlocked-list-content");
			listdiv.find(".g-minigift").each(function() {
				clearInterval($(this).data("timer"));
			});
			listdiv.empty();

			if (giftlist && giftlist.length > 0) {
				$(".g-giftlocked-list .g-none-msg").fadeOut(500);
				$("#btnConfirm").fadeIn(500);
				for (var i = 0; i < giftlist.length; i++) {
					var lockedgift = $('<div class="g-minigift clearfix" id="minigift-' + giftlist[i].id + '" data-time="' + giftlist[i].ttl + '" data-id="' + giftlist[i].id + '"><div class="g-miniimg"><img src="' + giftlist[i].img + '"></div><div class="g-minititle"><h3>' + giftlist[i].title + '</h3><span></span></div><i class="fa fa-remove"></i></div>');
					lockedgift.data("time", giftlist[i].ttl);

					function createCountdown(id) {
						var id = id;

						function countdown() {
							var thelockedgift = $("#minigift-" + id);
							var timeleft = Number(thelockedgift.data("time"));
							timeleft--;
							if (timeleft <= 0) {
								clearInterval(thelockedgift.data("timer"));
								$("#gift-" + id).removeClass("g-item-locked");
								thelockedgift.remove();
								if (!$(".g-giftlocked-list-content .g-minigift")[0]) {
									$(".g-none-msg").fadeIn(500);
									$("#btnConfirm").fadeOut(500);
								}
							} else {
								thelockedgift.data("time", timeleft);
								thelockedgift.find("span").html(getTime(timeleft));
							}
						}
						return countdown;

					}
					var timer = setInterval(createCountdown(giftlist[i].id), 1000);
					lockedgift.data("timer", timer);
					listdiv.append(lockedgift);
				}
			} else {
				$(".g-giftlocked-list .g-none-msg").fadeIn(500); //提示没有
				$("#btnConfirm").fadeOut(500);
			}
		} else {
			//alert("获取已锁定礼物列表失败啦。。");
		}
	});
	$(".g-modals").on("click", ".g-close", function() {
		var modal = $(this).parent().parent().parent();
		if (modal.hasClass("g-item-modal")) {
			clearInterval($("#lockBtn").data("timer"));
		}
		modal.fadeOut(500);
	})
}

function searchMyOrders(userid) {
	if (!userid || !/^201[4567]9[1234][0123456789]\d{2}$/.test(userid)) {
		alert("这是啥学号。。");
		return;
	}
	$('#myordersTable').bootstrapTable("destroy");
	$('#myordersTable').bootstrapTable({
		url: '/giftapis/myorders', //请求后台的URL（*）
		method: 'get', //请求方式（*）
		toolbar: '#toolbar', //工具按钮用哪个容器
		//buttonsToolbar:"#btnToolbar",
		striped: true, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true, //是否显示分页（*）
		sortable: false, //是否启用排序
		sortOrder: "asc", //排序方式
		queryParams: {
			"userid": userid
		}, //oTableInit.queryParams,//传递参数（*）
		sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 10, //每页的记录行数（*）
		pageList: [10, 50], //可供选择的每页的行数（*）
		search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		contentType: "application/x-www-form-urlencoded",
		strictSearch: false,
		showColumns: true, //是否显示所有的列
		showRefresh: true, //是否显示刷新按钮
		minimumCountColumns: 2, //最少允许的列数
		clickToSelect: true, //是否启用点击选中行
		//height: 600,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: "id", //每一行的唯一标识，一般为主键列
		showToggle: true, //是否显示详细视图和列表视图的切换按钮
		cardView: false, //是否显示详细视图
		detailView: false, //是否显示父子表
		//showFullscreen:true,
		//paginationVAlign:"both",
		singleSelect: true,
		showSelectTitle: true,
		// exportDataType: "all",
		// showExport: true,
		// exportTypes:[ 'json','csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],
		// buttonsAlign:"right",
		icons: {
			paginationSwitchDown: 'fa-chevron-down',
			paginationSwitchUp: 'fa-chevron-up',
			refresh: 'fa-refresh',
			columns: 'fa-th',
			detailOpen: 'fa-plus',
			detailClose: 'fa-minus',
			toggle: "fa-exchange"
			// export: "fa-sign-out"
		},
		columns: [{
				field: 'giftimg',
				title: '图片',
				width: 120,
				formatter: function(value) {
					return "<img src=" + value + "/>";
				}
			}, {
				field: 'id',
				title: 'id',
				visible: false
			}, {
				field: 'gifttitle',
				title: '礼物'
			}, {
				field: 'status',
				title: '状态',
				formatter: function(value) {
					switch (value) {
						case 1:
							return "<span class='text-success'>已完成</span>";
						case 0:
							return "<span class='text-primary'>待送货</span>";
						case 2:
							return "<span class='text-warning'>黄了</span>";
					}
				}
			}

		],
		rowStyle: function(row, index) {
			var classesArr = ['success', 'info'];
			var strclass = "";
			if (index % 2 === 0) { //偶数行
				strclass = classesArr[0];
			} else { //奇数行
				strclass = classesArr[1];
			}
			return {
				classes: strclass
			};
		}, //隔行变色
	});


};

function initpage(page) {
	$("[data-toggle='popover']").popover();
	page.getAds();
	page.getGifts();
	page.initEvents();
	page.changebg();
	page.getMyLockedGifts();

}

function getTime(time) {
	var minutes = Math.floor(time / 60);
	var seconds = Math.floor(time % 60);
	if (minutes == 0) return "(" + seconds + "s" + ")";
	return "(" + minutes + "m" + seconds + "s" + ")";
}

function get(url, data, fun) {
	$.get(url, data, fun);
}

function initJQ() {
	(function($, h, c) {
		var a = $([]),
			e = $.resize = $.extend($.resize, {}),
			i,
			k = "setTimeout",
			j = "resize",
			d = j + "-special-event",
			b = "delay",
			f = "throttleWindow";
		e[b] = 250;
		e[f] = true;
		$.event.special[j] = {
			setup: function() {
				if (!e[f] && this[k]) {
					return false;
				}
				var l = $(this);
				a = a.add(l);
				$.data(this, d, {
					w: l.width(),
					h: l.height()
				});
				if (a.length === 1) {
					g();
				}
			},
			teardown: function() {
				if (!e[f] && this[k]) {
					return false;
				}
				var l = $(this);
				a = a.not(l);
				l.removeData(d);
				if (!a.length) {
					clearTimeout(i);
				}
			},
			add: function(l) {
				if (!e[f] && this[k]) {
					return false;
				}
				var n;

				function m(s, o, p) {
					var q = $(this),
						r = $.data(this, d);
					r.w = o !== c ? o : q.width();
					r.h = p !== c ? p : q.height();
					n.apply(this, arguments);
				}
				if ($.isFunction(l)) {
					n = l;
					return m;
				} else {
					n = l.handler;
					l.handler = m;
				}
			}
		};

		function g() {
			i = h[k](function() {
					a.each(function() {
						var n = $(this),
							m = n.width(),
							l = n.height(),
							o = $.data(this, d);
						if (m !== o.w || l !== o.h) {
							n.trigger(j, [o.w = m, o.h = l]);
						}
					});
					g();
				},
				e[b]);
		}
	})(jQuery, this);
}