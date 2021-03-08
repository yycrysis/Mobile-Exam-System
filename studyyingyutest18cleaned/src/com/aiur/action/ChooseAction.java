package com.aiur.action;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;






import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.aiur.model.Choose;
import com.aiur.service.ChooseService;
import com.aiur.util.GetNowTime;
import com.aiur.util.IdeaAction;
import com.aiur.util.Page;
import com.google.gson.Gson;

@Controller
public class ChooseAction extends IdeaAction {
	@Resource
	private ChooseService chooseService;
	private static final long serialVersionUID = -3218238026025256103L;
	private Choose choose;
	public Choose getChoose() {
		return choose;
	}

	public void setChoose(Choose choose) {
		this.choose = choose;
	}

	public String choose(){
		return SUCCESS;
	}
	
	public String choose2(){
		return "choose2";
	}
	public String choose3(){
		return "choose3";
	}

	
	/*******************************上传相关属性************************/
	private File img;
	private String imgFileName;
	
	
	public String getImgFileName() {
		return imgFileName;
	}

	public void setImgFileName(String imgFileName) {
		this.imgFileName = imgFileName;
	}

	public File getImg() {
		return img;
	}

	public void setImg(File img) {
		this.img = img;
	}

	public String upload(){
		System.out.println("开始上传.......");
		String uuid = UUID.randomUUID().toString();
		uuid = uuid.substring(0, 32);
		String fileName =  UUID.randomUUID()+imgFileName.substring(imgFileName.lastIndexOf("."),imgFileName.length());
		FileOutputStream fos=null;
	    FileInputStream fis=null;
	    //int size = 0;
	    String uploadPath = ServletActionContext.getServletContext().getRealPath("upload");
	    String path=uploadPath+ File.separator+fileName;
	    //String type =uploadFileName.substring(uploadFileName.lastIndexOf(".")+1);
	    File file = new File(uploadPath);
	    if (!file.exists()){
	    	file.mkdirs();
	    }
	    try {
			fos=new FileOutputStream(path);
			fis=new FileInputStream(img);
			//size = fis.available();
			byte[] buf=new byte[10240];
	    	int len=-1;
	    	while((len=fis.read(buf))!=-1){
	    		fos.write(buf, 0, len);
	    	}
	    	fos.flush();
	    	//PrintWriter out = ServletActionContext.getResponse().getWriter();
	    	return fileName;
		} catch (Exception e) {			
			e.printStackTrace();
			return null;
		}finally{
			if(fis!=null){
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(fos!=null){
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	/*******************************上传相关属性************************/
	public void getList(){
		String objname = request.getParameter("stitle");
		String leixing = request.getParameter("leixing");
		String type = request.getParameter("type");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		Page page = new Page();
		Map paramsMap = new HashMap();
		paramsMap.put("objname", objname);
		paramsMap.put("leixing", leixing);
		paramsMap.put("type", type);
		paramsMap.put("sort", "order by "+sort+" "+order);
		String pageNo = (String) this.request.getParameter("page");
		String pageSizes = (String) this.request.getParameter("rows");
		if (pageNo == null) {
			page.setPageSize(10);
			page.setPageNo(1);
		} else {
			page.setPageSize(Integer.parseInt(pageSizes));
			page.setPageNo(Integer.parseInt(pageNo));
		}
		page = chooseService.findByPage(page, paramsMap);
		Gson json = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		render(json.toJson(map));		
	}
	
	
	public void add(){
		String action = request.getParameter("action");
		if(choose != null){
			if(img != null){
				String filename = upload();
				choose.setImg(filename);
			}
			if(action.equals("add")){
				chooseService.save(choose);
				render("操作成功!");
			}else {
				String id = request.getParameter("id");
				choose.setId(Integer.parseInt(id));
				chooseService.update(choose);
				render("操作成功!");
			}
		}		
	}
	
	public void deleteItem(){
		String id = request.getParameter("id");
		chooseService.delete(Integer.parseInt(id));
		render("操作成功");
	}
	

}
