package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Shijuan;
import com.aiur.util.Page;

public interface ShijuanService {
	public void save(Shijuan model);
	public void update(Shijuan model);
	public Shijuan find(String uuid);
	public Shijuan find(Shijuan model);
	public void delete(Integer uuid);
	public List<Shijuan> list();
	public List<Shijuan> list(Shijuan model);
	public Page findByPage(Page page,Map paramsMap);
}
