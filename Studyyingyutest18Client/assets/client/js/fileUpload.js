/**
 * Created by aiur on 2019/3/5.
 上传图片
 */
function uplaodImg(callback){
    if(uploadFileUrl){
        uploadFile(uploadFileUrl,uploadUrl,function(r){
            var img = r.response;
            callback && callback(img);
        },function(error){
            showLoader(error,true);
        });
    }else{
        showLoader("请选择文件!",true);
    }
}