# Ring CSV Bulk Upload Guide

## 📋 CSV Format Overview

This CSV template supports **multiple images** and **multi-metal pricing** for Ring products.

## 🔑 Required Columns

| Column | Description | Example |
|--------|-------------|---------|
| `name` | Product name | "Classic Solitaire Diamond Ring" |
| `basePrice` | Base price in USD | 1250 |
| `stock` | Available quantity | 15 |
| `description` | Product description | "Timeless solitaire setting..." |
| `categoryName` | Category name | "Rings & Settings" |
| `metal` | Primary metal type | "14K White Gold" |
| `shape` | Diamond/stone shape | "Round", "Oval", "Cushion" |
| `style` | Ring style | "Solitaire", "Halo", "Three Stone" |
| `stoneType` | Type of stone | "Diamond", "Sapphire", "Morganite" |

## 🎨 Multi-Image Support

Use the **pipe separator** (`|`) to add multiple image URLs:

```csv
images
"https://example.com/img1.jpg|https://example.com/img2.jpg|https://example.com/img3.jpg"
```

**Example:**
```csv
"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800|https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800|https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"
```

## 💰 Multi-Metal Pricing

### Format: `Metal:Price|Metal:Price`

```csv
priceByMetal
"14K White Gold:1250|18K White Gold:1450|Platinum:1650"
```

### Available Metals List

Use the `metals` column to specify which metals are available (pipe-separated):

```csv
metals
"14K White Gold|18K White Gold|Platinum"
```

## 🔧 Optional Columns

| Column | Description | Format |
|--------|-------------|--------|
| `prongStyle` | Prong setting style | "4-Prong", "6-Prong", "Halo" |
| `bandWidth` | Band width | "1.5mm", "2.0mm" |
| `metaTitle` | SEO title | "Classic Solitaire Diamond Ring" |
| `metaDescription` | SEO description | "Timeless solitaire diamond ring..." |
| `keywords` | SEO keywords | "solitaire ring, diamond, classic" |

## 📝 Complete Example Row

```csv
name,basePrice,stock,description,categoryName,metal,shape,style,stoneType,images,priceByMetal,metals,prongStyle,bandWidth,metaTitle,metaDescription,keywords
"Classic Solitaire Diamond Ring",1250,15,"Timeless solitaire setting highlighting the center diamond.","Rings & Settings","14K White Gold","Round","Solitaire","Diamond","https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800|https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800","14K White Gold:1250|18K White Gold:1450|Platinum:1650","14K White Gold|18K White Gold|Platinum","4-Prong","1.5mm","Classic Solitaire Diamond Engagement Ring","Timeless solitaire diamond ring in white gold, platinum available","solitaire ring, diamond engagement ring, classic ring"
```

## 🚀 How to Upload

1. **Prepare your CSV** using the template: `rings_catalog_updated.csv`
2. **Go to Admin Dashboard** → Catalog → Rings
3. **Click "Bulk Import"** button
4. **Select your CSV file**
5. **Wait for processing** - you'll see a success message when complete

## ⚠️ Important Notes

- **Image URLs must be valid** - use Cloudinary, Unsplash, or your own CDN
- **Multiple images** improve product presentation (3-5 recommended)
- **Multi-metal pricing** allows customers to see price variations
- **All prices** should be in USD
- **Stock** will be calculated from variants if provided

## 🎯 Best Practices

1. **Use high-quality image URLs** (800px+ width recommended)
2. **Include 3-5 images** per product showing different angles
3. **Set prices for all available metals** in priceByMetal
4. **Write descriptive SEO titles and descriptions**
5. **Use consistent metal naming** (e.g., "14K White Gold" not "14k white gold")

## 📊 Sample Data

The file `rings_catalog_updated.csv` contains 10 sample products with:
- ✅ Multiple images per product
- ✅ Multi-metal pricing
- ✅ Complete SEO metadata
- ✅ All required fields

Use it as a reference when creating your own bulk upload files!
