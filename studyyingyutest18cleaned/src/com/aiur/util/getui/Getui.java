package com.aiur.util.getui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.gexin.rp.sdk.base.IPushResult;
import com.gexin.rp.sdk.base.impl.AppMessage;
import com.gexin.rp.sdk.base.impl.SingleMessage;
import com.gexin.rp.sdk.base.impl.Target;
import com.gexin.rp.sdk.http.IGtPush;
import com.gexin.rp.sdk.template.NotificationTemplate;

public class Getui {
	static String appId = "MIh61iVanN6nf68hv1KkI8";
	static String appkey = "PfpFZ3K2Ny8nO9CdKJvqk3";
	static String master = "WWcP8gLcqU6EkWdGmnJJl9";
	static String CID = "040e8e6f304f94cfadcf6099a7f171c7";
	static String Alias = ""; // 根据别名推送，需要先绑定别名，请参考alias_bind_unbind.java

	static String host = "http://sdk.open.api.igexin.com/apiex.htm";
	
//	public static void main(String[] args) {
//		sendToAll();
//		//sendToClient();
//	}
	
	public static NotificationTemplate NotificationTemplateDemo(String title ,String note){
		NotificationTemplate template = new NotificationTemplate();
		template.setAppId(appId);
		template.setAppkey(appkey);
		template.setTitle(title);
		template.setText(note);
		template.setLogo("icon.png");
		// template.setLogoUrl("");
		// template.setIsRing(true);
		// template.setIsVibrate(true);
		// template.setIsClearable(true);
		template.setTransmissionType(1);
		template.setTransmissionContent("dddd");
		// template.setPushInfo("actionLocKey", 2, "message", "sound",
		// "payload", "locKey", "locArgs", "launchImage");
		return template;
	}
	
	public static void sendToClient(String title,String note,String cid){
		IGtPush push = new IGtPush(host, appkey, master);
		try {
			push.connect();
			//TransmissionTemplate template = TransmissionTemplateDemo();
			// LinkTemplate template = linkTemplateDemo();
			 NotificationTemplate template = NotificationTemplateDemo(title,note);
			// NotyPopLoadTemplate template =NotyPopLoadTemplateDemo();

			SingleMessage message = new SingleMessage();
			message.setOffline(true);
			message.setOfflineExpireTime(1 * 1000 * 3600);
			message.setData(template);
//			message.setPushNetWorkType(1); //根据WIFI推送设置

			List<Target> targets = new ArrayList<Target>();
			Target target1 = new Target();
			Target target2 = new Target();
			target1.setAppId(appId);
			target1.setClientId(cid);
			// target1.setAlias(Alias);	//根据别名推送设置，CID与Alias可二选一进行推送

			IPushResult ret = push.pushMessageToSingle(message, target1);
			System.out.println(ret.getResponse().toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void sendToAll(String title,String note){
		IGtPush push = new IGtPush(host, appkey, master);
		try {
			push.connect();
//			TransmissionTemplate template = TransmissionTemplateDemo();
			NotificationTemplate template = NotificationTemplateDemo(title,note);
			AppMessage message = new AppMessage();
			message.setData(template);

			message.setOffline(true);
			message.setOfflineExpireTime(1 * 1000 * 3600);

			List<String> appIdList = new ArrayList<String>();
			List<String> phoneTypeList = new ArrayList<String>();
			List<String> provinceList = new ArrayList<String>();
			List<String> tagList = new ArrayList<String>();

			appIdList.add(appId);
			phoneTypeList.add("ANDROID");
			 //provinceList.add("浙江省");
			//tagList.add("推送");

			message.setAppIdList(appIdList);
			message.setPhoneTypeList(phoneTypeList);
//			message.setProvinceList(provinceList);
//			message.setTagList(tagList);
			//message.setPushNetWorkType(1);
			IPushResult ret = push.pushMessageToApp(message,"任务别名可为空");
			System.out.println(ret.getResponse().toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
