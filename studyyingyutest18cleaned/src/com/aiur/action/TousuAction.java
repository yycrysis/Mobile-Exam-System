package com.aiur.action;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;


import org.springframework.stereotype.Controller;

import com.aiur.model.Tousu;
import com.aiur.service.TousuService;
import com.aiur.util.GetNowTime;
import com.aiur.util.IdeaAction;
import com.aiur.util.Page;
import com.google.gson.Gson;
//成绩
@Controller
public class TousuAction extends IdeaAction {
	@Resource
	private TousuService tousuService;
	private static final long serialVersionUID = -3218238026025256103L;
	private Tousu tousu;
	public Tousu getTousu() {
		return tousu;
	}

	public void setTousu(Tousu tousu) {
		this.tousu = tousu;
	}

	public String tousu(){
		return SUCCESS;
	}
	
	public void getList(){
		String tousuname = request.getParameter("sgname");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		Page page = new Page();
		Map paramsMap = new HashMap();
		paramsMap.put("tousuname", tousuname);
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
		page = tousuService.findByPage(page, paramsMap);
		Gson json = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		render(json.toJson(map));		
	}
	
	public void add(){
		String action = request.getParameter("action");
		if(tousu != null){
			if(action.equals("add")){
				tousuService.save(tousu);
				render("操作成功!");
			}else {
				String id = request.getParameter("id");
				tousu.setId(Integer.parseInt(id));
				tousuService.update(tousu);
				render("操作成功!");
			}
		}		
	}
	
	public void deleteItem(){
		String id = request.getParameter("id");
		tousuService.delete(Integer.parseInt(id));
		render("操作成功");
	}
	

}
