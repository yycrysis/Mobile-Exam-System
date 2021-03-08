package com.aiur.service;

import java.util.List;
import java.util.Map;

import com.aiur.model.Posts;
import com.aiur.util.Page;

public interface PostsService {
	public void save(Posts model);
	public void update(Posts model);
	public Posts find(String uuid);
	public Posts find(Posts model);
	public void delete(Integer uuid);
	public List<Posts> list();
	public Page findByPage(Page page,Map paramsMap);
}
