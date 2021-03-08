package com.aiur.action;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.annotation.Resource;
import javax.swing.*;

import org.springframework.stereotype.Controller;

import com.aiur.model.Good;
import com.aiur.model.Notice;
import com.aiur.model.Posts;
import com.aiur.model.Replay;
import com.aiur.model.Rizhi;
import com.aiur.model.Shijuan;
import com.aiur.model.Tousu;
import com.aiur.model.User;
import com.aiur.service.BaseService;
import com.aiur.service.GoodService;
import com.aiur.service.NoticeService;
import com.aiur.service.ReplayService;
import com.aiur.service.TypeService;
import com.aiur.service.UserService;
import com.aiur.util.GetNowTime;
import com.aiur.util.HttpClientTools;
import com.aiur.util.IdeaAction;
import com.aiur.util.getui.Getui;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;






@Controller
public class WehallAction extends IdeaAction {
    @Resource
    private BaseService baseService;

    @Resource
    private GoodService goodService;

    @Resource
    private TypeService typeService;
    @Resource
    private UserService userService;
    @Resource
    private ReplayService replayService;
    @Resource
    private NoticeService noticeService;
 
    public Gson gson = new Gson();
    private static final long serialVersionUID = -3218238026025256103L;

    public String wehall(){
//		String openid = request.getParameter("openid");
//		session.put("openid", openid);
        return SUCCESS;
    }

    public void login(){
        String username = request.getParameter("username");
        String passwd = request.getParameter("passwd");
        User user = new User();
        user.setPasswd(passwd);
        user.setUsername(encodeGet(username));
        User r = userService.find(user);
        if(r!=null){
        	session.put("user", r);
            renderJsonpObj(r);
        }else{
            renderJsonpString("fail");
        }
    }
    
    public void checkSession(){
    	Object obj = session.get("user");
    	if(obj!=null){
    		renderJsonpObj(obj);
    	}else{
    		renderJsonpString("fail");
    	}
    }
    
    public void clearSession(){
    	session.clear();
    }

    public void checkUser(){
        User u = new User();
        String username = request.getParameter("username");
        u.setUsername(username);
        User r = userService.find(u);
        if(r!=null){
            renderJsonpString("fail");
        }else{
            renderJsonpString("success");
        }
    }

    public void updateUser(){
        String tel = request.getParameter("tel");
        String qq = request.getParameter("qq");
        String wechat = request.getParameter("wechat");
        String email = request.getParameter("email");
        String birth = request.getParameter("birth");
        String sex = request.getParameter("sex");
        String id = request.getParameter("id");

        User user = userService.find(id);

        user.setId(Integer.parseInt(id));
        user.setTel(tel);
        user.setWechat(wechat);
        user.setQq(qq);
        user.setEmail(email);
        user.setBirth(birth);
        user.setSex(encodeGet(sex));
        user.setAddress(encodeGet(request.getParameter("address")));

        userService.update(user);
        renderJsonpObj(user);
    }

    public void changePasswd(){
        String passwd = request.getParameter("passwd");
        String id = request.getParameter("id");
        User user = userService.find(id);
        user.setPasswd(passwd);
        userService.update(user);
        renderJsonpString("success");
    }

    public void register(){
    	User user = (User) getByRequest(new User(), true);

        String roletype = "2";

        user.setRoletype(roletype);
  
        //user.setSid(sid);
        userService.save(user);

        renderJsonpString("success");
    }


    public void listGood(){
    	String dtype = request.getParameter("dtype");
    	String btype = request.getParameter("btype");
    	String temp = request.getParameter("temp");
        String type = request.getParameter("stype");
        String sid = request.getParameter("sid");
        String title = request.getParameter("stitle");
        String sort = request.getParameter("order");
        title = encodeGet(title);
        String hql = "from Good t where 1=1";
        if (type != null&& !"".equals(type)) {
            hql+=" and t.typeid="+type;

        }
        if(sid != null&& !"".equals(sid)){
            hql+=" and t.sid="+sid;
        }
        if(title != null&& !"".equals(title)){
            hql+=" and t.gname='"+title+"'";
        }
        if(dtype != null&& !"".equals(dtype)){
            hql+=" and t.dtype="+dtype;
        }
        if(btype != null&& !"".equals(btype)){
            hql+=" and t.btype='"+btype+"'";
        }
        if(temp != null&& !"".equals(temp)){
            hql+=" and t.tempf<"+temp+" and t.tempt>"+temp;
        }
        if(sort != null&& !"".equals(sort)){
            hql+=" order by "+sort+" desc";
        }else{
        	hql+=" order by xiaoliang desc";
        }
        /*ArrayList<Good> list = (ArrayList<Good>) goodService.queryObj(g);
        Collections.sort(list);*/
        renderJsonpObj(baseService.list(hql));
    }

    public void listType(){
        renderJsonpObj(typeService.list());
    }







    public void deleteGood(){
        String id = request.getParameter("id");
        goodService.delete(Integer.parseInt(id));
        renderJsonpString("success");
    }
 
    public void listReplay(){
    	String hql = "from Replay t where 1=1";
    	String pid = request.getParameter("pid");
    	String type = request.getParameter("type");
    	if(type!=null && !type.equals("")){
    		hql+=" and t.type="+type;
    	}
    	hql+=" and t.pid='"+pid+"'";
        renderJsonpObj(baseService.list(hql));
    }
    public void listNotice(){
        renderJsonpObj(noticeService.list());
    }
 
    
    public void addReplay(){
    	Replay m = (Replay) getByRequest(new Replay(), true);

    	String ndate = GetNowTime.getNowTimeEn();
    	m.setNdate(ndate);
    	replayService.save(m);
    	renderJsonpString("success");
    }
    
    public void getShouye(){
        Good g = new Good();
        g.setShouye(1);
        renderJsonpObj(goodService.list(g));
    }
    
    public void listBillGoods(){
    	String gids = request.getParameter("gids");
    	String hql = "from Good u where u.id in ("+gids+")";
    	renderJsonpObj(goodService.list(hql));
    }
    

    

    
    public void listAddress(){
    	String uid = request.getParameter("uid");
    	renderJsonpObj(baseService.list("from Address t where t.uid = "+uid));
    }
    


    
    public void saveGood(){
    	String action  = request.getParameter("action");
    	Good info = (Good) getByRequest(new Good(), true);
    	if(action!=null && action.equals("edit")){
    		baseService.update(info);
    	}else{
    		baseService.save(info);
    	}
        renderJsonpString("success");
    }
    
    public void delGood(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Good.class);
    	renderJsonpString("0");
    }
    
    public void saveNotice(){
    	Notice info = (Notice) getByRequest(new Notice(), true);
    	baseService.save(info);
        renderJsonpString("success");
    }
    
    public void delNotice(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Notice.class);
    	renderJsonpString("0");
    }
    
    public void zan(){
    	String id = request.getParameter("id");
    	Good g = (Good) baseService.find(Integer.parseInt(id), Good.class);
    	Integer zan = g.getZan();
    	if(zan!=null){
    		zan++;
    	}else{
    		zan = 1;
    	}
    	g.setZan(zan);
    	baseService.update(g);
    	renderJsonpString(zan+"");
    }
    public void delPosts(){
    	String id = request.getParameter("id");
    	baseService.delete(Integer.parseInt(id), Posts.class);
    	renderJsonpString("success");
    }
    public void zan2(){
    	String id = request.getParameter("id");
    	Posts g = (Posts) baseService.find(Integer.parseInt(id), Posts.class);
    	Integer zan = g.getZan();
    	if(zan!=null){
    		zan++;
    	}else{
    		zan = 1;
    	}
    	g.setZan(zan);
    	baseService.update(g);
    	renderJsonpString(zan+"");
    }
    
    public void saveTousu(){
    	Tousu t = (Tousu) getByRequest(new Tousu(), true);
    	t.setNdate(GetNowTime.getNowTimeEn());
    	baseService.save(t);
    	renderJsonpString("0");
    }
    public void saveRizhi(){
    	Rizhi t = (Rizhi) getByRequest(new Rizhi(), true);
    	t.setNdate(GetNowTime.getNowTimeEn());
    	baseService.save(t);
    	renderJsonpString("0");
    }
    
    public void listRizhi(){
    	String hql = "from Rizhi t where 1=1";
    	String uid = request.getParameter("uid");
    	if(notNull(uid)){
    		hql+=" and t.uid='"+uid+"'";
    	}
    	renderJsonpObj(baseService.list(hql));
    }
    
    public void getGood(){
    	String id = request.getParameter("id");
    	Good g = (Good) baseService.find(Integer.parseInt(id), Good.class);
    	renderJsonpObj(g);
    }
    public void sendToClient(){
		String title = request.getParameter("title");
		String note = request.getParameter("note");
		String cid = request.getParameter("cid");
		Getui.sendToClient(title, note, cid);
		renderJsonpString("success");
	}
	
	public void sendToAll(){
		String title = request.getParameter("title");
		String note = request.getParameter("note");
		Getui.sendToAll(title, note);
		renderJsonpString("success");
	}
	public void bindClient() {
		String uid = request.getParameter("uid");
		String clientid = request.getParameter("clientid");
		User user = userService.find(uid);
		if(user!=null){
			user.setClientId(clientid);
			userService.update(user);
			renderJsonpString("success");
		}else{
			renderJsonpString("fail");
		}		
	}
	
	public void addPosts(){
		Posts p = (Posts) getByRequest(new Posts(), true);

    	String ndate = GetNowTime.getNowTimeEn();

    	p.setNdate(ndate);

    	baseService.save(p);
    	renderJsonpString("success");
    }
    public void listPosts(){
        renderJsonpObj(baseService.list("from Posts"));
    }
    
    public void listVideo(){
    	String hql = "from Video t where 1=1";
    	String type = request.getParameter("type");
    	if(notNull(type)){
    		hql+=" and t.type='"+type+"'";
    	}
    	renderJsonpObj(baseService.list(hql));
    }
    
    public void getWeather(){
    	try {
    		String city = request.getParameter("city");
    		city = encodeGet(city);
			city = URLEncoder.encode(city,"utf-8");
			String url = "http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=W6eQXHTZjNf7QTG9k9Mpboez";		
			String r = HttpClientTools.get(url);
		
			renderJsonpString(r);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    
    public void getChoose(){
    	String hql = "from Choose t where 1=1";
    	String type = request.getParameter("type");
    	String shijuanid = request.getParameter("shijuanid");
    	if(shijuanid!=null && !shijuanid.equals("")){
    		Shijuan sj = (Shijuan) baseService.find(Integer.parseInt(shijuanid), Shijuan.class);
        	String cids = sj.getCids();
        	hql += " and t.id in ("+cids+")";
    	}else if(type!=null && !type.equals("")){
    		hql+=" and t.typeid="+type;
    	}
    	renderJsonpObj(baseService.list(hql));
    }
    
    public void getPdt(){
    	String hql = "from Pdt t where 1=1";
    	String type = request.getParameter("type");
    	if(type!=null && !type.equals("")){
    		hql+=" and t.typeid="+type;
    	}
    	renderJsonpObj(baseService.list(hql));
    }
    
    public void saveToFavs(){
    	User u = (User) baseService.find(Integer.parseInt(request.getParameter("uid")), User.class);
    	String favs = request.getParameter("favs");
    	u.setFavs(favs);
    	baseService.update(u);
    	renderJsonpObj(u);
    }
    
    public void saveToCuotis(){
    	User u = (User) baseService.find(Integer.parseInt(request.getParameter("uid")), User.class);
    	String cuotis = request.getParameter("cuotis");
    	u.setCuotis(cuotis);
    	baseService.update(u);
    	renderJsonpObj(u);
    }
    
    public void listMyFavs(){
    	User u = (User) baseService.find(Integer.parseInt(request.getParameter("uid")), User.class);
    	String favs = u.getFavs();
    	if(favs!=null && !favs.equals("")){
    		String hql = "from Choose t where t.id in ("+favs+")";
    		renderJsonpObj(baseService.list(hql));
    	}else{
    		renderJsonpObj(null);
    	}
    }
    public void listMyCuotis(){
    	User u = (User) baseService.find(Integer.parseInt(request.getParameter("uid")), User.class);
    	String favs = u.getCuotis();
    	if(favs!=null && !favs.equals("")){
    		String hql = "from Choose t where t.id in ("+favs+")";
    		renderJsonpObj(baseService.list(hql));
    	}else{
    		renderJsonpObj(null);
    	}
    }
    
    
    public void listShijuan(){
    	String hql = "from Shijuan t where 1=1";
    	String type = request.getParameter("type");
    	if(notNull(type)){
    		hql+=" and t.type='"+type+"'";
    	}
    	renderJsonpObj(baseService.list(hql));
    }
    
    public void getShijuanChoose(){
    	String id = request.getParameter("id");
    	Shijuan sj = (Shijuan) baseService.find(Integer.parseInt(id), Shijuan.class);
    	String cids = sj.getCids();
    	String hql = "from Choose t where 1=1 and t.id in ("+cids+")";
    	renderJsonpObj(baseService.list(hql));
    }
    
}
