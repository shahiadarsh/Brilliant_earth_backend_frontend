import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import MegaMenu from '../models/megaMenuModel.js';

// @desc    Get complete Mega Menu hierarchy
// @route   GET /api/v1/public/categories/mega-menu
// @access  Public
export const getMegaMenu = asyncHandler(async (req, res) => {
    const menuData = {};

    // 1. Fetch from the new MegaMenu model (The "Easy" one)
    const megaMenus = await MegaMenu.find({ isActive: true }).sort('order');
    megaMenus.forEach(menu => {
        menuData[menu.name.toUpperCase()] = {
            slug: menu.slug,
            order: menu.order || 0,
            columns: menu.columns,
            promo: menu.promo
        };
    });

    // 2. Fallback/Merge with Category-based dynamic construction
    const categories = await Category.find({ isActive: true })
        .populate('parent', 'name slug')
        .sort('order');

    const roots = categories.filter(c => {
        const name = c.name.toUpperCase();
        const mainPillarNames = ["ENGAGEMENT RINGS", "WEDDING RINGS", "DIAMONDS", "GEMSTONES", "JEWELRY", "GIFTS", "ABOUT"];
        // A root must be a main pillar OR it must have children to be considered a legitimate top-level menu
        return (c.level === 0 && (mainPillarNames.includes(name) || categories.some(child => child.parent?._id.toString() === c._id.toString())));
    });

    roots.forEach(root => {
        const rootKey = root.name.toUpperCase();

        // Only process categories if we don't already have an optimized MegaMenu for this root
        if (!menuData[rootKey]) {
            const children = categories.filter(c => c.parent?._id.toString() === root._id.toString());
            const columnsMap = {};
            const promoCategory = children.find(c => c.menuType === 'promo');
            const regularChildren = children.filter(c => c.menuType !== 'promo');

            regularChildren.forEach(child => {
                const colNum = child.columnNumber || 1;
                if (!columnsMap[colNum]) {
                    columnsMap[colNum] = { groups: [] };
                }

                let group = columnsMap[colNum].groups.find(g => g.title === child.menuGroup);
                if (!group) {
                    group = {
                        title: child.menuGroup || '',
                        type: child.menuType || 'list',
                        items: []
                    };
                    columnsMap[colNum].groups.push(group);
                }

                group.items.push({
                    label: child.name,
                    icon: child.icon,
                    href: child.slug.startsWith('/') ? child.slug : `/${root.slug}/${child.slug}`
                });
            });

            const sortedColumns = Object.keys(columnsMap)
                .sort((a, b) => Number(a) - Number(b))
                .map(key => columnsMap[key]);

            menuData[rootKey] = {
                slug: root.slug,
                order: root.order || 0,
                columns: sortedColumns,
                promo: promoCategory ? {
                    image: promoCategory.image,
                    title: promoCategory.promoData?.title || '',
                    text: promoCategory.promoData?.text || '',
                    code: promoCategory.promoData?.code || '',
                    linkText: promoCategory.promoData?.linkText || 'Shop Now',
                    link: promoCategory.promoData?.link || `/${root.slug}`
                } : null
            };
        }
    });

    res.json({ success: true, data: menuData });
});

// @desc    Get all categories (flat list)
// @route   GET /api/v1/public/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true }).populate('parent', 'name');
    res.json({ success: true, data: categories });
});
