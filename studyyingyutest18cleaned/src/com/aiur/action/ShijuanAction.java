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

import com.aiur.model.Shijuan;
import com.aiur.service.BaseService;
import com.aiur.service.ShijuanService;
import com.aiur.util.GetNowTime;
import com.aiur.util.IdeaAction;
import com.aiur.util.Page;
import com.google.gson.Gson;
//试卷
@Controller
public class ShijuanAction extends IdeaAction {
	@Resource
	private ShijuanService shijuanService;
	@Resource
	private BaseService baseService;
	private static final long serialVersionUID = -3218238026025256103L;
	private Shijuan shijuan;
	public Shijuan getShijuan() {
		return shijuan;
	}

	public void setShijuan(Shijuan shijuan) {
		this.shijuan = shijuan;
	}

	public String shijuan(){
		return SUCCESS;
	}
	/*******************************上传相关属性************************/
	private File img;
	private String uploadFileName;
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
		String fileName = uuid+".gif";
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
		String shijuanname = request.getParameter("sshijuanname");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		Page page = new Page();
		Map paramsMap = new HashMap();
		paramsMap.put("shijuanname", shijuanname);
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
		page = shijuanService.findByPage(page, paramsMap);
		Gson json = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		render(json.toJson(map));		
	}
	
	
	public void add(){
		String action = request.getParameter("action");
		if(shijuan != null){
			if(action.equals("add")){
				shijuanService.save(shijuan);
				render("操作成功!");
			}else {
				String id = request.getParameter("id");
				shijuan.setId(Integer.parseInt(id));
				shijuanService.update(shijuan);
				render("操作成功!");
			}
		}		
	}
	
	public void deleteItem(){
		String id = request.getParameter("id");
		shijuanService.delete(Integer.parseInt(id));
		render("操作成功");
	}
	
	public void updateShijuanChoose(){
		String id = request.getParameter("id");
		Shijuan sj = (Shijuan) baseService.find(Integer.parseInt(id), Shijuan.class);
		String cids = request.getParameter("cids");
		sj.setCids(cids);
		baseService.update(sj);
		render("0");
	}
	

}
