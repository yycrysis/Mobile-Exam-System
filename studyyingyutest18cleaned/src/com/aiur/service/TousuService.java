package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Tousu;
import com.aiur.util.Page;

public interface TousuService {
	public void save(Tousu model);
	public void update(Tousu model);
	public Tousu find(String uuid);
	public Tousu find(Tousu model);
	public void delete(Integer uuid);
	public List<Tousu> list();
	public List<Tousu> list(Tousu model);
	public Page findByPage(Page page,Map paramsMap);
}
