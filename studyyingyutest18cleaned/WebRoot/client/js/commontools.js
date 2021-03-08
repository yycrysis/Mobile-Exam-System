/**
 * Created by aiur on 14-6-28.
 * commontools
 */
serializeObject = function(form) {
    var o = {};
    $.each(form.serializeArray(), function(index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};

function ajaxCallback(action, data, cb,notshow) {
    if(!clientUrl){
        alert("请先设置服务端根路径");
        return;
    }
    !notshow && showLoader("请稍后...");
    data = data || {};
    var retrytimes = 5;
    var count = 0;
    var connectServer = function(){
        !notshow && showLoader("请稍后...");
        $.ajax({
            type: "GET",
            url: clientUrl + action,
            dataType: "jsonp",
            jsonp: "callback",
            contentType: "text/html; charset=utf-8",
            data: data,
            timeout:50000,
            async:true,
            success: function (data) {
                hideLoader();
                cb(data);
                console.log("success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideLoader();
                console.log("error:"+XMLHttpRequest+" textStatus:"+textStatus+" errorThrown"+errorThrown);
            },
            complete:function(XMLHttpRequest, textStatus){
                console.log("complete:"+XMLHttpRequest+"textStatus:"+textStatus);
                if(textStatus == "timeout"){
                    if(count<retrytimes){
                        count++;
                        connectServer();
                        console.log(count);
                    }else{
                        showLoader("连接服务器超时！",true);
                    }

                }
            }
        });
    };
    connectServer();
}
/**
 * 判断是否所有的属性都有值
 * @param obj
 * @returns {boolean}
 */
function checkObjectValue(obj) {
    for(var p in obj){
        if(obj[p]!=undefined && obj[p]!=null){
            if($.trim(obj[p]) == ""){
                return true;
            }
        }
    }
    return false;
}

function getObjectById(id,goodlist){
    for(var i=0;i<goodlist.length;i++){
        var good = goodlist[i];
        if(good.id == id){
            return good;
        }
    }
    return null;
}


function GetExtensionFileName(pathfilename)
{
    var reg = /(\\+)/g;
    var pfn = pathfilename.replace(reg, "#");
    var arrpfn = pfn.split("#");
    var fn = arrpfn[arrpfn.length - 1];
    var arrfn = fn.split(".");
    return arrfn[arrfn.length - 1];
}

function isImg(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="jpg" || houzui=="jpeg" || houzui=="png" || houzui=="gif" || houzui=="bmp"){
        return true;
    }else{
        return false;
    }
}

function isVideo(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="mp4" || houzui=="3gp" || houzui=="avi" || houzui=="mepg" || houzui=="ogg"){
        return true;
    }else{
        return false;
    }
}


function getTimeFromSeconds(totalSeconds) {
    if (totalSeconds < 86400) {
        var dt = new Date("01/01/2000 0:00");
        dt.setSeconds(totalSeconds);
        return formatTime(dt);
    } else {
        return null;
    }
}

function formatTime(dt) {
    var h = dt.getHours(),
        m = dt.getMinutes(),
        s = dt.getSeconds(),
        r = "";
    if (h > 0) {
        r += (h > 9 ? h.toString() : "0" + h.toString()) + ":";
    }
    r += (m > 9 ? m.toString() : "0" + m.toString()) + ":"
    r += (s > 9 ? s.toString() : "0" + s.toString());
    return r;
}


function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}



var _showimgel = null;
var _showimgel2 = null;

function getFileInput(el){
    var el = $(el).prev();
    _showimgel = el;
    document.getElementById('selectimginput').click();

}
function showPicImg(files){
    var file = files[0];
    var filename = file['name'];
    var fileURL = window.URL.createObjectURL(file);
    $(_showimgel).attr("src", fileURL);
    var imgel = "";
    if(isImg(filename)){
        imgel = "<img style='width: 100%' src='"+fileURL+"' />";
    }else if(isVideo(filename)){
        imgel = "<video controls style='width: 100%' src='"+fileURL+"' ></video>";
    }else if(isMusic(filename)){
        imgel = "<audio controls style='width: 100%' src='"+fileURL+"' ></audio>";
    }else{
        imgel = "<a href='"+fileURL+"'>"+filename+"</a>";
    }
    $(_showimgel).html(imgel);
}
function getFileInput2(el){
    var el = $(el).prev();
    _showimgel2 = el;
    document.getElementById('selectimginput2').click();

}
function showPicImg2(files){
    var file = files[0];
    var filename = file['name'];
    var fileURL = window.URL.createObjectURL(file);
    $(_showimgel2).attr("src", fileURL);
    var imgel = "";
    if(isImg(filename)){
        imgel = "<img style='width: 100%' src='"+fileURL+"' />";
    }else if(isVideo(filename)){
        imgel = "<video controls style='width: 100%' src='"+fileURL+"' ></video>";
    }else if(isMusic(filename)){
        imgel = "<audio controls style='width: 100%' src='"+fileURL+"' ></audio>";
    }else{
        imgel = "<a href='"+fileURL+"'>"+filename+"</a>";
    }
    $(_showimgel2).html(imgel);
}


function ajaxFormUploadFile(cb){
    var formData = new FormData($("#uploadForm")[0]);
    $.ajax({
        url: uploadUrl ,  /*这是处理文件上传的servlet*/
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (r) {
            cb && cb(r);
        },
        error: function (r) {
            cb && cb("");
        }
    });
}
function ajaxFormUploadFile2(cb){
    var formData = new FormData($("#uploadForm2")[0]);
    $.ajax({
        url: uploadUrl ,  /*这是处理文件上传的servlet*/
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (r) {
            cb && cb(r);
        },
        error: function (r) {
            cb && cb("");
        }
    });
}



function isMusic(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="mp3" || houzui=="wma" || houzui=="acc"){
        return true;
    }else{
        return false;
    }
}


function GetExtensionFileName(pathfilename)
{
    var reg = /(\\+)/g;
    var pfn = pathfilename.replace(reg, "#");
    var arrpfn = pfn.split("#");
    var fn = arrpfn[arrpfn.length - 1];
    var arrfn = fn.split(".");
    return arrfn[arrfn.length - 1];
}

function isImg(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="jpg" || houzui=="jpeg" || houzui=="png" || houzui=="gif" || houzui=="bmp"){
        return true;
    }else{
        return false;
    }
}

function isVideo(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="mp4" || houzui=="3gp" || houzui=="avi" || houzui=="mepg" || houzui=="ogg"){
        return true;
    }else{
        return false;
    }
}


function showAttach(elid,filename){
    var fileURL = fileurl+filename;
    var imgel = "";
    if(filename){
        if(isImg(filename)){
            imgel = "<img style='width: 100%' src='"+fileURL+"' />";
        }else if(isVideo(filename)){
            imgel = "<video controls style='width: 100%' src='"+fileURL+"' ></video>";
        }else if(isMusic(filename)){
            imgel = "<audio controls style='width: 100%' src='"+fileURL+"' ></audio>";
        }else{
            imgel = "<a href='"+fileURL+"'>"+filename+"</a>";
        }
    }

    $("#"+elid).html(imgel);
}