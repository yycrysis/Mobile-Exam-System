package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Choose;
import com.aiur.util.Page;

public interface ChooseService {
	public void save(Choose model);
	public void update(Choose model);
	public Choose find(String uuid);
	public Choose find(Choose model);
	public void delete(Integer uuid);
	public List<Choose> list();
	public Page findByPage(Page page,Map paramsMap);
}
