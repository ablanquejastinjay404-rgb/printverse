# PrintVerse - Deployment & Setup Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Customizing Products](#customizing-products)
4. [Setting Up Google Drive Links](#setting-up-google-drive-links)
5. [Configuring Payment & Contact Info](#configuring-payment--contact-info)
6. [Adding New Products](#adding-new-products)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Test Locally
1. Open the `PrintVerse` folder
2. Double-click `index.html` to open in your browser
3. The website should load with all sample products

### Project Structure
```
PrintVerse/
├── index.html          # Main HTML file (all pages)
├── css/
│   └── styles.css      # All styling
├── js/
│   ├── products.js     # Product data (categories & items)
│   └── app.js          # Main application logic
└── images/             # Local images (optional)
```

---

## GitHub Pages Deployment

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Name it: `printverse` or `printverse-shop`
4. Make it **Public** (required for free GitHub Pages)
5. Check **Add a README file**
6. Click **Create repository**

### Step 2: Upload Files
**Option A: GitHub Web Interface**
1. In your repository, click **Add file** → **Upload files**
2. Drag and drop all files from the PrintVerse folder
3. Click **Commit changes**

**Option B: Git Command Line**
```bash
# Navigate to your PrintVerse folder
cd PrintVerse

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PrintVerse website"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/printverse.git

# Push
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (tab)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Source: **Deploy from a branch**
   - Branch: **main** (or **master**)
   - Folder: **/ (root)**
5. Click **Save**

### Step 4: Access Your Website
- Wait 1-2 minutes for deployment
- Your site will be at: `https://YOUR_USERNAME.github.io/printverse/`

---

## Customizing Products

### Edit Product Data
Open `js/products.js` and modify the `categories` array.

### Product Structure
```javascript
{
    id: 101,                    // Unique product ID
    name: "Classic Cotton Tee", // Product name
    slug: "classic-cotton-tee", // URL-friendly name
    price: 19.99,               // Current price
    originalPrice: 24.99,       // Original price (for sale badge)
    description: "...",         // Full description
    shortDescription: "...",    // Short description for cards
    features: ["...", "..."],   // Array of features
    sizes: ["S", "M", "L"],     // Available sizes (optional)
    colors: ["Black", "White"], // Available colors (optional)
    images: [...],              // Array of 7 image URLs
    type: "physical",           // "physical" or "digital"
    inStock: true,              // Availability
    rating: 4.5,                // Rating (1-5)
    reviews: 128                // Number of reviews
}
```

### Digital Product Structure
```javascript
{
    // ... same as above, plus:
    type: "digital",
    downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
    specifications: {
        "Format": "PDF",
        "Pages": "200",
        "File Size": "45 MB"
    }
}
```

---

## Setting Up Google Drive Links

### For Product Images

1. **Upload images to Google Drive**
   - Create a folder for each product
   - Upload all 7 images for that product

2. **Make images publicly accessible**
   - Right-click the image file
   - Click **Share**
   - Click **General access**
   - Change to **Anyone with the link**
   - Click **Done**

3. **Get the direct link**
   - Right-click the image → **Share** → **Copy link**
   - The link looks like: `https://drive.google.com/file/d/ABC123xyz/view`
   - Extract the file ID (the part after `/d/` and before `/view`)
   - Your image URL format: `https://drive.google.com/uc?export=view&id=ABC123xyz`

4. **Update products.js**
   ```javascript
   images: [
       "https://drive.google.com/uc?export=view&id=IMAGE_ID_1",
       "https://drive.google.com/uc?export=view&id=IMAGE_ID_2",
       // ... 7 images total
   ]
   ```

### For Digital Products (eBooks, Movies, Templates)

1. **Create a ZIP file**
   - Put your digital file in a ZIP archive
   - **Important**: Password-protect the ZIP file!

2. **Upload to Google Drive**
   - Create a folder for the product
   - Upload the password-protected ZIP file

3. **Make it accessible**
   - Right-click the file/folder
   - **Share** → **General access** → **Anyone with the link**
   - Click **Done**

4. **Get the download link**
   - Right-click → **Share** → **Copy link**
   - The link looks like: `https://drive.google.com/drive/folders/ABC123xyz`

5. **Update products.js**
   ```javascript
   downloadLink: "https://drive.google.com/drive/folders/ABC123xyz"
   ```

### Google Drive Link Format Reference

| Type | URL Format |
|------|------------|
| Image | `https://drive.google.com/uc?export=view&id=FILE_ID` |
| Folder | `https://drive.google.com/drive/folders/FOLDER_ID` |
| File Download | `https://drive.google.com/uc?export=download&id=FILE_ID` |

**Finding the ID:**
- From: `https://drive.google.com/file/d/ABC123xyz/view`
- Extract: `ABC123xyz`

---

## Configuring Payment & Contact Info

### Facebook Messenger Link

1. Get your Facebook Page Messenger link:
   - Go to your Facebook Page
   - Click **Add Action Button** or **Edit Page Button**
   - Select **Send Message**
   - The link format: `https://m.me/YOUR_PAGE_NAME`

2. Update in `index.html`:
   ```html
   <!-- Replace all instances of YOUR_PAGE_HERE -->
   <a href="https://m.me/YOUR_PAGE_NAME" target="_blank">
   ```

### GCash Number

1. Open `index.html`
2. Find the GCash section in the payment page
3. Replace the placeholder number:
   ```html
   <p class="account-number">+63 9XX XXX XXXX</p>
   <p class="account-name">PrintVerse Shop</p>
   ```

### PayPal Email

1. Find the PayPal section in `index.html`
2. Replace the placeholder email:
   ```html
   <p class="account-email">your-paypal@email.com</p>
   <p class="account-name">PrintVerse Shop</p>
   ```

### Store Name

Replace "PrintVerse Shop" with your actual store name throughout the HTML file.

---

## Adding New Products

### Method 1: Quick Add (Same Category)

1. Open `js/products.js`
2. Find the category you want to add to
3. Copy an existing product object
4. Change the `id` to a new unique number
5. Update all other fields
6. Add your 7 image URLs

### Method 2: Add New Category

1. Open `js/products.js`
2. Add a new object to the `categories` array:

```javascript
{
    id: 11,  // New category ID
    name: "New Category Name",
    slug: "new-category-slug",
    description: "Category description here",
    image: "https://drive.google.com/uc?export=view&id=CATEGORY_IMAGE_ID",
    products: [
        // Add products here
    ]
}
```

### Adding Category Images

1. Upload a representative image to Google Drive
2. Make it publicly accessible
3. Get the direct link (see Google Drive section above)
4. Add to the category's `image` field

---

## Customizing Design

### Colors

Edit `css/styles.css` and modify the CSS variables:

```css
:root {
    --primary-color: #3498db;      /* Main color */
    --primary-dark: #2980b9;       /* Darker shade */
    --secondary-color: #2ecc71;    /* Accent color */
    --accent-color: #e74c3c;       /* Alert/sale color */
}
```

### Fonts

Change the Google Fonts link in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update in CSS:

```css
body {
    font-family: 'YOUR_FONT', sans-serif;
}
```

---

## Troubleshooting

### Images Not Loading
- Ensure Google Drive images are set to "Anyone with the link"
- Use the `uc?export=view` format for images
- Check for typos in file IDs

### Page Not Found on GitHub Pages
- Ensure repository is public
- Check that GitHub Pages is enabled in Settings
- Verify the branch and folder settings

### Styling Issues
- Ensure `css/styles.css` is in the correct path
- Check that Font Awesome CDN is accessible
- Clear browser cache

### Mobile Menu Not Working
- Check that `app.js` is loaded correctly
- Look for JavaScript errors in console

---

## File Checklist

Before deploying, ensure you have:

- [ ] `index.html`
- [ ] `css/styles.css`
- [ ] `js/products.js`
- [ ] `js/app.js`
- [ ] Updated all Google Drive links
- [ ] Updated Facebook Messenger link
- [ ] Updated GCash/PayPal info
- [ ] Replaced placeholder product data

---

## Need Help?

Contact us via Facebook Messenger for support!
