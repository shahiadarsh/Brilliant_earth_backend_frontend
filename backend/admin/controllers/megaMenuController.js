import asyncHandler from 'express-async-handler';
import Category from '../../public/models/categoryModel.js';
import MegaMenu from '../../public/models/megaMenuModel.js';

// @desc    Get all mega menus (merged with legacy categories for migration)
// @route   GET /api/v1/admin/management/megamenus
// @access  Private/Admin
export const getMegaMenus = asyncHandler(async (req, res) => {
    // 1. Get all real MegaMenu documents
    const realMenus = await MegaMenu.find({}).sort('order');
    const realMenuNames = realMenus.map(m => m.name.toUpperCase());

    // 2. Get all Level 0 Categories that aren't represented in MegaMenu yet
    const categories = await Category.find({ isActive: true }).sort('order');
    const legacyRoots = categories.filter(c => {
        const name = c.name.toUpperCase();
        const isMainPillar = ["ENGAGEMENT RINGS", "WEDDING RINGS", "DIAMONDS", "GEMSTONES", "JEWELRY", "GIFTS", "ABOUT"].includes(name);
        return c.level === 0 && !realMenuNames.includes(name) && (isMainPillar || categories.some(child => child.parent?._id.toString() === c._id.toString()));
    });

    // 3. Transform legacy categories into MegaMenu structure for the builder
    const virtualMenus = legacyRoots.map(root => {
        const children = categories.filter(c => c.parent?._id.toString() === root._id.toString());
        const columnsMap = {};
        const promoCategory = children.find(c => c.menuType === 'promo');
        const regularChildren = children.filter(c => c.menuType !== 'promo');

        regularChildren.forEach(child => {
            const colNum = child.columnNumber || 1;
            if (!columnsMap[colNum]) columnsMap[colNum] = { groups: [] };

            let group = columnsMap[colNum].groups.find(g => g.title === child.menuGroup);
            if (!group) {
                group = { title: child.menuGroup || '', type: child.menuType || 'list', items: [] };
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

        return {
            _id: root._id, // Use category ID for now
            name: root.name,
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
            } : {},
            isLegacy: true // Flag for frontend
        };
    });

    res.json({ success: true, data: [...realMenus, ...virtualMenus] });
});

// @desc    Create a mega menu
// @route   POST /api/v1/admin/management/megamenus
// @access  Private/Admin
export const createMegaMenu = asyncHandler(async (req, res) => {
    const menu = await MegaMenu.create(req.body);
    res.status(201).json({ success: true, data: menu });
});

// @desc    Update a mega menu
// @route   PUT /api/v1/admin/management/megamenus/:id
// @access  Private/Admin
export const updateMegaMenu = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id; // Prevent ID collision if it's a legacy ID

    // Try to find by ID first (Real MegaMenu)
    let menu = await MegaMenu.findById(id);

    if (menu) {
        // Update existing MegaMenu
        menu = await MegaMenu.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    } else {
        // If not found by ID, it might be a legacy category being converted
        // Use findOneAndUpdate with upsert based on Name/Slug to prevent duplicates
        menu = await MegaMenu.findOneAndUpdate(
            { name: updateData.name.toUpperCase() },
            updateData,
            { new: true, upsert: true, runValidators: true }
        );
    }

    res.json({ success: true, data: menu });
});

// @desc    Delete a mega menu
// @route   DELETE /api/v1/admin/management/megamenus/:id
// @access  Private/Admin
export const deleteMegaMenu = asyncHandler(async (req, res) => {
    const menu = await MegaMenu.findByIdAndDelete(req.id || req.params.id);
    if (!menu) {
        res.status(404);
        throw new Error('Mega Menu not found');
    }
    res.json({ success: true, message: 'Mega Menu deleted' });
});
