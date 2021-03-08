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
$(function () {
    $('#grid1').datagrid({
        title: '教练列表',
        nowrap: false,
        striped: true,
        fit: true,
        url: "<%=__APP__%>/Good!getList",
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
                {title: '名称', width: 100, field: 'gname', sortable: true},
                {title: '价格(￥)', width: 100, field: 'price',sortable: true}
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

    document.onkeydown=function (e){
        e = e ? e : event;
        if(e.keyCode == 13){
            query();
        }
    }
    $("#typeid").combobox({
        method:"get",
        url:'<%=__APP__%>/Good!typeList',
        valueField: 'id',
        textField: 'title'
    });

});

function save() {

    $('#managForm').form('submit', {
        url: "<%=__APP__%>/Good!add",
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

function edit(obj) {
	var id = obj.id;
    $("#id").val(id);
    $("#gname").val(obj.gname);
    $("#typeid").combobox("setValue", obj.typeid);
    //$("#sid").combobox("setValue", obj.sid);
    //$("#price").numberbox('setValue', obj.price);
    //$("#count").numberbox('setValue', obj.count);
    //$("#jifen").numberbox('setValue', obj.jifen);
    $("#mcount").val(obj.mcount);
    $("#price").val(obj.price);
    $("#shouye").val(obj.shouye);
    $("#note").val(obj.note);
    $("#sale").val(obj.sale);
    $("#gimg").val(obj.img);
    $("#managerDialog").dialog('open');
}

function deleteItem(uuid) {
    openBackGround();
    $.post("<%=__APP__%>/Good!deleteItem", {id: uuid}, function (data) {
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
    $("#grid1").datagrid("reload");
}

function inputCheck() {
    if (!($("#managForm").form("validate"))) {
        return false;
    }
    openBackGround();
    return true;
}

function show(index) {

    var rows = $("#grid1").datagrid('getRows');
    var obj = rows[index];
    var id = obj.id;
    $("#id2").text(obj.id);
    $("#gname2").text(obj.gname);
    $("#gbrand2").text(obj.gbrand);
    $("#intime2").text(obj.intime);
    $("#gmodel2").text(obj.gmodel);
    $("#gcolor2").text(obj.gcolor);
    $("#gprice2").text(obj.gprice);
    $("#note2").text(obj.note);
    $("#gnumber2").text(obj.gnumber);

    $("#viewDialog").dialog('open');
    //});
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
                            <label for="sgname">名称：</label>
                            <input type="text" id="sgname" name="sgname" width="100%" maxlength="32"/>
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


<div id="managerDialog" class="easyui-dialog" title="教练管理" style="width:650px;height:350px;" toolbar="#dlg-toolbar"
     buttons="#dlg-buttons2" resizable="true" modal="true" closed='true'>
    <form id="managForm" name="managForm" method="post" enctype="multipart/form-data">
        <input type="hidden" id="action" name="action"/>
        <input type="hidden" id="id" name="id"/>
        <table cellpadding="1" cellspacing="1" class="tb_custom1">
            <tr>
                <th width="30%" align="right"><label>名称：</label></th>
                <td width="30%">
                    <input id="gname" name="good.gname" class="easyui-validatebox"
                           style="width:200px;word-wrap: break-word;word-break:break-all;" type="text" required="true"
                           validType="length[0,100]"/>
                    <input id="sid" name="good.sid" type="hidden" value="<%=session.getAttribute("sid").toString() %>" />
                    <input id="shop" name="good.shop" type="hidden" value="<%=session.getAttribute("username").toString() %>"/>
                </td>
                <th width="30%" align="right"><label>车辆：</label></th>
                <td width="30%">
                    <input id="typeid" name="good.typeid" style="width:200px;word-wrap: break-word;word-break:break-all;" />
                </td>
            </tr>


            <tr>
                <th width="30%" align="right"><label>配图：</label></th>
                <td colspan="" width="30%">
                    <input type="file" name="img" id="img" style="width:200px;word-wrap: break-word;word-break:break-all;"/>
                </td>
                <th width="30%" align="right"><label>价格：</label></th>
                <td width="30%">
                    <input id="price" name="good.price" class="easyui-numberbox"
                           style="width:200px;word-wrap: break-word;word-break:break-all;" type="text" required="true"
                           validType="length[0,9]"/>
                </td>
            </tr>
			<!--  
			<tr>
                <th width="30%" align="right"><label>数量：</label></th>
                <td colspan="" width="30%">
                    <input type="text" name="good.mcount" id="mcount" style="width:200px;word-wrap: break-word;word-break:break-all;"/>
                </td>
                <th width="30%" align="right"><label>打折类型：</label></th>
                <td width="30%">
                    <select id="saleType" name="good.saleType">
                    	<option value="3" selected="selected">半价</option>
                    	
                    </select>
                </td>
            </tr>
            <tr>
                <th width="30%" align="right"><label>折扣：</label></th>
                <td colspan="3" width="30%">
                    <input type="number" name="good.sale" id="sale" style="width:200px;word-wrap: break-word;word-break:break-all;"/>
                </td>
            </tr>
            <tr>
                <th width="30%" align="right"><label>首页显示：</label></th>
                <td colspan="3" width="30%">
                    <select id="shouye" name="good.shouye">
                    	<option value="0">不显示</option>
                    	<option value="1">显示</option>
                    </select>
                </td>
            </tr>
            -->
            <tr>
                <th width="30%" align="right"><label>备注：</label></th>
                <td colspan="3" width="30%">
                    <textarea rows="" cols="" style="width:100%" id="note" name="good.note"></textarea>
                </td>
            </tr>
        </table>


    </form>
    <div id="dlg-buttons2">
        <a href="#" class="easyui-linkbutton" onclick="save();">保存</a>
        <a href="#" class="easyui-linkbutton" onclick="cancel();">取消</a>
    </div>
</div>

</body>
</html>