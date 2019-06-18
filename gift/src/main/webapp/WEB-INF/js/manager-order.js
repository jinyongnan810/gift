$(function () {
	var tableinit=new TableInit();
	tableinit.Init();
	$("#orderlist").on("click",".delivered",function () {//设置为送货成功
        if(!confirm("确定送货成功吗？"))return;
		var id=$(this).attr("data-id");
		$.post("/management/changestatus",{"id":id,"status":1},function () {
			$("#orderlist").bootstrapTable("refresh");
		});
	}).on("click",".cancel",function () {//设置为取消
        if(!confirm("确定要设置为取消吗？"))return;
		var id=$(this).attr("data-id");
		$.post("/management/changestatus",{"id":id,"status":2},function () {
			$("#orderlist").bootstrapTable("refresh");
		});
	}).on("click",".reinit",function () {//设置为未送货状态
        if(!confirm("确定要重置吗？"))return;
		var id=$(this).attr("data-id");
		$.post("/management/changestatus",{"id":id,"status":0},function () {
			$("#orderlist").bootstrapTable("refresh");
		});
	});
});
var TableInit = function() {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function() {
        $('#orderlist').bootstrapTable({
            url: '/management/getorders', //请求后台的URL（*）
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
            columns: [
            	{
                    field: 'id',
                    title: 'id',
                    width: 100,
                    visible:false
                }, {
                    field: 'gifttitle',
                    title: '礼物'
                }, {
                    field: 'giftid',
                    title: '礼物id',
                    visible: false

                }, {
                    field: 'giftimg',
                    title: '图片',
                    width:120,
                    visible: false,
                    formatter:function (value) {
                    	return "<img src="+value+"/>"
                    }

                }, {
                    field: 'userid',
                    title: '收件人id'
                }, {
                    field: 'username',
                    title: '收件人'
                }, {
                    field: 'address',
                    title: '收货地址'
                }, {
                    field: 'contact',
                    title: '联系方式',
                }, {
                    field: 'status',
                    title: '状态',
                    formatter: function (value) {
                    	switch(value){
                    		case 1:return "<span class='text-success'>已送出</span>";
                    		case 0:return "<span class='text-primary'>待送出</span>";
                    		case 2:return "<span class='text-secondary'>取消</span>";
                    	}
                    }
                }, {
                    field: 'created',
                    title: '申请时间',
                    formatter: timeFormatter
                }, {
                    field: 'finished',
                    title: '结束时间',
                    visible: false,
                    formatter: timeFormatter
                },{
                	title:'操作',
                	formatter:function (value,row){
                		var status=row["status"];
                		var id=row["id"];
                		if(status==0)return "<button class='btn btn-success btn-xs delivered' data-id='"+id+"'>送货成功</button><button class='btn btn-danger btn-xs cancel' data-id='"+id+"'>取消</button>";
                		else return "<button class='btn btn-info btn-xs reinit' data-id='"+id+"'>返回初始状态</button>";
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
function timeFormatter(value) {
	var time=new Date(value);
	return (time.getMonth()+1)+"月"+time.getDate()+"号 "+time.getHours()+"点"+time.getMinutes()+"分"+time.getSeconds()+"秒";
}