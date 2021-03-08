package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Type;
import com.aiur.util.Page;

public interface TypeService {
	public void save(Type model);
	public void update(Type model);
	public Type find(String uuid);
	public Type find(Type model);
	public void delete(Integer uuid);
	public List<Type> list();
	public Page findByPage(Page page,Map paramsMap);
}
