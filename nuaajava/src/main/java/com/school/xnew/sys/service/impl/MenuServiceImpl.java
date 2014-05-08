
package com.school.xnew.sys.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.school.xnew.biz.dto.MenuDto;
import com.school.xnew.persistence.dao.MenuDao;
import com.school.xnew.persistence.entity.MenuModel;
import com.school.xnew.sys.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService {
	@Resource
	private MenuDao	menuDao;

	@Override
	public List<MenuDto> getMenuDto() {
		List<MenuModel> menuModel = menuDao.getMenu();
		List<MenuDto> menuDtoList = menuModel2MenuDto(menuModel, null);
		return menuDtoList;
	}

	private List<MenuDto> menuModel2MenuDto(List<MenuModel> menuModelList, List<MenuDto> menuDtoList) {
		if (menuDtoList == null) {
			menuDtoList = new ArrayList<MenuDto>();
		}
		for (MenuModel model : menuModelList) {
			Integer parentId = model.getParentId();
			if (parentId == null || parentId == 0) {
				MenuDto menuDto = menuModel2MenuDto(model);
				menuDtoList.add(menuDto);
			} else {
				addOneMenuModel2MenuDtoList(model, menuDtoList);
			}
		}
		return menuDtoList;
	}

	private MenuDto menuModel2MenuDto(MenuModel menuModel) {
		MenuDto menuDto = new MenuDto();
		menuDto.setId(menuModel.getId());
		menuDto.setName(menuModel.getName());
		menuDto.setParentId(menuModel.getParentId());
		menuDto.setAction(menuModel.getAction());
		menuDto.setImg(menuModel.getImg());
		menuDto.setSorting(menuModel.getSorting());
		menuDto.setSystemId(menuModel.getSystemId());
		menuDto.setTip(menuModel.getTip());
		menuDto.setType(menuModel.getType());
		return menuDto;
	}

	private List<MenuDto> addOneMenuModel2MenuDtoList(MenuModel model, List<MenuDto> menuDtoList) {
		if (menuDtoList == null) {
			return null;
		}
		for (MenuDto menuDto : menuDtoList) {
			Integer id = menuDto.getId();
			List<MenuDto> childMenu = menuDto.getChildMenu();
			if (id == model.getParentId()) {
				if (childMenu == null) {
					childMenu = new ArrayList<MenuDto>();
				}
				MenuDto menuDtoObj = menuModel2MenuDto(model);
				childMenu.add(menuDtoObj);
				menuDto.setChildMenu(childMenu);
			} else {
				addOneMenuModel2MenuDtoList(model, childMenu);
			}
		}
		return menuDtoList;
	}

}
