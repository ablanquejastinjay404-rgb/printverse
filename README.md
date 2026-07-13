# PrintVerse - Online Printing Shop

A fully responsive e-commerce website for selling custom printing products, digital downloads, and design templates.

## Features

- **7 Product Categories**: T-Shirts, Digital Movies, Picture Frames, eBooks, Design Templates, Custom Stickers, Game Server Hosting
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Pinned Products**: Save favorites with the pin icon, organized by type, for quick access and express checkout
- **Product Gallery**: 7 images per product with slideshow
- **Payment Options**: GCash and PayPal with instructions
- **Digital Products**: Password-protected ZIP files via Google Drive
- **Facebook Integration**: Contact via Messenger for download link delivery
- **Search Functionality**: Find products quickly
- **Checkout Form**: Complete order information collection

## Live Demo

Visit: `https://YOUR_USERNAME.github.io/printverse/`

## Quick Start

1. Clone or download this repository
2. Open `index.html` in your browser
3. Customize products in `js/products.js`
4. Update Google Drive links with your images
5. Add your payment and contact information

## Deployment to GitHub Pages

1. Create a new GitHub repository (public)
2. Upload all files
3. Go to Settings → Pages
4. Select main branch and root folder
5. Your site will be live at `https://YOUR_USERNAME.github.io/printverse/`

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## Project Structure

```
PrintVerse/
├── index.html          # Main HTML (all pages)
├── README.md          # This file
├── SETUP_GUIDE.md     # Deployment instructions
├── css/
│   └── styles.css     # All styling
└── js/
    ├── products.js    # Product data
    └── app.js         # Application logic
```

## Customization

### Add Products
Edit `js/products.js` and add to the categories array.

### Update Images
Replace placeholder URLs with your Google Drive image links using format:
```
https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
```

### Payment Info
Update GCash number, PayPal email, and Facebook link in `index.html`.

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter)

## License

Free to use and modify for personal or commercial projects.

## Support

For questions or issues, contact via Facebook Messenger.
