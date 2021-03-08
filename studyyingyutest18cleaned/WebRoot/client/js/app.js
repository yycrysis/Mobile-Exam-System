/**
 * Created by aiur on 14-6-28.
 */

var rootUrl = "http://192.168.31.207:8080/studyyingyutest18/";
var fileurl = rootUrl+"upload/";
var clientUrl = rootUrl+"Wehall!";
var uploadUrl = rootUrl+"Upload";
var downloadUrl = rootUrl+"download";

//var rootUrl = "http://ideaweshop.sinaapp.com/";
//var fileurl = "http://ideaweshop-public.stor.sinaapp.com/upload/";
//var clientUrl = rootUrl+"index.php/Client/";


function ownpage(el){
    $("#showimg").css({"left":"0px","top":"0px"});
    changePage("imgshow");
    $("#showimg").attr("src",el.src);
    var imgcontaner = document.getElementById("showimg");
    var hammertime = Hammer(imgcontaner, {
        preventDefault: true
    });
    var lastScale = 1;
    var startX = 0;
    var startY = 0;
    var changeX = 0;
    var changeY = 0;
    var currentX = 0;
    var currentY = 0;
    var hasDoubleTap = false;
    hammertime.on("transform",function(ev){
        $(imgcontaner).css({"transform":"scale("+ev.gesture.scale*lastScale+","+ev.gesture.scale*lastScale+")"});
        lastScale = ev.gesture.scale;
        $("#showimg").css({"left":"0px","top":"0px"});
    });
    hammertime.on("dragstart",function(ev){
        $(imgcontaner).css({"transition": ""});
        startX = ev.gesture.center.clientX;
        startY = ev.gesture.center.clientY;
        currentX = $(imgcontaner).css("left").split("px")[0]*1;
        currentY = $(imgcontaner).css("top").split("px")[0]*1;
    });
    hammertime.on("drag",function(ev){
        changeX = ev.gesture.center.clientX-startX;
        changeY = ev.gesture.center.clientY-startY;
        $(imgcontaner).css("left",currentX+changeX);
        $(imgcontaner).css("top",currentY+changeY);
    });
    hammertime.on("doubletap",function(ev){
        $("#showimg").css({"left":"0px","top":"0px"});
        if(hasDoubleTap){
            $(imgcontaner).css({"transform":"scale(1,1)","transition": "all 200ms ease-in"});
            hasDoubleTap = false;
        }else{
            $(imgcontaner).css({"transform":"scale(6,6)","transition": "all 200ms ease-in"});
            hasDoubleTap = true;
        }

    });

}

function getPositionByBaidu(json){
    var info = JSON.parse(json);
    var latitude = info.latitude;
    var longitude = info.longitude;
    var addr = info.addr;
}

function setTheme(){
    window.location.href="indexblue.html";
}

function  initswiper(){

    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,

        pagination: '.swiper-pagination',
        autoplay: 3000

    })

}

/*function bindClient(){
    setTimeout(function(){
        var clientid = myObj.getClientId && myObj.getClientId();
        if(clientid){
            console.log("clientid:"+clientid);
            ajaxCallback("bindClient",{uid:userinfo.id,clientid:clientid},function(data){

            });
        }else{
            bindClient();
        }

    },5000);
}*/


/*
var _currentPosition = null;
function getPositionByBaidu(json){
    hideLoader();
    var info = JSON.parse(json);
    _currentPosition = info;
}

function getTodayWeather(cityname){
    var city = cityname || "重庆";
    ajaxCallback("getWeather",{city:city},function(data){
        $("#resultdiv").show();
        var results = data.info;
        results = JSON.parse(results);
        var list = results.results[0]['weather_data'];
        $("#day1").html(list[0].date+"<br>"+"温度："+list[0].temperature+"<br>"+list[0].weather+":"+list[0].wind);
        $("#day1img").attr("src",list[0].dayPictureUrl);
        var wendu = list[0].temperature.split(" ~ ")[0];
        ajaxCallback("listGood",{temp:wendu},function(rlist){
            var count = 0;
            for(var i=0;i<rlist.length;i++){
                var good = rlist[i];
                if(good.dtype==1){
                    $("#updress").data("gid",good.id).css("background-image","url('"+fileurl+good.img+"')");
                    count++;
                }else if(good.dtype==2){
                    $("#downdress").data("gid",good.id).css("background-image","url('"+fileurl+good.img+"')");
                    count++;
                }
                if(count==2){
                    break;
                }
            }
        });
    });
}

myLocation.getLocation();*/
