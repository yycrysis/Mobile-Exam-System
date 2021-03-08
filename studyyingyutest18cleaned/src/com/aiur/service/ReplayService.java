package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Replay;
import com.aiur.util.Page;

public interface ReplayService {
	public void save(Replay model);
	public void update(Replay model);
	public Replay find(String uuid);
	public Replay find(Replay model);
	public void delete(Integer uuid);
	public List<Replay> list();
	public List<Replay> list(Replay model);
	public Page findByPage(Page page,Map paramsMap);
}
