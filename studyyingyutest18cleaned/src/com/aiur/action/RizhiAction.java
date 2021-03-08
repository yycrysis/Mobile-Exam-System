package com.aiur.action;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.aiur.model.Rizhi;
import com.aiur.service.BaseService;
import com.aiur.service.RizhiService;
import com.aiur.util.IdeaAction;
import com.aiur.util.Page;
import com.google.gson.Gson;
//日志
@Controller
public class RizhiAction extends IdeaAction {
	@Resource
	private RizhiService rizhiService;
	@Resource
	private BaseService baseService;
	private static final long serialVersionUID = -3218238026025256103L;
	private Rizhi rizhi;
	public Rizhi getRizhi() {
		return rizhi;
	}

	public void setRizhi(Rizhi rizhi) {
		this.rizhi = rizhi;
	}

	public String rizhi(){
		return SUCCESS;
	}
	
	public void getList(){
		String rizhiname = request.getParameter("sgname");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		Page page = new Page();
		Map paramsMap = new HashMap();
        String roletype = (String) session.get("roletype");
        if(roletype.equals("3")){
            String sid = (String) session.get("sid");
            paramsMap.put("sid",sid);
        }
		paramsMap.put("rizhiname", rizhiname);
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
		page = rizhiService.findByPage(page, paramsMap);
		Gson json = new Gson();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", page.getTotal());
		map.put("rows", page.getList());
		render(json.toJson(map));		
	}
	
	public void add(){
		String action = request.getParameter("action");
		if(rizhi != null){
			if(action.equals("add")){
				rizhiService.save(rizhi);
				render("操作成功!");
			}else {
				String id = request.getParameter("id");
				rizhi.setId(Integer.parseInt(id));
				rizhiService.update(rizhi);
				render("操作成功!");
			}
		}		
	}
	
	public void deleteItem(){
		String id = request.getParameter("id");
		rizhiService.delete(Integer.parseInt(id));
		render("操作成功");
	}
	
	public void jiaohao(){
		String bid = request.getParameter("bid");
		String statecn = request.getParameter("statecn");
		baseService.excute("delete Line t where t.bid = "+bid);
		Rizhi b = (Rizhi) baseService.find(Integer.parseInt(bid), Rizhi.class);

		baseService.update(b);
		render("success");
	}

		
}
