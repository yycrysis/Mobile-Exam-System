package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Notice;
import com.aiur.util.Page;

public interface NoticeService {
	public void save(Notice model);
	public void update(Notice model);
	public Notice find(String uuid);
	public Notice find(Notice model);
	public void delete(Integer uuid);
	public List<Notice> list();
	public List<Notice> list(Notice model);
	public Page findByPage(Page page,Map paramsMap);
}
