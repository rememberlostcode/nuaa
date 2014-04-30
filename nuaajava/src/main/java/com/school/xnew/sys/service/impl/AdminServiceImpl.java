/**
 * 
 */

package com.school.xnew.sys.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.lost.commons.lang.BusinessException;
import org.lost.finder.core.id.ManagementSystem;
import org.lost.finder.core.id.Menu;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.school.xnew.biz.dto.RtnMenuValue;
import com.school.xnew.persistence.dao.CoreMenuDao;
import com.school.xnew.persistence.dao.CoreSystemDao;
import com.school.xnew.persistence.dao.CoreUserDao;
import com.school.xnew.persistence.dao.User2MenuDao;
import com.school.xnew.persistence.entity.CoreMenuModel;
import com.school.xnew.persistence.entity.CoreSystemModel;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.persistence.entity.User2MenuModel;
import com.school.xnew.sys.service.AdminService;
import com.school.xnew.sys.service.User;

/**
 * 
 * 类说明：
 * 
 * @author robin 2014-3-12上午10:49:14
 * 
 */
@Service
public class AdminServiceImpl implements AdminService {

	@Resource
	private CoreMenuDao		coreMenuDao;

	@Resource
	private CoreUserDao		coreUserDao;

	@Resource
	private User2MenuDao	user2MenuDao;

	@Resource
	private CoreSystemDao	coreSystemDao;

	@Override
	public List<Menu> getMenus() {

		List<CoreMenuModel> coreMenuEntities = coreMenuDao.findAll();
		List<Menu> list = new ArrayList<Menu>();
		if (coreMenuEntities != null && !coreMenuEntities.isEmpty()) {
			for (CoreMenuModel coreMenuEntity : coreMenuEntities) {
				if (coreMenuEntity != null
						&& (coreMenuEntity.getParentId() == null || coreMenuEntity.getParentId()
																					.intValue() == 0)) {
					Menu menu = new Menu();
					BeanUtils.copyProperties(coreMenuEntity, menu);
					list.add(menu);
				}

			}
			Collections.sort(list, new Comparator<Menu>() {
				@Override
				public int compare(Menu arg0, Menu arg1) {
					return arg0.getSorting() - arg1.getSorting();
				}
			});
		}

		fillSubMenus(list);

		return list;
	}

	@Override
	public List<RtnMenuValue> getMenuValuesByUserId(Integer userId) throws BusinessException {
		List<CoreMenuModel> coreMenuEntities = coreMenuDao.getMenusByUserId(userId);
		List<Menu> list = new ArrayList<Menu>();
		Set<Integer> menuIdSet = new HashSet<Integer>();
		if (coreMenuEntities != null && !coreMenuEntities.isEmpty()) {
			for (CoreMenuModel coreMenuEntity : coreMenuEntities) {
				if (coreMenuEntity != null
						&& (coreMenuEntity.getParentId() == null || coreMenuEntity.getParentId()
																					.intValue() == 0)) {
					Menu menu = new Menu();
					BeanUtils.copyProperties(coreMenuEntity, menu);
					list.add(menu);
				}
				if (coreMenuEntity.getType() != null && coreMenuEntity.getType().equals('1')
						&& !"-1".equals(userId)) {// 超级管理员拥有所有菜单权限
					menuIdSet.add(coreMenuEntity.getId());
				}
			}
			Collections.sort(list, new Comparator<Menu>() {
				@Override
				public int compare(Menu arg0, Menu arg1) {
					return arg0.getSorting() - arg1.getSorting();
				}
			});
		}

		List<RtnMenuValue> rtnMenuValues = fillSubRtnMenuValues(list, menuIdSet, userId);

		return rtnMenuValues;
	}

	private List<RtnMenuValue> fillSubRtnMenuValues(List<Menu> menus, Set<Integer> menuIdSet,
			Integer userId) {
		List<RtnMenuValue> rtnMenus = new ArrayList<RtnMenuValue>();
		List<Menu> parentMenus = menus;
		if (parentMenus != null && parentMenus.size() > 0) {
			for (Menu menuEle : parentMenus) {
				RtnMenuValue rtnParent = new RtnMenuValue();
				BeanUtils.copyProperties(menuEle, rtnParent);

				CoreMenuModel exampleCoreMenuEntity = new CoreMenuModel();
				exampleCoreMenuEntity.setParentId(menuEle.getId());
				List<CoreMenuModel> subMenuEntities = coreMenuDao.getModelList(exampleCoreMenuEntity);
				if (subMenuEntities != null && subMenuEntities.size() > 0) {
					List<RtnMenuValue> subMenus = new ArrayList<RtnMenuValue>();
					for (CoreMenuModel subMenuEntity : subMenuEntities) {
						// 超级管理员拥有所有菜单权限
						if (menuIdSet.contains(subMenuEntity.getId())
								|| (userId != null && userId.equals(-1))) {
							CoreMenuModel menuEntityFull = coreMenuDao.getModelById(subMenuEntity.getId());
							if (menuEntityFull != null) {
								RtnMenuValue tmpMenu = new RtnMenuValue();
								BeanUtils.copyProperties(menuEntityFull, tmpMenu);
								subMenus.add(tmpMenu);
							}
						}
					}

					rtnParent.setSubMenus(subMenus);
				}
				rtnMenus.add(rtnParent);
			}
		}
		return rtnMenus;
	}

	@Override
	public void newMenu(Menu menu) throws BusinessException {

		menuCheck(menu);

		CoreMenuModel coreMenuEntity = new CoreMenuModel();
		BeanUtils.copyProperties(menu, coreMenuEntity);
		coreMenuDao.insert(coreMenuEntity);
	}

	@Override
	public void removeMenu(Menu menu) throws BusinessException {

		if (menu.getId() == null)
			return;

		CoreMenuModel coreMenuEntity = new CoreMenuModel();
		coreMenuEntity.setId(menu.getId());
		coreMenuDao.delete(coreMenuEntity);

		User2MenuModel user2MenuModel = new User2MenuModel();
		user2MenuModel.setMenuId(menu.getId());
		user2MenuDao.deleteByModel(user2MenuModel);

	}

	@Override
	public void modifyMenu(Menu menu) throws BusinessException {
		menuCheck(menu);

		CoreMenuModel coreMenuEntity = new CoreMenuModel();
		BeanUtils.copyProperties(menu, coreMenuEntity);
		coreMenuDao.update(coreMenuEntity);

	}

	@Override
	public List<Menu> findMenusByExample(Menu menu) throws BusinessException {
		List<Menu> menus = new ArrayList<Menu>();
		CoreMenuModel exampleCoreMenuEntity = new CoreMenuModel();

		if (menu != null) {
			if (menu.getId() != null)
				exampleCoreMenuEntity.setId(menu.getId());
			if (menu.getName() != null && !"".equals(menu.getName().trim())) {
				menu.setName(menu.getName().trim());
				exampleCoreMenuEntity.setName("%" + menu.getName() + "%");
			}
		}

		List<CoreMenuModel> menuEntities = coreMenuDao.getModelList(exampleCoreMenuEntity);

		if (menuEntities != null && menuEntities.size() > 0) {
			for (CoreMenuModel entity : menuEntities) {

				if (entity != null && (menu.getId() == null || menu.getId().equals(entity.getId()))) {
					Menu tmpMenu = new Menu();
					BeanUtils.copyProperties(entity, tmpMenu);
					menus.add(tmpMenu);
				}
			}
		}

		if (menus != null && menus.size() > 0) {
			fillSubMenus(menus);
		}

		return menus;
	}

	private void fillSubMenus(List<Menu> menus) {
		List<Menu> parentMenus = menus;
		while (parentMenus != null && parentMenus.size() > 0) {
			List<Menu> newParentMenus = new ArrayList<Menu>();
			for (Menu menuEle : parentMenus) {
				CoreMenuModel exampleCoreMenuEntity = new CoreMenuModel();
				exampleCoreMenuEntity.setParentId(menuEle.getId());
				List<CoreMenuModel> subMenuEntities = coreMenuDao.getModelList(exampleCoreMenuEntity);
				if (subMenuEntities != null && subMenuEntities.size() > 0) {
					List<Menu> subMenus = new ArrayList<Menu>();
					for (CoreMenuModel subMenuEntity : subMenuEntities) {
						CoreMenuModel menuEntityFull = coreMenuDao.getModelById(subMenuEntity.getId());
						if (menuEntityFull != null) {
							Menu tmpMenu = new Menu();
							BeanUtils.copyProperties(menuEntityFull, tmpMenu);
							subMenus.add(tmpMenu);
						}
					}

					menuEle.setSubMenus(subMenus);
					newParentMenus.addAll(subMenus);
				}
			}
			parentMenus = newParentMenus;
		}
	}

	private void menuCheck(Menu menu) throws BusinessException {
		Map<String, String> errors = new HashMap<String, String>(2);

		if (menu.getName() == null || "".equals(menu.getName().trim())) {
			errors.put("name", "菜单名称不能为空！");
		} else if (menu.getName().trim().length() > 20) {
			errors.put("name", "菜单名称不能大于20个字符！");
		}

		if (menu.getTip() != null && menu.getTip().trim().length() > 64) {
			errors.put("tip", "菜单描述不能大于64个字符！");
		}

		if (menu.getAction() != null && menu.getAction().trim().length() > 256) {
			errors.put("action", "菜单动作不能大于256个字符！");
		}

		if (menu.getSorting() == null) {
			// errors.put("sorting", "菜单排序不能为空！");
			// 默认排序为1
			menu.setSorting(1);
		}

		if (menu.getSystemId() == null) {
			errors.put("systemid", "菜单的系统ID不能为空！");
		}

		if (menu.getImg() != null && menu.getImg().trim().length() > 256) {
			errors.put("img", "菜单图片不能大于256个字符！");
		}

		if (!errors.isEmpty()) {
			throw new BusinessException(errors);
		}
	}

	@Override
	public List<User> getUsers() throws BusinessException {
		List<User> list = coreUserDao.findAll();
		return list;
	}

	@Override
	public void modifyUser2Menu(User user) throws BusinessException {
		if (user == null || user.getId() == null) {
			throw new BusinessException("用户不存在！");
		}
		CoreUserModel coreUserEntity = new CoreUserModel();
		coreUserEntity.setId(user.getId());

		// 先清除旧的关联关系，后再计算新的关联关系
		User2MenuModel user2MenuModel = new User2MenuModel();
		user2MenuModel.setUserId(user.getId());
		user2MenuDao.deleteByModel(user2MenuModel);

		Set<Integer> menuIds = user.getMenuIds();
		if (menuIds != null && !menuIds.isEmpty()) {
			List<User2MenuModel> user2MenuModelList = new ArrayList<User2MenuModel>();
			Iterator<Integer> it = menuIds.iterator();
			while (it.hasNext()) {
				Integer menuId = it.next();
				if (menuId != null) {
					user2MenuModel = new User2MenuModel();
					user2MenuModel.setUserId(user.getId());
					user2MenuModel.setMenuId(menuId);
					user2MenuModelList.add(user2MenuModel);
				}
			}
			user2MenuDao.batchInsert(user2MenuModelList);
		}

	}

	@Override
	public List<ManagementSystem> getManagementSystems() {
		List<ManagementSystem> result = new ArrayList<ManagementSystem>();
		List<CoreSystemModel> coreSystemList = coreSystemDao.findAll();
		if (coreSystemList != null && !coreSystemList.isEmpty()) {
			for (CoreSystemModel entity : coreSystemList) {
				ManagementSystem system = new ManagementSystem();
				BeanUtils.copyProperties(entity, system);
				result.add(system);
			}
		}
		return result;
	}

	@Override
	public void createUser(CoreUserModel user) throws BusinessException {
		coreUserDao.insert(user);
	}

	@Override
	public void deleteUser(Integer userId) throws BusinessException {
		coreUserDao.deleteById(userId);

		// User2MenuModel user2MenuModel = new User2MenuModel();
		// user2MenuModel.setUserId(userId);
		// user2MenuDao.deleteByModel(user2MenuModel);
	}

	@Override
	public List<User> getUsersByModel(CoreUserModel userModel) {
		if (userModel != null && StringUtils.isNotBlank(userModel.getUsername())) {
			userModel.setUsername("%" + userModel.getUsername() + "%");
		}
		List<User> list = coreUserDao.getUsersByModel(userModel);
		return list;
	}

	@Override
	public List<User2MenuModel> getUser2MenuList(User2MenuModel user2MenuModel)
			throws BusinessException {
		List<User2MenuModel> list = user2MenuDao.getUser2MenuByModel(user2MenuModel);
		if (list != null && !list.isEmpty())
			return list;
		return null;
	}

	@Override
	public List<CoreMenuModel> getMenusByUserId(Integer userId) {
		List<CoreMenuModel> list = coreMenuDao.getMenusByUserId(userId);
		if (list != null && !list.isEmpty())
			return list;
		return null;
	}

	@Override
	public CoreUserModel getUserById(Integer userId) throws BusinessException {
		if (userId != null)
			return coreUserDao.getModelById(userId);
		return null;
	}

	@Override
	public CoreUserModel getUserByUsername(String username) throws BusinessException {
		if (StringUtils.isNotBlank(username))
			return coreUserDao.getUserByUsername(username.trim());
		return null;
	}

}
