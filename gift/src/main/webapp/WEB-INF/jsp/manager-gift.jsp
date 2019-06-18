<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>礼物管理</title>
		<link rel="stylesheet" type="text/css" href="../css/wangEditor.min.css">
	</head>
	<body>
		<div class="container-fluid">
			<jsp:include page="manager-index.jsp"></jsp:include>
			<div class="g-main">
				<div id="toolbar" class="btn-group">
					<button id="btn_add" type="button" class="btn btn-default">
					<span class="fa fa-plus" aria-hidden="true"></span>新加礼物
					</button>
					<button id="btn_edit" type="button" class="btn btn-default">
					<span class="fa fa-pencil" aria-hidden="true"></span>编辑礼物
					</button>
					<button id="btn_delete" type="button" class="btn btn-default">
					<span class="fa fa-remove" aria-hidden="true"></span>删除礼物
					</button>
				</div>
				<table id="giftlist">
				</table>
			</div>
		</div>
		<div class="g-modals">
			<div class="modal fade bs-example-modal-lg" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="addModalLabel">新加礼物</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							<span class="sr-only">Close</span>
							</button>
							
						</div>
						<div class="modal-body">
							<form id="addForm" role="form">
								<div class="form-group">
									<label>礼物图片</label>
									<div class="needclear photo"></div>
									<a class="btn btn-primary upload" href="javascript:;">
										上传图片
										<input  type="file" accept="image/*">
									</a>
									<input type="hidden" name="img">
								</div>
								<div class="form-group">
									<label for="titleadd">礼物标题</label>
									<input type="text" class="form-control" id="titleadd" name="title" placeholder="礼物标题">
								</div>
								<div class="form-group">
									<label for="briefadd">礼物简介</label>
									<input type="text" class="form-control" id="briefadd" name="brief" placeholder="简介">
								</div>
								<div class="form-group">
									<label>类型</label>
									<select name="type" class="form-control">
										<option value="0" selected>书籍</option>
										<option value="1">杂货</option>
										<option value="77">彩蛋</option>
									</select>
								</div>
								<div class="form-group">
									<label for="text-detail-add">详细介绍</label>
									<div id="toolbar-detail-add" class="toolbar"></div>
									<div id="text-detail-add" class="text"></div>
									<input type="hidden" name="detail">
								</div>
								
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
							<button id="saveAdd" type="button" class="btn btn-primary">新增礼物</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade bs-example-modal-lg" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="editModalLabel">编辑礼物</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							<span class="sr-only">Close</span>
							</button>
							
						</div>
						<div class="modal-body">
							<form id="editForm" role="form">
								<input type="hidden" name="id">
								<div class="form-group">
									<label>礼物图片</label>
									<div class="needclear photo"></div>
									<a class="btn btn-primary upload" href="javascript:;">
										上传图片
										<input  type="file" accept="image/*">
									</a>
									<input type="hidden" name="img">
								</div>
								<div class="form-group">
									<label for="titleedit">礼物标题</label>
									<input type="text" class="form-control" id="titleedit" name="title" placeholder="åç§°">
								</div>
								<div class="form-group">
									<label for="briefedit">礼物简介</label>
									<input type="text" class="form-control" id="briefedit" name="brief" placeholder="ç®ä»">
								</div>
								<div class="form-group">
									<label>类型</label>
									<select name="type" class="form-control">
										<option value="0" selected>书籍</option>
										<option value="1">杂货</option>
										<option value="77">彩蛋</option>
									</select>
								</div>
								<div class="form-group">
									<label>状态</label>
									<select name="status" class="form-control">
										<option value="1">待送出</option>
										<option value="0">已送出</option>
										<option value="2">已删除</option>

									</select>
								</div>
								<div class="form-group">
									<label for="text-detail-edit">礼物详情</label>
									<div id="toolbar-detail-edit" class="toolbar"></div>
									<div id="text-detail-edit" class="text"></div>
									<input type="hidden" name="detail">
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
							<button id="saveEdit" type="button" class="btn btn-primary">保存</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="../js/popper.min.js"></script>
		<script src="../js/wangEditor.min.js"></script>
		<script src="../js/manager-gift.js"></script>
	</body>
</html>