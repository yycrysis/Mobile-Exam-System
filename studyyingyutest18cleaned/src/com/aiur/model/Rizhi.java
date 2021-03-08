package com.aiur.model;

/**
 * Bill entity. @author MyEclipse Persistence Tools
 */

public class Rizhi implements java.io.Serializable {

	// Fields

	private Integer id;
	private String title;
	private String uid;
	private String username;
	private String ndate;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getNdate() {
		return ndate;
	}
	public void setNdate(String ndate) {
		this.ndate = ndate;
	}



}