# 🌱 Database Seeders Guide

This guide explains how to use the database seeders to populate your database with initial data.

## 📋 Available Seeders

1. **Categories** - Main product categories (Engagement Rings, Wedding Rings, etc.)
2. **Subcategories** - Subcategories/Styles (Solitaire, Halo, etc.)
3. **Filters** - Filter options (Metals, Shapes, Stones, etc.)
4. **Pages** - Dynamic pages for different product combinations
5. **Products** - Sample products (To be implemented)

## 🚀 Quick Start

### Run All Seeders (Recommended)
```bash
npm run seed
```

This will run all seeders in the correct order:
1. Categories
2. Subcategories
3. Filters
4. Pages

### Clear Database Before Seeding
```bash
npm run seed -- --clear
```

This will:
1. Delete all existing data
2. Run all seeders fresh

## 📦 Individual Seeders

### Clear Database Only
```bash
npm run seed:clear
```

### Seed Categories Only
```bash
npm run seed:categories
```

### Seed Subcategories Only
```bash
npm run seed:subcategories
```

### Seed Filters Only
```bash
npm run seed:filters
```

### Seed Pages Only
```bash
npm run seed:pages
```

## 📊 What Gets Created

### Categories (7 items)
- Engagement Rings
- Wedding Rings
- Diamonds
- Gemstones
- Jewelry
- Education
- About Us

Each with:
- ✅ Hero section (image, title, subtitle, description, quote)
- ✅ Page content (banner, intro, features)
- ✅ Promo section
- ✅ SEO data (meta tags, OG tags, Twitter tags)

### Subcategories (~20 items)
- **Engagement Rings**: Solitaire, Halo, Three Stone, Vintage, Pavé
- **Wedding Rings**: Women's Bands, Men's Bands, Matching Sets, Eternity
- **Gemstones**: Moissanite, Sapphire, Emerald, Morganite
- **Jewelry**: Necklaces, Earrings, Bracelets

Each with:
- ✅ Available filters (metals, shapes, styles, price range)
- ✅ SEO data
- ✅ Display settings

### Filters (~60 items)
- **Metals** (7): Platinum, 18K Yellow Gold, 14K White Gold, 14K Rose Gold, etc.
- **Shapes** (10): Round, Oval, Cushion, Pear, Princess, Emerald, etc.
- **Stones** (9): Lab Diamond, Natural Diamond, Moissanite, Sapphire, etc.
- **Styles** (8): Solitaire, Halo, Three Stone, Vintage, Modern, etc.
- **Settings** (5): Prong, Bezel, Pavé, Channel, Tension
- **Band Widths** (6): 2mm, 2.5mm, 3mm, 4mm, 5mm, 6mm

Each with:
- ✅ Icon/Color code
- ✅ Applicable categories
- ✅ Price modifiers
- ✅ SEO data

### Pages (~15 items)
Dynamic pages like:
- `/wedding-rings/women/platinum`
- `/wedding-rings/women/yellow-gold`
- `/wedding-rings/men/platinum`
- `/gemstones/preset-rings/moissanite`
- `/gemstones/preset-rings/sapphire`
- `/jewelry/gemstone-necklaces`

Each with:
- ✅ Product query rules
- ✅ Content sections
- ✅ SEO data
- ✅ Category/Subcategory/Filter relationships

## ⚠️ Important Notes

### Order Matters!
Always run seeders in this order:
1. Categories (no dependencies)
2. Subcategories (depends on Categories)
3. Filters (no dependencies)
4. Pages (depends on Categories, Subcategories, Filters)
5. Products (depends on all above)

The master seeder (`npm run seed`) handles this automatically.

### Environment Variables
Make sure your `.env` file has:
```env
MONGODB_URI=your_mongodb_connection_string
```

### Database Connection
Seeders will:
- ✅ Connect to database automatically
- ✅ Show progress with emojis and colors
- ✅ Display count of created items
- ✅ Close connection when done

## 🔄 Re-seeding

### To Re-seed Everything
```bash
npm run seed -- --clear
```

This is useful when:
- You've made changes to seeder data
- You want to reset to initial state
- You're testing

### To Update Specific Data
Run individual seeders:
```bash
npm run seed:categories  # Updates categories only
npm run seed:filters     # Updates filters only
```

## 📝 Example Output

```bash
$ npm run seed

🌱 ========================================
   MASTER SEEDER - STARTING
========================================

✅ Connected to database

📊 Running seeders in sequence...

1️⃣  Seeding Categories...
✅ Categories seeded successfully!
📊 Created Categories:
   1. Engagement Rings (engagement-rings)
   2. Wedding Rings (wedding-rings)
   3. Diamonds (diamonds)
   ...
   Total: 7 categories

2️⃣  Seeding Subcategories...
✅ Subcategories seeded successfully!
   Total: 20 subcategories

3️⃣  Seeding Filters...
✅ Filters seeded successfully!
   Total: 60 filters

4️⃣  Seeding Pages...
✅ Pages seeded successfully!
   Total: 15 pages

========================================
   ✅ MASTER SEEDER COMPLETED!
========================================
⏱️  Total time: 2.45s

✅ Database connection closed
```

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Check your `MONGODB_URI` in `.env`
- Make sure MongoDB is running
- Check network connection

### Error: "Category not found"
- Run seeders in order (use `npm run seed`)
- Or run `npm run seed:categories` first

### Error: "Duplicate key error"
- Clear database first: `npm run seed:clear`
- Then run seeders again

## 💡 Tips

1. **Development**: Use `npm run seed -- --clear` to start fresh
2. **Production**: Run `npm run seed` only once during initial setup
3. **Testing**: Clear and re-seed as needed
4. **Custom Data**: Edit seeder files to add your own data

## 🔜 Coming Soon

- **Product Seeder** - Sample products for testing
- **User Seeder** - Admin and test users
- **Order Seeder** - Sample orders for testing

## 📞 Need Help?

If you encounter any issues:
1. Check the error message
2. Verify your `.env` configuration
3. Make sure MongoDB is running
4. Try clearing and re-seeding

---

**Happy Seeding! 🌱**
