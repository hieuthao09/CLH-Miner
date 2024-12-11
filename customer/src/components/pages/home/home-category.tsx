// HomeCategory.tsx

import { useState } from 'react';
import { useGet } from '@hook/queries';
import { CategoryCollectionType } from '@type/collection';
import './HomeCategory.css';

const HomeCategory = () => {
	const categoryQuery = useGet<CategoryCollectionType[]>({ api: 'category' });

	const buildMenuTree = (
		categories: CategoryCollectionType[],
		parentId: number | null = null
	): CategoryCollectionType[] => {
		const menuTree: CategoryCollectionType[] = [];

		categories.forEach(category => {
			if (category.parentId === parentId) {
				const children = buildMenuTree(categories, category.id);
				if (children.length > 0) {
					category.children = children;
				}
				menuTree.push(category);
			}
		});

		return menuTree;
	};

	const menuTree = buildMenuTree(categoryQuery.data?.data || []);

	const handleClick = (category: CategoryCollectionType) => {
		console.log(category);

		if (
			(category.children && category.children.length === 0) ||
			menuTree.some((item) => item.id === category.parentId)
		) {
			window.location.href = `http://localhost:8888/vi/category-detail?id=${category.id}`;
		}
	};

	interface MenuItemProps {
		category: CategoryCollectionType;
		onMenuItemClick: (itemId: number) => void;
		openMenuItems: number[];
		onItemClick: (category: CategoryCollectionType) => void;
	}

	const MenuItem: React.FC<MenuItemProps> = ({ category, onMenuItemClick, openMenuItems, onItemClick }) => {
		const hasChildren = category.children && category.children.length > 0;
		const isOpen = openMenuItems.includes(category.id);

		const handleClickInternal = (e: React.MouseEvent) => {
			e.stopPropagation();
			onMenuItemClick(category.id);
			if (!hasChildren) {
				onItemClick(category);
			}
		};

		return (
			<li className={`menu-item ${isOpen ? 'open' : ''}`} onClick={handleClickInternal}>
				<div>
					{category.name}
					{hasChildren && <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▶</span>}
				</div>
				{hasChildren && isOpen && (
					<ul className="submenu">
						{category.children!.map(child => (
							<MenuItem
								key={child.id}
								category={child}
								onMenuItemClick={onMenuItemClick}
								openMenuItems={openMenuItems}
								onItemClick={onItemClick}
							/>
						))}
					</ul>
				)}
			</li>
		);
	};

	interface MenuProps {
		categories: CategoryCollectionType[];
		onItemClick: (category: CategoryCollectionType) => void;
	}

	const Menu: React.FC<MenuProps> = ({ categories, onItemClick }) => {
		const [openMenuItems, setOpenMenuItems] = useState<number[]>([]);

		const handleMenuItemClick = (itemId: number) => {
			setOpenMenuItems((prevOpenMenuItems) => {
				if (prevOpenMenuItems.includes(itemId)) {
					return prevOpenMenuItems.filter(id => id !== itemId);
				} else {
					return [...prevOpenMenuItems, itemId];
				}
			});
		};

		return (
			<ul className="menu">
				{categories.map(category => (
					<MenuItem
						key={category.id}
						category={category}
						onMenuItemClick={handleMenuItemClick}
						openMenuItems={openMenuItems}
						onItemClick={onItemClick}
					/>
				))}
			</ul>
		);
	};

	return (
		<div className="home-category">
			<Menu categories={menuTree} onItemClick={handleClick} />
		</div>
	);
};

export { HomeCategory };
