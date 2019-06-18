$(function() {
	//初始化表格
	var tableinit = new TableInit();
	tableinit.Init();
	//增加
	$("#btn_add").on("click", function() {
		$("#addAdModal").modal();
	});
	$("#saveAdd").on("click", function() {
		var content = $("#content").val().trim();
		$.post("/management/addad", {
			"content": content
		}, function(data) {
			if (data.status == 200) {
				$("#adlist").bootstrapTable("refresh");
				$("#addAdModal").modal("hide");
			} else {
				alert("添加失败");
			}
		});
	});
	//删除
	$("#btn_delete").on("click", function() {
		var id = getIdSelections()[0];
		if (!id) return;
		$.post("/management/delad", {
			"id": id
		}, function(data) {
			if (data.status == 200) {
				alert("删除成功");
				$("#adlist").bootstrapTable("refresh");
			} else {
				alert("删除失败");
			}
		})
	});

});
var TableInit = function() {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function() {
		$('#adlist').bootstrapTable({
			url: '/ad/list', //请求后台的URL（*）
			method: 'get', //请求方式（*）
			toolbar: '#toolbar', //工具按钮用哪个容器
			//buttonsToolbar:"#btnToolbar",
			striped: true, //是否显示行间隔色
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: true, //是否显示分页（*）
			sortable: false, //是否启用排序
			sortOrder: "asc", //排序方式
			queryParams: null, //oTableInit.queryParams,//传递参数（*）
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
					field: "check",
					checkbox: true,
					align: "center"
				}, {
					field: 'id',
					title: 'id',
					width: 100
				}, {
					field: 'content',
					title: '内容'
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

	//得到查询的参数
	oTableInit.queryParams = function(params) {
		var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, //页面大小
			offset: params.offset
		};
		return temp;
	};

	return oTableInit;
};

function getIdSelections() {
	return $.map($("#adlist").bootstrapTable('getSelections'), function(row) {
		return row.id
	});
}