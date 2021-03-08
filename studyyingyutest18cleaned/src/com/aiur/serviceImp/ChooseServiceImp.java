package com.aiur.serviceImp;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.aiur.model.Choose;
import com.aiur.service.ChooseService;
import com.aiur.util.Page;

@Service
@Transactional
public class ChooseServiceImp implements ChooseService {
	@Resource(name = "sessionFactory")
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Resource(name = "hibernateTemplate")
	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	public void delete(Integer uuid) {
		sessionFactory.getCurrentSession().delete(
				sessionFactory.getCurrentSession().load(Choose.class, uuid));
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED)
	public Choose find(String uuid) {
		return (Choose) sessionFactory.getCurrentSession().get(Choose.class, Integer.parseInt(uuid));

	}
//题目查找
	@Transactional(propagation = Propagation.NOT_SUPPORTED)
	public Choose find(Choose model) {
		try {
			List<Choose> list = getHibernateTemplate().findByExample(model);
			if (list.size() > 0) {
				return list.get(0);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
//题目列表
	@SuppressWarnings("unchecked")
	@Transactional(propagation = Propagation.NOT_SUPPORTED)
	public List<Choose> list() {
		return sessionFactory.getCurrentSession().createQuery("from Choose").list();
	}
//题目增加
	public void save(Choose model) {
		try {
			sessionFactory.getCurrentSession().persist(model);
			// getHibernateTemplate().save(model);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
//题目修改
	public void update(Choose model) {
		sessionFactory.getCurrentSession().merge(model);
		// getHibernateTemplate().update(teacher);
	}

	/**
	 * 分页查询，传入查询条件和page对象
	 */
	@Override
	@Transactional(propagation = Propagation.NOT_SUPPORTED)
	public Page findByPage(Page page, Map paramsMap) {
		StringBuffer sb = new StringBuffer();
		sb.append("from Choose u where 1=1");
		if (paramsMap.get("postsname") != null&& !"".equals(paramsMap.get("postsname"))) {
			sb.append(" and u.postsname like '%" + paramsMap.get("postsname")+ "%'");
		}
		if (paramsMap.get("leixing") != null&& !"".equals(paramsMap.get("leixing"))) {
			sb.append(" and u.leixing = " + paramsMap.get("leixing"));
		}
		if (paramsMap.get("sort") != null && !"".equals(paramsMap.get("sort"))) {
			sb.append(" " + paramsMap.get("sort"));
		}
		System.out.println(sb.toString());
		List teaList = (sessionFactory.getCurrentSession().createQuery(sb
				.toString())).list();
		int totl = teaList.size();
		Query query = sessionFactory.getCurrentSession().createQuery(
				sb.toString());
		query.setFirstResult((page.getPageNo() - 1) * page.getPageSize());
		query.setMaxResults(page.getPageSize());
		List employeeList = query.list();
		page.setList(employeeList);
		page.setTotal(totl);
		return page;
	}
}
