/**
 * Created by aiur on 2019/3/5.
 */
var _records = [];
var _result = {};
var _index = 0;
var _focustype = 1;
var focusobj = {};
$(function(){

});
var _testtype = 1;
var _jishitimmer = null;
var _jishicount = 0;
var _fenshu = 0;
var _fenzhi = 20;
var _loadcount = 100;

function toTest(){
    changePage('selectpage');
    /*var type = getSearchParam('type');
        begaintest(1);*/
    var pt2 = {};
    pt2.tpl = '<li onclick="begaintest(%s);">'+
        '<h2>%s</h2>'+
        '</li>';
    pt2.colums = ["id","title"];
    $("#typelisttest").data("property",JSON.stringify(pt2));

    ajaxCallback("listType",{},function(data){
    //var typelist = [{id:1,title:"科目1"},{id:4,title:"科目4"}];
        //$("#typelisttest").refreshShowListView(typelist);
        $("#typeid").refreshShowSelectMenu(data,"选择课程");
    });

    ajaxCallback("listShijuan",{},function(data){
        //var typelist = [{id:1,title:"科目1"},{id:4,title:"科目4"}];
        //$("#typelisttest").refreshShowListView(typelist);
        $("#shijuanid").refreshShowSelectMenu(data,"选择试卷");
    });
}

function startJishi(){
    setInterval(function (){
        _jishicount++;
        $("#showname").text(getTimeFromSeconds(_jishicount));
    },1000);
}
function begaintest(type,ttype) {
    _testtype = ttype;
    type = type || $("#typeid").val();
    var shijuanid = "";
    _jishicount = 0;
    _fenshu = 0;
    if(ttype==2){
        shijuanid = ($("#shijuanid").val())||"";
        startJishi();
        /*var flagstr = $("#typeid").find("option:selected").text();
        if(flagstr=="科目1"){
            _fenzhi = 1;
            _loadcount = 100;
        }else{
            _fenzhi = 2;
            _loadcount = 50
        }*/
    }else{
        $("#showname").text("");
    }

    ajaxCallback("getChoose",{type:type,shijuanid:shijuanid},function(data){
        changePage('testpage');
        for(var i=0;i<data.length;i++){
            data[i].index = i+1;
        }

        if(ttype==2){
            if(data.length>_loadcount){
                data = getArrayItems(data,_loadcount);
            }
        }

        _records = data;
        _index = 0;
        loadRecord();
        /*ajaxCallback("getPdt",{type:type},function(pdtlist){
            for(var i=0;i<pdtlist.length;i++){
                pdtlist[i].index = _records.length+1;
                _records.push(pdtlist[i]);
            }
            loadRecord();
        });*/

    });

    if(ttype==1){
        $("#fenxictn2").show();
    }else{
        $("#fenxictn2").hide();
    }
}

function toCuotis(){
    ajaxCallback("listMyCuotis",{uid:userinfo.id},function(data){
        if(data && data.length){
            changePage('testpage');
            for(var i=0;i<data.length;i++){
                data[i].index = i+1;
            }
            _records = data;
            _index = 0;
            loadRecord();
        }else{
            showLoader("错题集是空的!",true);
        }

    });
}

function toFavs(){
    ajaxCallback("listMyFavs",{uid:userinfo.id},function(data){
        if(data && data.length){
            changePage('testpage');
            for(var i=0;i<data.length;i++){
                data[i].index = i+1;
            }
            _records = data;
            _index = 0;
            loadRecord();
        }else{
            showLoader("收藏夹是空的!",true);
        }

    });
}

function showFenxi(){
    $("#fenxictn").show();
}


var _leixing = 1;
function loadRecord() {
    $("#timg").hide();
    $("#tvideo").hide();
    $("#fenxictn").hide();
    $(".timuctn").hide();
    var cobj = _records[_index];
    focusobj = cobj;
    focusobj.isright = false;
    //focusobj.choose = focusobj.choose || "0";
    if(focusobj.img){
        if(isImg(focusobj.img)){
            $("#timg").attr("src",fileurl+focusobj.img).show();
        }else{
            $("#tvideo").attr("src",fileurl+focusobj.img).show();
        }
    }


    $("#title").text(focusobj.index + "." + focusobj.title);
    //$("#note").text(focusobj.note);
    //$("input[name='radio_name'][value='要选中Radio的Value值']").attr("checked",true);
    _leixing = focusobj.leixing;
    if(_leixing==1){
        $("#xztctn").show();
        $("#atitle").text(focusobj.typecn);
        $("#opa").text("A."+focusobj.opa);
        $("#opb").text("B."+focusobj.opb);
        $("#opc").text("C."+focusobj.opc);
        $("#opd").text("D."+focusobj.opd);
        $("#xztopdiv").show();
    }else if(_leixing==2){
        $("#dxctn").show();
        $("#atitle").text(focusobj.typecn);
        $("#opa0").text("A."+focusobj.opa);
        $("#opb0").text("B."+focusobj.opb);
        $("#opc0").text("C."+focusobj.opc);
        $("#opd0").text("D."+focusobj.opd);
        $("#xztopdiv").show();
    }else if(_leixing==3){
        $("#xztctn").show();
        $("#atitle").text(focusobj.typecn);
        $("#opa").text("对");
        $("#opb").text("错");
        $("#xztopdiv").hide();
    }

    //localStorage["_result"] = JSON.stringify(_result);
    //localStorage["iscontinue"] = _index + "";
    $("#fenxictn").text(focusobj.fenxi);
    toggleFav();
    $("#fenxictn").hide();
}


function toggleFav(){
    var tid = focusobj.id;
    var favs = userinfo.favs;
    var favsarray = [];
    if(favs){
        favsarray = favs.split(",");
        if(favsarray && favsarray.length){
            var flag = true;
            for(var i=0;i<favsarray.length;i++){
                if(favsarray[i]==tid){
                    flag = false;
                    $("#favbtn").text("移除收藏");
                    break;
                }
            }

        }else{
            $("#favbtn").text("收藏");
        }
    }else{
        $("#favbtn").text("收藏");
    }
}

//成绩统计
function commit() {

    changePage("resultpage");

    var template = "<div id='defen' style='color: red;font-size: 40px;text-align: center;'>得分:"+_fenshu+"分</div><table border='1' cellspacing='0'>"+
        "<tr>"+
        "<td></td>"+
        "<td></td>"+
        "</tr>"+
        "</table>";
    var timuhtml = "<table border='1' cellspacing='0'><tr><td>编号</td><td>题目标题</td><td></td></tr>";
    var fenshu = 0;
    for (var o in _result) {
        var obj = _result[o];
        /*var fenxi = "dp"+obj.choose;
         var op = "op"+obj.choose;*/
        var daan = "";

        if(obj.isright){
            daan = "答对!";
            fenshu+=5;
        }else{
            daan = "答错!";
        }
        var html= "<tr><td>"+obj.index+"</td><td>"+obj.title+"</td><td>"+daan+"</td></tr></tr>";
        timuhtml += html;
    }


    addtolocalfenshu(fenshu);

    timuhtml+="</table>";
    var showhtml = template+timuhtml;

    //showhtml+='<p style="color: red;font-size: 20px;text-align: center;">得分:'+fenshu+'</p>';
    $("#resultdiv").html(showhtml);
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    var hours = (today.getHours()) < 10 ? '0' + (today.getHours()) : (today.getHours());
    var minutes = (today.getMinutes()) < 10 ? '0' + (today.getMinutes()) : (today.getMinutes());
    var seconds = (today.getSeconds()) < 10 ? '0' + (today.getSeconds()) : (today.getSeconds());
    var date1 = year + month + day + hours + minutes + seconds+"";
    var writeName = userinfo.an+date1+".xls";
    //_sharepath = myObj.writeToSD && myObj.writeToSD(writeName,showhtml);

    /*$("#r1").text("CRI = 0: " + r1.length);
     $("#r2").text("CRI < 50: " + r2.length);
     $("#r3").text("CRI >= 50: " + r3.length);
     var p = r1.length / _records.length;
     p = p * 100;
     p = p.toFixed(2);
     $("#r4").text("Process indicator (PI) : " + p + "%");*/
    //$("#ruser").text("UserName:" + userinfo.username);
    _index = 0;
    //localStorage["iscontinue"] = "";
    //localStorage["_result"] = "";
    //clearInterval(_systemtimmer);


}

function toggleshow(){
    /*var typeid = $("#shijuanid").val();
    if(typeid){
        $(".lianxi").hide();
    }else{
        $(".lianxi").show();
    }*/
}

var recentlist = [];
function addtolocalfenshu(fenshu){
    var rcentfenshustr = localStorage['recentfenshu'];
    if(rcentfenshustr){
        var list = rcentfenshustr.split(",");
        if(list.length>4){
            var newlist = [];
            newlist[0] = fenshu;
            newlist[1] = list[0];
            newlist[2] = list[1];
            newlist[3] = list[2];
            newlist[4] = list[3];
            recentlist = newlist;
        }else{
            list[list.length] = fenshu;
            recentlist = list;
        }
    }else{
        recentlist=[fenshu];
    }
    localStorage['recentfenshu'] = recentlist.toString();
    var fdata = {};
    fdata.note = fenshu;
    fdata.username = userinfo.username;
    ajaxCallback("saveTousu",fdata,function(data){

    });
}

function next() {
    /*var choose = $('input[name="answer"]:checked').val();
     //focusobj.score = score * 1 * focusobj.weight;
     focusobj.choose = choose;*/
    checkIsRight();
    _result[_index] = focusobj;
    _index++;
    if (_index == _records.length - 1) {
        $("#next").text("提交");
    } else if (_index > _records.length - 1) {
        commit();
        return;
    }
    loadRecord();

}
function pre() {
    /*var choose = $("input[name='answer'][checked]").val();
     focusobj.choose = choose;*/
    checkIsRight();
    _result[_index] = focusobj;
    _index--;
    if (_index < 0) {
        _index = 0;
    }
    loadRecord();
}

function checkIsRight(){
    //if(_focustype==1){
        var choose = $("input[name='answer']:checked").val();
        if(_leixing==2){
            choose = "";
            $("input[name='dxtanswer']:checked").each(function(i){
                if(choose==""){
                    choose=$(this).val();
                }else{
                    choose+=", "+$(this).val();
                }
            });
            //choose = $("input[name='dxtanswer']:checked").val();//$("input[name='dxtanswer'][checked]").val();
        }else if(_leixing==3){
            choose = $("input[name='pdtanswer']:checked").val();//$("input[name='pdtanswer'][checked]").val();
        }
        console.log("choose:"+choose);
        if(focusobj.daan==choose){
            focusobj.isright = true;
            _fenshu+=_fenzhi;
        }
        if(_testtype==1){
            if(focusobj.isright){
                showLoader("恭喜答对了!",true);
            }else{
                showLoader("答错了,答案是:"+focusobj.daan.toUpperCase()+"!",true);
            }
        }

        if(!focusobj.isright){
            saveToCuotis();
        }else{
            delFromCuotis();
        }

    /*}else if(_focustype==2){
        var choose = $("#jdtanswer").val();
        if(focusobj.daan == choose){
            focusobj.isright = true;
        }
    }*/
}


/*function goback(){
    window.location.href="index.html";
}*/

function toggleFavOption(){
    var str = $("#favbtn").text();
    if(str=="收藏"){
        saveToFavs();
    }else{
        delFromFavs();
    }
}

function saveToFavs(){
    var tid = focusobj.id;
    var favs = userinfo.favs;
    var favsarray = [];
    if(favs){
        favsarray = favs.split(",");
        if(favsarray && favsarray.length){
            var flag = true;
            for(var i=0;i<favsarray.length;i++){
                if(favsarray[i]==tid){
                    flag = false;
                    break;
                }
            }
            if(flag){
                favsarray.push(tid);
            }else{
                return;
            }
        }
    }else{
        favsarray.push(focusobj.id);
    }


    var favstr = favsarray.toString();
    ajaxCallback("saveToFavs",{uid:userinfo.id,favs:favstr},function(data){
        userinfo = data;
        showLoader("成功添加到收藏",true);
        toggleFav();
    });
}

function delFromFavs(){
    var tid = focusobj.id;
    var favs = userinfo.favs;
    var favsarray = [];
    var newsarray = [];
    if(favs){
        favsarray = favs.split(",");
        if(favsarray && favsarray.length){
            var flag = true;
            for(var i=0;i<favsarray.length;i++){
                if(favsarray[i]==tid){
                    flag = false;
                    continue;
                }
                newsarray.push(favsarray[i])
            }
            if(flag){
                return;
            }
        }
    }else{
        return
    }


    var favstr = newsarray.toString();
    ajaxCallback("saveToFavs",{uid:userinfo.id,favs:favstr},function(data){
        userinfo = data;
        showLoader("从收藏夹移除",true);
        toggleFav();
    });
}


function delFromCuotis(){
    var tid = focusobj.id;
    var favs = userinfo.cuotis;
    var favsarray = [];
    var newsarray = [];
    if(favs){
        favsarray = favs.split(",");
        if(favsarray && favsarray.length){
            var flag = true;
            for(var i=0;i<favsarray.length;i++){
                if(favsarray[i]==tid){
                    flag = false;
                    continue;
                }
                newsarray.push(favsarray[i])
            }
            if(flag){
                return;
            }
        }
    }else{
        return
    }


    var favstr = newsarray.toString();
    ajaxCallback("saveToFavs",{uid:userinfo.id,cuotis:favstr},function(data){
        userinfo = data;
        showLoader("从错题集移除",true);
    });
}


function saveToCuotis(){
    var tid = focusobj.id;
    var favs = userinfo.cuotis;
    var favsarray = [];
    if(favs){
        favsarray = favs.split(",");
        if(favsarray && favsarray.length){
            var flag = true;
            for(var i=0;i<favsarray.length;i++){
                if(favsarray[i]==tid){
                    flag = false;
                    break;
                }
            }
            if(flag){
                favsarray.push(tid);
            }else{
                return;
            }
        }
    }else{
        favsarray.push(focusobj.id);
    }


    var favstr = favsarray.toString();
    ajaxCallback("saveToCuotis",{uid:userinfo.id,cuotis:favstr},function(data){
        userinfo = data;
        //showLoader("已添加到错题集",true);
    });
}
