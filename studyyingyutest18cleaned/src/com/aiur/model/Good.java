package com.aiur.model;

/**
 * Good entity. @author MyEclipse Persistence Tools
 */

public class Good implements java.io.Serializable,Comparable<Good> {

	// Fields

	private Integer id;
	private String gname;
	private String price;
	private String jifen;
	private String note;
	private String type;
	private String img;
	private Integer count;
	private String typeid;
	private Integer xiaoliang;
	private String shop;
	private String sid;
	private String ownid;
	private String saleType;
	private String mcount;
	private String sale;
	private String tel;
	private Integer shouye;
	private Integer zan;
	private String address;
	private Integer dtype;
	private Integer tempf;
	private Integer tempt;
	private String btype;
	
	
	
	
	
	
	
	

	// Constructors

	public Integer getTempf() {
		return tempf;
	}

	public void setTempf(Integer tempf) {
		this.tempf = tempf;
	}

	public Integer getTempt() {
		return tempt;
	}

	public void setTempt(Integer tempt) {
		this.tempt = tempt;
	}

	public Integer getDtype() {
		return dtype;
	}

	public void setDtype(Integer dtype) {
		this.dtype = dtype;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Integer getZan() {
		return zan;
	}

	public void setZan(Integer zan) {
		this.zan = zan;
	}

	public Integer getShouye() {
		return shouye;
	}

	public void setShouye(Integer shouye) {
		this.shouye = shouye;
	}

	public String getSale() {
		return sale;
	}

	public void setSale(String sale) {
		this.sale = sale;
	}

	public String getSaleType() {
		return saleType;
	}

	public void setSaleType(String saleType) {
		this.saleType = saleType;
	}

	public String getMcount() {
		return mcount;
	}

	public void setMcount(String mcount) {
		this.mcount = mcount;
	}

	public String getShop() {
		return shop;
	}

	public void setShop(String shop) {
		this.shop = shop;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getOwnid() {
		return ownid;
	}

	public void setOwnid(String ownid) {
		this.ownid = ownid;
	}

	/** default constructor */
	public Good() {
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGname() {
		return this.gname;
	}

	public void setGname(String gname) {
		this.gname = gname;
	}

	public String getPrice() {
		return this.price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getJifen() {
		return this.jifen;
	}

	public void setJifen(String jifen) {
		this.jifen = jifen;
	}

	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getImg() {
		return this.img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getTypeid() {
		return this.typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

	public Integer getXiaoliang() {
		return this.xiaoliang;
	}

	public void setXiaoliang(Integer xiaoliang) {
		this.xiaoliang = xiaoliang;
	}
	
	

	public String getBtype() {
		return btype;
	}

	public void setBtype(String btype) {
		this.btype = btype;
	}



	@Override
	public int compareTo(Good o) {
		// TODO Auto-generated method stub
		if(this.xiaoliang==null){
			this.xiaoliang=0;
		}
		if(o.xiaoliang==null){
			o.xiaoliang=0;
		}
		return o.xiaoliang-this.xiaoliang;
	}

}