<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>广告管理</title>
		<link rel="stylesheet" type="text/css" href="../css/wangEditor.min.css">
	</head>
	<body>
		<div class="container-fluid">
			<jsp:include page="manager-index.jsp"></jsp:include>
			<div class="g-main">
				<div id="toolbar" class="btn-group">
					<button id="btn_add" type="button" class="btn btn-default">
					<span class="fa fa-plus" aria-hidden="true"></span>新加广告
					</button>
					<button id="btn_delete" type="button" class="btn btn-default">
					<span class="fa fa-remove" aria-hidden="true"></span>删除广告
					</button>
				</div>
				<table id="adlist">
				</table>
			</div>
		</div>
		<div class="g-modals">
			<div class="modal fade" id="addAdModal" tabindex="-1" role="dialog" aria-labelledby="addAdModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="addAdModalLabel">新加广告</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							<span class="sr-only">Close</span>
							</button>
							
						</div>
						<div class="modal-body">
							<form id="addForm" role="form">
								<div class="form-group">
									<label for="content">礼物标题</label>
									<input type="text" class="form-control" id="content" name="content" placeholder="广告内容">
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
							<button id="saveAdd" type="button" class="btn btn-primary">添加广告</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="../js/popper.min.js"></script>
		<script src="../js/manager-ad.js"></script>
	</body>
</html>