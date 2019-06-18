$(function() {
    //初始化表格
    var tableinit = new TableInit();
    tableinit.Init();
    //绑定按钮事件
    initMyEvents();
    //初始化wangeditor
    var E = window.wangEditor;
    editorAdd = new E('#toolbar-detail-add', '#text-detail-add');
    editorAdd.customConfig.uploadImgServer = '/file/upload';
    editorAdd.customConfig.showLinkImg = false;
    //editor.customConfig.emotions=emojiConfig;
    //editor.customConfig.lang = langConfig;
    editorAdd.create();
    editorAdd.onchange = function() {}

    editorEdit = new E('#toolbar-detail-edit', '#text-detail-edit');
    editorEdit.customConfig.uploadImgServer = '/file/upload';
    editorEdit.customConfig.showLinkImg = false;
    //editor.customConfig.emotions=emojiConfig;
    //editor.customConfig.lang = langConfig;
    editorEdit.create();
    editorEdit.onchange = function() {}

});

function initMyEvents() {
    
    //上传图片
    $(".upload [type=file]").on("change", function() {
        var thisobj = $(this);
        var formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
            formData.append(this.files[i].name, this.files[i]);
        }
        $.ajax({
            url: "/file/upload",
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            beforeSend: function() {},
            success: function(data) {
                if (data.errno == 0) {
                    if (thisobj.parent().siblings(".photo").find("img")[0])
                        thisobj.parent().siblings(".photo").find("img").attr("src", data.data[0]);
                    else {
                        thisobj.parent().siblings(".photo").append("<img src='" + data.data[0] + "' draggable='false'>");
                    }
                    var imghidden = thisobj.parent().siblings("[name=img]");
                    imghidden.val(data.data[0]);
                } else {
                    alert("上传失败了。。");
                }
            }
        });
    })
    //修改
    function setEditModal(id) {
        $.post("/management/getgift", {
            "id": id
        }, function(data) {
            if (data.status == 200) {
                $("#editForm .needclear").empty();
                var gift = data.data;
                if (gift.img) {
                    $("#editForm .photo").append("<img src=" + gift.img + "/>");
                    $("#editForm [name=img]").val(gift.img);
                }
                $("#editForm [name=title]").val(gift.title);
                $("#editForm [name=brief]").val(gift.brief);
                $("#editForm [name=type]").val(gift.type);
                $("#editForm [name=status]").val(gift.status);
                $("#editForm [name=detail]").val(gift.detail);
                editorEdit.txt.html(gift.detail);
                $("#editForm [name=id]").val(id);
                $("#editModal").modal();
            }
        });
    }
    $("table").on("click",".edit",function () {
        var id=$(this).attr("data-id");
        setEditModal(id);
         
    })
    $("#btn_edit").on("click", function() {
        var id = getIdSelections()[0];
        if (!id) {
            alert("没这个礼物");
            return;
        }
        setEditModal(id);

    });
    $("#saveEdit").on("click", function() {
        var html = editorEdit.txt.html();
        $("#editForm [name=detail]").val(html);
        var data = $("#editForm").serialize();
        $.post("/management/changegift", data, function(data) {
            if (data.status == 200) {
                $("#editModal").modal("hide");
                alert("保存成功");
                $("#giftlist").bootstrapTable("refresh");
            } else {
                alert("保存失败");
            }
        });
    });
    //添加
    $("#btn_add").on("click", function() {
        $("#addModal .needclear").html("");
        editorAdd.txt.html("");
        $("#addModal input").val("");
        $("#addModal").modal();
    });
    $("#saveAdd").on("click", function() {
        var html = editorAdd.txt.html();
        $("#addForm [name=detail]").val(html);
        var data = $("#addForm").serialize();
        $.post("/management/addgift", data, function(data) {
            if (data.status == 200) {
                alert("添加成功");
                $("#addModal").modal("hide");
                $("#giftlist").bootstrapTable("refresh");
            } else {
                alert("添加失败");
            }
        });
    })
    //删除
    $("#btn_delete").on("click", function() {
        var id = getIdSelections()[0];
        if (!id) return;
        $.post("/management/removegift", {
            "id": id
        }, function(data) {
            if (data.status == 200) {
                alert("删除成功");
                $("#giftlist").bootstrapTable("refresh");
            } else {
                alert("删除失败");
            }
        })

    });
}
var TableInit = function() {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function() {
        $('#giftlist').bootstrapTable({
            url: '/management/getgiftlist', //请求后台的URL（*）
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
                    field: 'img',
                    title: '图片',
                    width:120,
                    formatter: function(value) {
                        return "<img src=" + value + "/>";
                    }
                }, {
                    field: 'id',
                    title: 'id',
                    width: 100
                }, {
                    field: 'title',
                    title: '礼物',
                    formatter: function(value, row) {
                        var id = row["id"];
                        return "<a href='javascript:;' class='edit' data-id='" + id + "'>" + value + "</a>";
                    }
                }, {
                    field: 'type',
                    title: '类型',
                    formatter: function(value) {
                        switch (value) {
                            case 1:
                                return "杂货";
                            case 0:
                                return "书籍";
                            case 77:
                                return "彩蛋";
                        }
                    }
                }, {
                    field: 'status',
                    title: '状态',
                    formatter: function(value) {
                        switch (value) {
                            case 0:
                                return "<span class='text-success'>已送出</span>";
                            case 1:
                                return "<span class='text-primary'>待送出</span>";
                            case 2:
                                return "<span class='text-secondary'>已删除</span>";
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
    return $.map($("#giftlist").bootstrapTable('getSelections'), function(row) {
        return row.id
    });
}