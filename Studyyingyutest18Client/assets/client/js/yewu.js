/**
 * Created by aiur on 2019/3/28.
 */
var shoplist = [];
var billlist = [];
var goodlist = [];
var addresslist = [];
var focusobj = null;
var focushop = {};
var foodcarlist = [];
var gouwuche = "gouwuche";
var _favs = "_favs";

var _latitude = null;
var _longitude = null;


$(function(){
//设置分类列表
    var p = {};
    p.tpl = '<li><a href="#" onclick="toShop(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</a></li>';
    p.colums = ["id","img","sname","note"];
    $("#shops").data("property",JSON.stringify(p));

    var pga2 = {};
    pga2.tpl = '<li><a href="#" onclick="toGoodAdimin(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">%s 元</p>'+
        '</a></li>';
    pga2.colums = ["id","img","gname","note","price"];
    $("#goodsadmin").data("property",JSON.stringify(pga2));

    var p2 = {};
    p2.tpl = '<li onclick="toGood(%s);">'+
        //'<img style="height: 80px;" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        //'<p style="color: red;">%s 元</p>'+
        '</li>';
    p2.colums = ["id","gname","note"];
    $("#goods").data("property",JSON.stringify(p2));



    var p5 = {};
    p5.tpl = '<li onclick="postDetail(%s);">'+
        '<h2>%s</h2>'+

        '<p>%s</p>'+
        '</li>';
    p5.colums = ["id","title","ndate"];
    $("#posts").data("property",JSON.stringify(p5));


    var p655 = {};
    p655.tpl = '<li><a href="#" onclick="">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '<p><span style="color: #3e6790;" onclick="replayUser(\'%s\');">回复</span></p>'+
        '</a></li>';
    p655.colums = ["ndate","uid","username","note","username","username","uid"];
    $("#replays").data("property",JSON.stringify(p655));

    var p666666 = {};
    p666666.tpl = '<li><a href="#" onclick="">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '<p><span style="color: #3e6790;" onclick="replayUser(\'%s\');">回复</span></p>'+
        '</a></li>';
    p666666.colums = ["ndate","username","note","username"];
    $("#replays2").data("property",JSON.stringify(p666666));

    /*var p2 = {};
    p2.tpl ='<a onclick="toGood(%s);"><li class="gitem"><div><img src="'+fileurl+'%s"><h2>%s</h2><p>￥:%s 销量:%s</p></div></li></a>';
    p2.colums = ["id","img","gname","price","xiaoliang"];
    $("#goods").data("property",JSON.stringify(p2));*/


    /*var p2 = {};
    p2.tpl='<li>'+
    '<a href="#" onclick="toGood(%s);">'+
    '<img class="previewimg listimg" src="'+fileurl+'%s">'+
    '<h2 style="">%s</h2>'+
    '<p style="color: red;">%s 元</p>'+
        '<p style="color: red;">销量:%s</p>'+
    '</a>'+
    '<div class="countopreadiv">'+
    '<a onclick="countFood(%s,1);"><img src="images/add.png"></a>'+
    '<input id="food%s" data-role="none" type="text" value="0">'+
    '<a onclick="countFood(%s,-1);"><img src="images/jian.png"></a>'+
    '</div>'+
    '</li>';
    p2.colums = ["id","img","gname","price","xiaoliang","id","id","id"];
    $("#goods").data("property",JSON.stringify(p2));*/


    var p2t = {};
    p2t.tpl='<li>'+
        '<a href="#" onclick="toGood(%s);">'+
        '<img class="previewimg" src="'+fileurl+'%s">'+
        '<h2 style="">%s</h2>'+
        '<p style="color: red;">%s 元</p>'+
        '</a>'+
        '<div class="countopreadiv">'+
        '<a onclick="countFood(%s,1);"><img src="images/add.png"></a>'+
        '<input id="food%s" data-role="none" type="text" value="0">'+
        '<a onclick="countFood(%s,-1);"><img src="images/jian.png"></a>'+
        '</div>'+
        '</li>';
    p2t.colums = ["id","img","gname","price","id","id","id"];
    $("#tuijianlist").data("property",JSON.stringify(p2t));




    var p3 = {};
    p3.tpl = '<li><a>'+
        '<img src="'+fileurl+'%s" class="ui-li-thumb">'+
        '<h2>%s</h2>'+
        '<p style="color: red;">%s 元</p>'+
        '<p>数量:%s</p>'+
        '</a><a onclick="removeCar(%s);">删除</a>'+
        '</li>';
    p3.colums = ["img","gname","price","count","id"];
    $("#cars").data("property",JSON.stringify(p3));


    var pfavs = {};
    pfavs.tpl = '<li><a>'+
        '<img style="height: 80px;" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+

        '</a><a onclick="removeFavs(%s);">删除</a>'+
        '</li>';
    pfavs.colums = ["img","gname","id"];
    $("#favs").data("property",JSON.stringify(pfavs));

    /*var p3 = {};
    p3.tpl='<li>'+
    '<a href="#" onclick="toGood(%s);">'+
    '<img class="previewimg" src="'+fileurl+'%s">'+
    '<h2 style="">%s</h2>'+
    '<p style="color: red;">%s 元</p>'+
    '</a>'+
    '<div class="countopreadiv">'+
    '<a onclick="countFoodCar(%s,1);"><img src="images/add.png"></a>'+
    '<input id="foodcar%s" data-role="none" type="text" value="%s">'+
    '<a onclick="countFoodCar(%s,-1);"><img src="images/jian.png"></a>'+
    '</div>'+
    '</li>';
    p3.colums = ["id","img","gname","price","id","id","count","id"];
    $("#cars").data("property",JSON.stringify(p3));*/

    var p4 = {};
    p4.tpl = '<li><a href="#" onclick="billDetail(%s);">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">总价:%s</p>'+
        //'<p>电话:%s</p>'+
        //'<p style="color: red;">状态:%s</p>'+
        '</a></li>';
    p4.colums = ["id","ndate","gnames","total"];
    $("#bills").data("property",JSON.stringify(p4));



    var p6 = {};
    p6.tpl = '<li><a href="#" onclick="">'+
        //'<img src="'+fileurl+'%s">'+
        '<p>%s    %s</p>'+
        '<p>%s</p>'+
        '</a></li>';
    p6.colums = ["username","ndate","note"];
    $("#replays").data("property",JSON.stringify(p6));


    var p7 = {};
    p7.tpl = '<li><a href="#" onclick="toGood(%s,1);">'+
        '<img src="'+fileurl+'%s" class="ui-li-thumb">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">%s 元</p>'+
        '</a></li>';
    p7.colums = ["id","img","gname","note","price"];
    $("#billgoods").data("property",JSON.stringify(p7));


    var pdz = {};
    pdz.tpl = '<li><a href="#" onclick="">'+
        '<h2>%s</h2>'+
        '<p>电话:%s</p>'+
        '<p>日期:%s</p>'+
        '<p>时间:%s</p>'+
        '<p>人数:%s</p>'+
        '<p>备注:%s</p>'+
        '<p>%s</p>'+
        '</a></li>';
    pdz.colums = ["xingming","shouji","todate","shijian","renshu","beizhu","ndate"];
    $("#dingzuolist").data("property",JSON.stringify(pdz));

    var atpl = {};
    atpl.tpl = '<li><a href="#" onclick="toAddressMg(%s);">'+
        '<h2>%s</h2>'+
        '</a><a onclick="delAddress(%s);"></a></li>';
    atpl.colums = ["id","title","id"];
    $("#addresss").data("property",JSON.stringify(atpl));


    /*    var $container = $('#goods');
        $container.masonry({
            columnWidth: 200,
            itemSelector: '.gitem'
        });*/

    /*$("#mainpage").on("pagebeforeshow",function(){
       if(!userinfo){
           logout();
       }
    });*/

    var p666 = {};
    p666.tpl = '<li onclick="noticeDetail(%s)">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    p666.colums = ["id","title","note"];
    $("#noticelist").data("property",JSON.stringify(p666));


    var p33 = {};
    p33.tpl = '<li onclick="myObj.openFile(\'%s\');">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    p33.colums = ["img","gname","note"];
    $("#xiazailist").data("property",JSON.stringify(p33));

    var p343 = {};
    p343.tpl = '<li>'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    p343.colums = ["title","ndate"];
    $("#rizhilist").data("property",JSON.stringify(p343));

});
var _objlist = [];
var downloadlisttag = "downloadlist";
var downloadliststr = localStorage[downloadlisttag];
var downloadlist = [];
if(downloadliststr){
    downloadlist = JSON.parse(downloadliststr);
}
function toDownLoadList(){
    changePage('downloadpage');
    _objlist = downloadlist;
    $("#xiazailist").refreshShowListView(downloadlist);
}
/********************************************************地址增删改end******************************************/

function replayUser(username){
    $("#rnote").val("回复 "+username+":");
    $("#rnote2").val("回复 "+username+":");
}
function mypost(){
    toLuntan(userinfo.id);
}

function toLuntan(id){
    changePage("luntanpage");
    listPosts(id);
}

function listPosts(id){
    ajaxCallback("listPosts",{uid:id},function(data){
        focuslist = data;
        $("#posts").refreshShowListView(data);
    });
}
function toAddForm(){
    if(!userinfo){
        toLogin();
        return;
    }
    changePage("addformpage");
    $("#path").hide();
    $("#pimgshow").hide();
}
function addForm(){
    var note = $("#fnote").val();
    var title = $("#ftitle").val();
    var type = $("#ftype").val();
    ajaxFormUploadFile(function(r){
        ajaxCallback("addPosts",{uid:userinfo.id,title:title,note:note,username:userinfo.username,img:r,type:type,xuexiao:userinfo.wechat},function(){
            toLuntan();
        });
    });

}
function postDetail(id){
    var obj = getObjectById(id,focuslist);
    focusobj = obj;
    changePage("postdetail");
    $("#vptitle").text("标题:"+obj.title);
    $("#vpnote").text("内容:"+obj.note);
    $("#vschool").text("学校:"+obj.xuexiao);
    $("#vpusername").text("发布者:"+obj.username);
    $("#vpdate").text("时间:"+obj.ndate);
    $("#plink").hide();
    $("#pimg").hide();
    $("#zan").text(obj.zan||0);
    showAttach("attachdiv",obj.img);
    if(obj.img){
        if(isImg(obj.img)){
            $("#pimg").attr("src", fileurl+obj.img).show();
        }else{
            $("#plink").text(fileurl+obj.img).show();
        }
    }

    if(obj.uid == userinfo.id){
        $("#mypost").show();
    }else{
        $("#mypost").hide();
    }
    listReplay();
}
function listReplay(){
    ajaxCallback("listReplay",{pid:focusobj.id},function(data){
        $("#replays").refreshShowListView(data);
    });
}



function toMain(){
    //toGoods();
    toGoods();
    if(userinfo.roletype=="2"){
        $(".teacher").hide();
    }else{
        $(".teacher").show();
    }
}


function toGoods(id){
    var sid = id||"";
    changePage("mainpage");
    listType();
    listGood(sid);
    setTimeout(function (){
        initswiper();
    },500);
    //initIdeaScroll();
}

function refreshGood(title,type){
    var paixu = ""//$("#type2").val();

    ajaxCallback("listGood",{btype:title,stype:"",order:paixu,sid:""},function(data){
        goodlist = data;
        for(var i=0;i<goodlist.length;i++){
            var obj = goodlist[i];
            if(obj.img && isVideo(obj.img)){
                goodlist[i]['simg'] = "video.png";
            }else{
                goodlist[i]['simg'] = obj.img;
            }
        }
        $("#goods").refreshShowListView(goodlist);
    });
}

function listGood(sid){
    ajaxCallback("listGood",{sid:sid},function(data){
        goodlist = data;
        for(var i=0;i<goodlist.length;i++){
            var obj = goodlist[i];
            if(obj.img && isVideo(obj.img)){
                goodlist[i]['simg'] = "video.png";
            }else{
                goodlist[i]['simg'] = obj.img;
            }
        }
        $("#goods").refreshShowListView(goodlist);
    });
}

function listType(){
    ajaxCallback("listType",{},function(data){
        $("#type").refreshShowSelectMenu(data,"选择课程");
    });
}

function toFabu(){
    if(!userinfo){
        toLogin();
        return;
    }
    changePage("fabupage");
    $("#rmyImage1").hide();
    $("#rmyImage1v").hide();
    $("#rmyImage1f").hide();
    $("#goodform")[0].reset();
    $("#gimg2").attr("src","");
    $("#gid").val("");
    $("#action").val("add");
    ajaxCallback("listType",{pid:1},function(data){
        shoplist = data;
        $("#fcity").refreshShowSelectMenu(data,"选择课程","id","title");
    });
}

function toFabu2(){
    if(!userinfo){
        toLogin();
        return;
    }
    changePage("fabupage2");

}

function saveGood(){
    var fdata = serializeObject($("#goodform"));
    fdata.uid = userinfo.id;
    fdata.username = userinfo.username;
    fdata.btype = "2";
    fdata.type = $("#fcity").find("option:selected").text();
    fdata.gtype = _focustype;

    uplaodImg(function(img){
        if(img){
            fdata.img = img;
        }

        ajaxCallback("saveGood",fdata,function(){
            showLoader("发布成功!",true);
            toYouji();
        });
    });
}

function saveNotice(){
    var fdata = serializeObject($("#noticeform"));
    ajaxCallback("saveNotice",fdata,function(data){
        toNotice();
    });
}

function toGood(id,flag){
    var obj = getGoodById(id);
    focusobj = obj;
    changePage("goodpage");
    $("#gname2").text("标题:"+obj.gname);
    $("#gvideo2").hide();
    $("#gimg2").hide();
    if(obj.img){
        if(isVideo(obj.img)){
            $("#gvideo2").attr("src",fileurl+obj.img).show();
        }else if(isImg(obj.img)){
            $("#gimg2").attr("src",fileurl+obj.img).show();
        }
    }



    $("#gnote2").text("简介:"+obj.note);
    $("#gprice2").text("价格:"+obj.price);
    $("#guser").text("发布者:"+obj.shop);
    $("#gtel").text("电话:"+obj.tel);
    $("#guid").text("用户id:"+obj.ownid);
    //$("#zan").text(obj.zan||0);
    listReplay2();
    $("#canreplay").hide();
    $("#canbuy").hide();
    if(flag){
        $("#canreplay").show();
    }else{
        $("#canbuy").show();
    }


    var rizhi = {};
    rizhi.title = focusobj.gname;
    rizhi.username = userinfo.username;
    rizhi.uid = userinfo.id;
    ajaxCallback("saveRizhi",rizhi,function(data){

    });
}

function toMyRizhi(){
    changePage('rizhipage');
    ajaxCallback("listRizhi",{uid:userinfo.id},function(data){
        $("#rizhilist").refreshShowListView(data);
    });
}

function toGoodDetail(obj){
    focusobj = obj;
    changePage("goodpage");
    $("#gname2").text("商品名:"+obj.gname);
    $("#gimg2").attr("src",fileurl+obj.img);
    $("#gnote2").text("简介:"+obj.note);
    $("#gprice2").text("价格:"+obj.price);
    $("#guser").text("发布者:"+obj.shop);
    $("#gtel").text("电话:"+obj.tel);
    $("#guid").text("用户id:"+obj.ownid);
    $("#gaddress").text("卖家地址:"+obj.address);
    $("#zan").text(obj.zan||0);
    listReplay();
    $("#canreplay").hide();
    $("#canbuy").hide();
    $("#canbuy").show();
}





function zan(){
    var id = focusobj.id;
    ajaxCallback("zan2",{id:id},function(data){
        $("#zan").text(data.info);
    });
}


function delPosts(){
    ajaxCallback("delPosts",{id:focusobj.id},function(data){
        toLuntan();
    });
}


function listReplay(){
    ajaxCallback("listReplay",{pid:focusobj.id},function(data){
        $("#replays").refreshShowListView(data);
    });
}
function listReplay2(){
    ajaxCallback("listReplay",{pid:focusobj.id},function(data){
        $("#replays2").refreshShowListView(data);
    });
}
function addReplay(){
    if(uploadFileUrl){
        uplaodImg(function(r){
            commitReplay(r);
        });
    }else{
        commitReplay();
    }


}

function addReplay2(){
    var note = $("#rnote2").val();
    ajaxCallback("addReplay",{pid:focusobj.id,uid:userinfo.id,username:userinfo.username,note:note,img:""},function(data){
        listReplay2();
    });


}

function commitReplay(img){
    img = img || "";
    var note = $("#rnote").val();
    ajaxCallback("addReplay",{pid:focusobj.id,uid:userinfo.id,username:userinfo.username,note:note,img:img},function(data){
        listReplay();
    });
}

function getGoodById(id){
    for(var i=0;i<goodlist.length;i++){
        var good = goodlist[i];
        if(good.id == id){
            return good;
        }
    }
    return null;
}




function addToFavs(){
    var str = localStorage[_favs];
    var list = [];
    if(str){
        list = JSON.parse(str);
    }
    focusobj.count = $("#count").val();
    list.push(focusobj);
    localStorage[_favs] = JSON.stringify(list);
    /*focusobj.count = $("#count").val();
     addToFoodCar(focusobj,0);*/
    showLoader("已经添加收藏!",true);
}

function showFavs(){
    if(!userinfo){
        changePage("loginpage");
        return;
    }
    changePage("favspage");
    favslist();
    //listFoodCar();
}


function favslist(){
    var str = localStorage[_favs];
    var list = [];
    if(str){
        list = JSON.parse(str);
    }
    $("#favs").refreshShowListView(list);
}

function removeFavs(id){
    var str = localStorage[_favs];
    var list = [];
    var newlist = [];
    if(str){
        list = JSON.parse(str);
        for(var i=0;i<list.length;i++){
            var obj = list[i];
            if(obj.id == id){
                continue;
            }
            newlist.push(obj);
        }
        localStorage[_favs] = JSON.stringify(newlist);
        $("#favs").refreshShowListView(newlist);
    }
}




function filterGood(){
    var title = $("#searchinput").val();
    var list = filterObj(title,goodlist);
    $("#goods").refreshInsertView(list);
}

function filterObj(title,list){
    var rlist = [];
    if(!title || $.trim(title)==""){
        return list;
    }
    for(var i= 0,len=list.length;i<len;i++){
        var obj = list[i];
        var str = obj.gname;
        title = $.trim(title);
        if(str.indexOf(title)!=-1){
            rlist.push(obj);
        }
    }
    return rlist;
}




function toAddPage(){
    $("#goodform")[0].reset();
    $("#rmyImage1").attr("src","");
    $("#action").val("add");
    $("#id").val("");
    changePage('fabupage');
    ajaxCallback("listType",{},function(data){

        $("#fcity").refreshShowSelectMenu(data,"选择课程","id","title");
    });
}

function toEditPage(){
    changePage('fabupage');
    $("#action").val("edit");
    $("#id").val(focusobj.id);
    ajaxCallback("listType",{},function(data){
        $("#fcity").refreshShowSelectMenu(data,"选择课程","id","title");
    });

    $("#fcity").val(focusobj.typeid);
    $("#gname").val(focusobj.gname);
    $("#price").val(focusobj.price);
    $("#img").val(focusobj.img);
    $("#note").val(focusobj.note);
    $("#xiaoliang").val(focusobj.xiaoliang);
    $("#rmyImage1").attr("src",fileurl+focusobj.img);

}

function saveGood(){
    var fdata = serializeObject($("#goodform"));
    fdata.sid = focushop.id;
    fdata.shop = userinfo.username;
    fdata.ownid = userinfo.id;
    fdata.address = userinfo.address;

    uplaodImg(function(img){
        if(img){
            fdata.img = img;
        }

        ajaxCallback("saveGood",fdata,function(){
            showLoader("发布成功!",true);
            toGoods();
        });
    });
}


function delGood(){
    ajaxCallback("delGood",{id:focusobj.id},function(data){
        toGoods();
    });
}


function scanErcode(){
    scanCode(function (id){
        id = parseInt(id);
        ajaxCallback("getGood",{id:id},function(data){

            if(data){
                toGoodDetail(data);
            }else{
                showLoader("没有找到商品!",true);
            }
        });
    });
}
var focuslist = null;
function toNotice(){
    changePage('noticepage');
    listNotice();
}

function listNotice(){
    ajaxCallback("listNotice",{},function(data){
        focuslist = data;
        $("#noticelist").refreshShowListView(data);
    });
}

function noticeDetail(id){
    var obj = getObjectById(id,focuslist);
    changePage('noticedetailpage');
    if(obj.img){
        $("#dimg").attr("src",fileurl+obj.img).show();
    }else{
        $("#dimg").hide();
    }
    $("#vtitle").text(obj.title);
    $("#vnote").text(obj.note);
    $("#vndate").text("时间:"+obj.ndate);
}


function toFenxi(){
    changePage('fenxipage');
    initChart1();
}