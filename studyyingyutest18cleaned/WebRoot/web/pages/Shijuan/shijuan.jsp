<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<html>
<head id="Head1">
    <%@ include file="/web/common/common.jsp" %>
<script type="text/javascript">
var focusobj = null;
$(function () {
    $('#grid1').datagrid({
        title: '试卷列表',
        nowrap: false,
        striped: true,
        fit: true,
        url: "<%=__APP__%>/Shijuan!getList",
        idField: 'id',
        pagination: true,
        rownumbers: true,
        pageSize: 10,
        pageNumber: 1,
        singleSelect: true,
        fitColumns: true,
        pageList: [10, 20, 50, 100, 200, 300, 500, 1000],
        sortName: 'id',
        sortOrder: 'desc',
        columns: [
            [
                //{field: 'ck', checkbox: true},
                {title: 'id', width: 100, field: 'id', sortable: true},
                {title: '名称', width: 100, field: 'title', sortable: true},
                {title: '备注', width: 400, field: 'note',sortable: true}
            ]
        ], toolbar: [
            {
                text: '新增',
                id: "tooladd",
                disabled: false,
                iconCls: 'icon-add',
                handler: function () {
                    $("#action").val("add");
                    $("#managerDialog").dialog('open');
                    managForm.reset();
                }
            },'-',{
                text: '题目管理',
                id: 'tooledit',
                disabled: false,
                iconCls: 'icon-edit',
                handler: function () {
                    $("#action").val("edit");
                    var selected = $('#grid1').datagrid('getSelected');
                    if (selected) {
                    	focusobj = selected;
                        openChoose(selected);
                    } else {
                        $.messager.alert("提示", "请选择一条记录进行操作");
                    }
                }
            },
            '-',
            {
                text: '修改',
                id: 'tooledit',
                disabled: false,
                iconCls: 'icon-edit',
                handler: function () {
                    $("#action").val("edit");
                    var selected = $('#grid1').datagrid('getSelected');
                    if (selected) {
                        edit(selected);
                    } else {
                        $.messager.alert("提示", "请选择一条记录进行操作");
                    }
                }
            },
            '-',
            {
                text: '删除',
                id: 'tooldel',
                disabled: false,
                iconCls: 'icon-remove',
                handler: function () {
                    var rows = $('#grid1').datagrid('getSelections');
                    if (rows.length) {
                        var ids = "";
                        for (var i = 0; i < rows.length; i++) {
                            ids += rows[i].id + ",";
                        }
                        ids = ids.substr(0, (ids.length - 1));
                        $.messager.confirm('提示', '确定要删除吗？', function (r) {
                            if (r) {
                                deleteItem(ids);
                            }
                        });
                    } else {
                        $.messager.alert("提示", "请选择一条记录进行操作");
                    }
                }
            }
        ]
    });
    
    $('#grid2').datagrid({
        title: '题目列表',
        nowrap: false,
        striped: true,
        fit: true,
        url: "<%=__APP__%>/Choose!getList",
        idField: 'id',
        pagination: true,
        rownumbers: true,
        pageSize: 10,
        pageNumber: 1,
        singleSelect: false,
        fitColumns: true,
        pageList: [10, 20, 50, 100, 200, 300, 500, 1000],
        sortName: 'id',
        sortOrder: 'desc',
        onLoadSuccess:function(data){
        	
        	loadGrid2();
        	       
              //有选中行时加载数据后设置选中行  
       }, 
        columns: [
            [
                {field: 'ck', checkbox: true},
                {title: 'id', width: 10, field: 'id', sortable: true},
                {title: '题目', width: 100, field: 'title', sortable: true}
            ]
        ], toolbar: [
                     
        ]
    });

    document.onkeydown=function (e){
        e = e ? e : event;
        if(e.keyCode == 13){
            query();
        }
    }

});

function loadGrid2(){
	if(focusobj){
		$('#grid2').datagrid('unselectAll');
		var cids = focusobj.cids;
		var cidarray = cids.split(",");
		var rows = $('#grid2').datagrid('getRows');
		for(var i=0;i<cidarray.length;i++){
			for(var n=0;n<rows.length;n++){
				if(rows[n].id==cidarray[i]){
					$('#grid2').datagrid('selectRow',n); 
					break;
				}
			}
		}
	}
	
}


function save() {
    $('#managForm').form('submit', {
        url: "<%=__APP__%>/Shijuan!add",
        onSubmit: function () {
            return inputCheck();
        },
        success: function (data) {
            closeBackGround();
            $.messager.alert("提示", data, "info", function () {
                closeFlush();
            });
        }
    });
}

function saveChoose(){
	var selecteds = $("#grid2").datagrid("getSelections");
	var cids = "";
	for(var i=0;i<selecteds.length;i++){
		if(cids==""){
			cids=selecteds[i]['id'];
		}else{
			cids+=","+selecteds[i]['id'];
		}
	}
	openBackGround();
	 $.post("<%=__APP__%>/Shijuan!updateShijuanChoose", {cids: cids,id:focusobj.id}, function (data) {
		 closeBackGround();
         $.messager.alert("提示", "操作成功!", "info", function () {
        	 closeBackGround();
 	        closeFlush();
         });
	        
	    });
}

function openChoose(){
	$("#managerDialog2").dialog("open");
	loadGrid2();
}

function edit(obj) {
	var id = obj.id;
    $("#id").val(id);
    $("#title").val(obj.title);
    $("#note").val(obj.note);
    $("#state").val(obj.state);

    $("#managerDialog").dialog('open');
}

function deleteItem(uuid) {
    openBackGround();
    $.post("<%=__APP__%>/Shijuan!deleteItem", {id: uuid}, function (data) {
        closeBackGround();
        closeFlush();
    });
}

function cancel() {
    $.messager.confirm('提示', '是否要关闭？', function (r) {
        if (r) {
            closeFlush();
        }
    });
}

function query() {
    $('#grid1').datagrid('load', serializeObject($('#searchForm')));
}


function closeFlush() {
    managForm.reset();
    $("#managerDialog").dialog('close');
    $("#managerDialog2").dialog('close');
    
    $("#grid1").datagrid("reload");
}

function inputCheck() {
    if (!($("#managForm").form("validate"))) {
        return false;
    }
    openBackGround();
    return true;
}



function setNull(){
    searchForm.reset();
}



</script>
</head>
<body class="easyui-layout">
<div region="north" border="false" style="height:3px;overflow: hidden"></div>
<div region="west" border="false" style="width:3px;"></div>
<div region="east" border="false" style="width:3px;"></div>
<div region="south" border="false" style="height:3px;overflow: hidden"></div>
<div region="center" border="false">
    <div id="main" class="easyui-layout" fit="true" style="width:100%;height:100%;">
        <div region="north" id="" style="height:100%;" class="" title="查询条件">
            <form action="" id="searchForm" name="searchForm" method="post">
                <table cellpadding="5" cellspacing="0" class="tb_search">
                    <tr>
                        <td width="10%">
                            <label for="sname">标题：</label>
                            <input type="text" id="sname" name="sname" width="100%" maxlength="32"/>
                        </td>
                        <td width="10%">
                            <a href="#" onclick="query();" id="querylink" class="easyui-linkbutton"
                               iconCls="icon-search">查询</a>
                            <a href="#" onclick="setNull();" class="easyui-linkbutton" iconCls="icon-redo">重置</a>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div region="center" border="false" style="padding:3px 0px 0px 0px;overflow:hidden">

            <table id="grid1"></table>

        </div>
    </div>
</div>


<div id="managerDialog" class="easyui-dialog" title="试卷管理" style="width:450px;height:350px;" toolbar="#dlg-toolbar"
     buttons="#dlg-buttons2" resizable="true" modal="true" closed='true'>
    <form id="managForm" name="managForm" method="post">
        <input type="hidden" id="action" name="action"/>
        <input type="hidden" id="id" name="id"/>
        <table cellpadding="1" cellspacing="1" class="tb_custom1">
            <tr>
                <th width="30%" align="right"><label>名称：</label></th>
                <td width="60%" colspan="1">
                    <input id="title" name="shijuan.title" class="easyui-validatebox"
                           style="width:300px;word-wrap: break-word;word-break:break-all;" type="text" required="true"
                           validType="length[0,100]"/>
                </td>
            </tr>
            <%-- <tr>
                <th width="30%" align="right"><label>状态：</label></th>
                <td width="60%" colspan="1">
                    <select id="state" name="shijuan.state">
                    	<option value="空闲" selected="selected">空闲</option>
                    	<option value="占用">占用</option>
                    </select>
                </td>
            </tr> --%>
            <tr>
                <th width="30%" align="right"><label>说明：</label></th>
                <td colspan="1" width="60%">
                    <textarea style="width:300px;height: 100px;" id="note" name="shijuan.note"></textarea>
                </td>
            </tr>
        </table>


    </form>
    <div id="dlg-buttons2">
        <a href="#" class="easyui-linkbutton" onclick="save();">保存</a>
        <a href="#" class="easyui-linkbutton" onclick="cancel();">取消</a>
    </div>
</div>


<div id="managerDialog2" class="easyui-dialog" title="题目管理" style="width:450px;height:350px;" toolbar="#dlg-toolbar"
     buttons="#dlg-buttons3" resizable="true" modal="true" closed='true'>
    <table id="grid2"></table>
    <div id="dlg-buttons3">
        <a href="#" class="easyui-linkbutton" onclick="saveChoose();">确定</a>
        <a href="#" class="easyui-linkbutton" onclick="cancel();">取消</a>
    </div>
</div>
</body>
</html>