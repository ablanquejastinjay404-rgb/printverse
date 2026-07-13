/**
 * PrintVerse Product Data
 * ======================
 * This file contains all product categories and product information.
 * 
 * HOW TO ADD NEW PRODUCTS:
 * 1. Find the category array you want to add to
 * 2. Copy an existing product object
 * 3. Change the id to a unique number
 * 4. Update all the fields with your product information
 * 5. Replace image URLs with your Google Drive links
 * 
 * GOOGLE DRIVE IMAGE FORMAT:
 * https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
 */

// Placeholder image URLs - REPLACE THESE WITH YOUR GOOGLE DRIVE LINKS
var PLACEHOLDER_IMAGES = {
    tshirts: "images/categories/tshirts.jpg",
    movies: "images/categories/movies.jpg",
    frames: "images/categories/frames.jpg",
    ebooks: "images/categories/ebooks.jpg",
    templates: "images/categories/templates.jpg",
    stickers: "images/categories/stickers.jpg",
    gameservers: "images/categories/games-server.jpg",
    canva: "images/categories/canva.jpg",
    p1: "images/products/p1.jpg",
    p2: "images/products/p2.jpg",
    p3: "images/products/p3.jpg",
    p4: "images/products/p4.jpg",
    p5: "images/products/p5.jpg",
    p6: "images/products/p6.jpg",
    p7: "images/products/p7.jpg"
};

var IMAGES = [PLACEHOLDER_IMAGES.p1, PLACEHOLDER_IMAGES.p2, PLACEHOLDER_IMAGES.p3, PLACEHOLDER_IMAGES.p4, PLACEHOLDER_IMAGES.p5, PLACEHOLDER_IMAGES.p6, PLACEHOLDER_IMAGES.p7];

// Product Categories
var categories = [
    {
        id: 1,
        name: "Custom T-Shirts",
        slug: "t-shirts",
        description: "Premium quality custom printed t-shirts in various styles and colors",
        image: PLACEHOLDER_IMAGES.tshirts,
        products: [
            {
                id: 101,
                name: "Classic Cotton Tee",
                slug: "classic-cotton-tee",
                price: 19.99,
                originalPrice: 24.99,
                description: "Our Classic Cotton Tee is made from 100% premium cotton for ultimate comfort. Features a relaxed fit, crew neck, and pre-shrunk fabric. Available in multiple colors and sizes from S to 3XL.",
                shortDescription: "100% premium cotton, relaxed fit, pre-shrunk fabric",
                features: ["100% Premium Cotton", "Pre-shrunk Fabric", "Machine Washable", "Multiple Colors Available"],
                sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
                colors: ["Black", "White", "Navy", "Gray", "Red"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.5,
                reviews: 128,
                category: "t-shirts",
                partner: "awakening-insights"
            },
            {
                id: 102,
                name: "Vintage Graphic Tee",
                slug: "vintage-graphic-tee",
                price: 24.99,
                originalPrice: 29.99,
                description: "Stand out with our Vintage Graphic Tee featuring unique retro designs. Made from soft cotton blend with a vintage wash finish.",
                shortDescription: "Retro design, vintage wash finish, cotton blend",
                features: ["Cotton Blend", "Vintage Wash Finish", "Distressed Print", "Retro Design"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Faded Black", "Faded Navy", "Faded Maroon"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.7,
                reviews: 89,
                category: "t-shirts",
                partner: "awakening-insights"
            },
            {
                id: 103,
                name: "Premium Polo Shirt",
                slug: "premium-polo-shirt",
                price: 34.99,
                originalPrice: 39.99,
                description: "Elevate your style with our Premium Polo Shirt. Crafted from pique cotton for a sophisticated look.",
                shortDescription: "Pique cotton, classic polo collar, business casual",
                features: ["Pique Cotton", "Classic Polo Collar", "Two-Button Placket", "Side Vents"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["White", "Navy", "Gray", "Burgundy"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.8,
                reviews: 67,
                category: "t-shirts",
                partner: "awakening-insights"
            },
            {
                id: 104,
                name: "Oversized Streetwear Tee",
                slug: "oversized-streetwear-tee",
                price: 27.99,
                originalPrice: 34.99,
                description: "Make a statement with our Oversized Streetwear Tee. Dropped shoulders and a relaxed fit for that trendy urban look. Made from heavyweight cotton for a premium feel.",
                shortDescription: "Dropped shoulders, heavyweight cotton, urban style",
                features: ["Heavyweight 220gsm Cotton", "Dropped Shoulders", "Relaxed Oversized Fit", "Ribbed Crew Neck", "Double-Stitched Hem"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Black", "White", "Sage Green", "Sand", "Charcoal"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.7,
                reviews: 94,
                category: "t-shirts",
                partner: "awakening-insights"
            },
            {
                id: 105,
                name: "Athletic Performance Tee",
                slug: "athletic-performance-tee",
                price: 29.99,
                originalPrice: 36.99,
                description: "Engineered for active lifestyles, our Athletic Performance Tee features moisture-wicking technology and 4-way stretch fabric. Perfect for gym, running, or sports.",
                shortDescription: "Moisture-wicking, 4-way stretch, anti-odor technology",
                features: ["Moisture-Wicking Fabric", "4-Way Stretch", "Anti-Odor Technology", "Flatlock Seams", "UV Protection SPF 50+"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Black", "Navy", "Gray", "Neon Green", "White"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.9,
                reviews: 156
            },
            {
                id: 106,
                name: "Tie-Dye Crew Tee",
                slug: "tie-dye-crew-tee",
                price: 22.99,
                originalPrice: 28.99,
                description: "Add some color to your wardrobe with our handmade Tie-Dye Crew Tee. Each piece is uniquely dyed, so no two shirts are exactly alike.",
                shortDescription: "Hand-dyed, unique patterns, soft cotton blend",
                features: ["Hand-Dyed Process", "Unique Patterns", "Soft Cotton Blend", "Vibrant Colors", "Pre-Shrunk"],
                sizes: ["S", "M", "L", "XL"],
                colors: ["Rainbow", "Ocean Blue", "Sunset Orange", "Galaxy Purple", "Forest"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.6,
                reviews: 203
            },
            {
                id: 107,
                name: "Long Sleeve Basic Tee",
                slug: "long-sleeve-basic-tee",
                price: 21.99,
                originalPrice: 27.99,
                description: "Our Long Sleeve Basic Tee is a wardrobe essential. Made from soft ringspun cotton for all-day comfort. Layer it or wear it solo.",
                shortDescription: "Ringspun cotton, classic fit, versatile layering piece",
                features: ["100% Ringspun Cotton", "Classic Fit", "Ribbed Cuffs", "Reinforced Shoulders", "Pre-Shrunk"],
                sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
                colors: ["Black", "White", "Navy", "Heather Gray", "Burgundy", "Olive"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.5,
                reviews: 178
            },
            {
                id: 108,
                name: "V-Neck Modern Tee",
                slug: "v-neck-modern-tee",
                price: 18.99,
                originalPrice: 23.99,
                description: "Sleek and modern, our V-Neck Tee offers a slightly more refined look than a classic crew neck. Slim fit with a flattering neckline.",
                shortDescription: "Slim fit, flattering V-neckline, soft modal blend",
                features: ["Cotton-Modal Blend", "Slim Fit Design", "Flattering V-Neckline", "Side-Seamed Construction", "Tag-Free Label"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Black", "White", "Charcoal", "Navy", "Light Gray"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.4,
                reviews: 132
            },
            {
                id: 109,
                name: "Pocket Logo Tee",
                slug: "pocket-logo-tee",
                price: 20.99,
                originalPrice: 26.99,
                description: "Minimalist style meets custom design with our Pocket Logo Tee. Features a small custom print on the chest pocket area for a clean, subtle look.",
                shortDescription: "Minimalist chest print, soft cotton, clean design",
                features: ["100% Combed Cotton", "Chest Pocket Print", "Minimalist Design", "Side-Seamed", "Tear-Away Label"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Black", "White", "Navy", "Sand", "Sage"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.7,
                reviews: 89
            },
            {
                id: 110,
                name: "Heavyweight Cotton Tee",
                slug: "heavyweight-cotton-tee",
                price: 24.99,
                originalPrice: 31.99,
                description: "Built to last, our Heavyweight Cotton Tee is made from dense 260gsm cotton. Durability meets comfort with a structured, boxy fit.",
                shortDescription: "260gsm dense cotton, boxy fit, ultra-durable",
                features: ["260gsm Heavyweight Cotton", "Boxy Structured Fit", "Dense Weave", "Reinforced Collar", "Built to Last"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Black", "White", "Washed Gray", "Washed Navy", "Washed Brown"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.8,
                reviews: 145
            },
            {
                id: 111,
                name: "Eco-Friendly Organic Tee",
                slug: "eco-friendly-organic-tee",
                price: 26.99,
                originalPrice: 33.99,
                description: "Look good and feel good with our Eco-Friendly Organic Tee. Made from 100% GOTS certified organic cotton with water-based eco-friendly inks.",
                shortDescription: "GOTS certified organic, eco-friendly inks, sustainable",
                features: ["100% GOTS Organic Cotton", "Water-Based Inks", "Carbon Neutral Production", "Eco-Friendly Packaging", "Soft Hand Feel"],
                sizes: ["S", "M", "L", "XL", "2XL"],
                colors: ["Natural White", "Earth Brown", "Ocean Blue", "Forest Green", "Clay"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.9,
                reviews: 210
            },
            {
                id: 112,
                name: "Ringer Retro Tee",
                slug: "ringer-retro-tee",
                price: 23.99,
                originalPrice: 29.99,
                description: "Throw it back with our Ringer Retro Tee. Contrasting ribbed trim on the collar and sleeves gives this classic tee a vintage athletic vibe.",
                shortDescription: "Contrast ringer trim, vintage athletic style, soft cotton",
                features: ["100% Cotton Body", "Contrast Ringer Trim", "Vintage Athletic Style", "Ribbed Collar & Cuffs", "Retro Fit"],
                sizes: ["S", "M", "L", "XL"],
                colors: ["White/Red", "White/Navy", "White/Black", "Black/White", "Navy/White"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.6,
                reviews: 118
            }
        ]
    },
    {
        id: 2,
        name: "Digital Movies",
        slug: "digital-movies",
        description: "Download high-quality digital movies and films directly to your device",
        image: PLACEHOLDER_IMAGES.movies,
        products: [
            {
                id: 201,
                name: "Indie Film Collection Vol. 1",
                slug: "indie-film-collection-vol1",
                price: 9.99,
                originalPrice: 14.99,
                description: "Experience the best of independent cinema with our curated collection of award-winning indie films. Includes 5 complete films in HD quality.",
                shortDescription: "5 award-winning indie films in HD quality",
                features: ["HD Quality (1080p)", "5 Complete Films", "English Subtitles", "Downloadable ZIP File"],
                specifications: { "Format": "MP4", "Resolution": "1920x1080", "Size": "2.5 GB", "Duration": "5 hours total" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.6,
                reviews: 45
            },
            {
                id: 202,
                name: "Documentary Bundle",
                slug: "documentary-bundle",
                price: 12.99,
                originalPrice: 19.99,
                description: "Dive deep into fascinating topics with our Documentary Bundle. Features 3 thought-provoking documentaries.",
                shortDescription: "3 documentaries with bonus content",
                features: ["3 Documentaries", "HD Quality", "Behind-the-Scenes", "Bonus Content"],
                specifications: { "Format": "MP4", "Resolution": "1920x1080", "Size": "4 GB", "Duration": "6 hours total" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.8,
                reviews: 32
            },
            {
                id: 203,
                name: "Short Film Anthology",
                slug: "short-film-anthology",
                price: 7.99,
                originalPrice: 12.99,
                description: "A curated collection of 8 award-winning short films from emerging filmmakers around the world. Features diverse storytelling across drama, comedy, and sci-fi genres.",
                shortDescription: "8 award-winning short films, multiple genres",
                features: ["8 Short Films", "HD Quality (1080p)", "Multiple Genres", "English Subtitles", "Director Commentaries"],
                specifications: { "Format": "MP4", "Resolution": "1920x1080", "Size": "1.8 GB", "Duration": "3 hours total" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.7,
                reviews: 28
            }
        ]
    },
    {
        id: 3,
        name: "Picture Frames",
        slug: "picture-frames",
        description: "Beautiful frames to showcase your favorite photos and artwork",
        image: PLACEHOLDER_IMAGES.frames,
        products: [
            {
                id: 301,
                name: "Classic Wooden Frame",
                slug: "classic-wooden-frame",
                price: 15.99,
                originalPrice: 19.99,
                description: "Our Classic Wooden Frame adds warmth and elegance to any photo. Made from real wood with a smooth finish.",
                shortDescription: "Real wood construction with glass front",
                features: ["Real Wood", "Glass Front", "Easel Back", "Wall Mount Included"],
                sizes: ["4x6", "5x7", "8x10", "11x14"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.4,
                reviews: 156
            },
            {
                id: 302,
                name: "Modern Floating Frame",
                slug: "modern-floating-frame",
                price: 29.99,
                originalPrice: 39.99,
                description: "Create a stunning gallery wall with our Modern Floating Frame. The unique design makes your photo appear to float.",
                shortDescription: "Unique floating design, gallery-quality",
                features: ["Floating Design", "Multiple Finishes", "Canvas Compatible", "Gallery Quality"],
                sizes: ["8x10", "11x14", "16x20", "24x36"],
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.7,
                reviews: 89
            }
        ]
    },
    {
        id: 4,
        name: "eBooks",
        slug: "ebooks",
        description: "Digital books and guides on various topics for instant download",
        image: PLACEHOLDER_IMAGES.ebooks,
        products: [
            {
                id: 401,
                name: "Digital Photography Masterclass",
                slug: "digital-photography-masterclass",
                price: 14.99,
                originalPrice: 24.99,
                description: "Master the art of digital photography with this comprehensive guide. Learn composition, lighting, editing techniques, and more.",
                shortDescription: "200+ page comprehensive photography guide",
                features: ["200+ Pages", "Expert Tips", "Photo Examples", "Beginner Friendly"],
                specifications: { "Format": "PDF", "Pages": "212", "Language": "English", "File Size": "45 MB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.9,
                reviews: 234
            },
            {
                id: 402,
                name: "Business Plan Template Pack",
                slug: "business-plan-template-pack",
                price: 19.99,
                originalPrice: 34.99,
                description: "Start your business right with our Professional Business Plan Template Pack. Includes 10 customizable templates.",
                shortDescription: "10 customizable business plan templates",
                features: ["10 Templates", "Customizable", "Financial Projections", "Multiple Industries"],
                specifications: { "Format": "DOCX/PDF", "Templates": "10", "Language": "English", "File Size": "25 MB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.7,
                reviews: 167
            }
        ]
    },
    {
        id: 5,
        name: "Website Templates",
        slug: "website-templates",
        description: "Professional, responsive website templates ready to customize and launch",
        image: PLACEHOLDER_IMAGES.templates,
        products: [
            {
                id: 501,
                name: "Business Website Template",
                slug: "business-website-template",
                price: 29.99,
                originalPrice: 49.99,
                description: "A clean, professional template perfect for corporate businesses, agencies, and startups. Includes About, Services, Team, and Contact pages.",
                shortDescription: "Professional business template with 5 pages",
                features: ["Responsive Design", "5 Pages Included", "SEO Optimized", "Contact Form", "Google Maps Integration"],
                specifications: { "Format": "HTML/CSS/JS", "Pages": "5", "Framework": "Bootstrap 5", "Compatibility": "All Browsers", "File Size": "2.5 MB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.8,
                reviews: 156
            },
            {
                id: 502,
                name: "Portfolio Website Template",
                slug: "portfolio-website-template",
                price: 24.99,
                originalPrice: 39.99,
                description: "Showcase your work with this stunning portfolio template. Ideal for designers, photographers, and creative professionals. Features a gallery grid and project detail pages.",
                shortDescription: "Creative portfolio template with gallery grid",
                features: ["Gallery Grid Layout", "Project Detail Pages", "Lightbox Viewer", "Smooth Animations", "Mobile First"],
                specifications: { "Format": "HTML/CSS/JS", "Pages": "4", "Framework": "Vanilla JS", "Compatibility": "All Browsers", "File Size": "1.8 MB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.7,
                reviews: 134
            },
            {
                id: 503,
                name: "E-commerce Website Template",
                slug: "ecommerce-website-template",
                price: 39.99,
                originalPrice: 59.99,
                description: "Start selling online with this complete e-commerce template. Includes product listings, shopping cart, checkout flow, and order confirmation pages.",
                shortDescription: "Full e-commerce template with cart and checkout",
                features: ["Product Listings", "Shopping Cart", "Checkout Flow", "Product Search", "Category Filters"],
                specifications: { "Format": "HTML/CSS/JS", "Pages": "8", "Framework": "Bootstrap 5", "Compatibility": "All Browsers", "File Size": "3.2 MB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.9,
                reviews: 198
            },
            {
                id: 504,
                name: "Landing Page Template",
                slug: "landing-page-template",
                price: 14.99,
                originalPrice: 24.99,
                description: "A high-converting single-page template perfect for product launches, app promotions, and marketing campaigns. Features a hero section, features, testimonials, and CTA.",
                shortDescription: "Single-page high-converting landing page",
                features: ["Hero Section", "Features Grid", "Testimonials", "Pricing Table", "Call-to-Action Buttons"],
                specifications: { "Format": "HTML/CSS/JS", "Pages": "1", "Framework": "Vanilla JS", "Compatibility": "All Browsers", "File Size": "800 KB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.6,
                reviews: 87
            },
            {
                id: 505,
                name: "Blog Website Template",
                slug: "blog-website-template",
                price: 19.99,
                originalPrice: 29.99,
                description: "A clean, readable blog template designed for content creators. Includes post layouts, category pages, sidebar widgets, and an author bio section.",
                shortDescription: "Clean blog template with multiple post layouts",
                features: ["Multiple Post Layouts", "Category Pages", "Sidebar Widgets", "Author Bio Section", "Newsletter Signup"],
                specifications: { "Format": "HTML/CSS/JS", "Pages": "6", "Framework": "Vanilla JS", "Compatibility": "All Browsers", "File Size": "1.5 MB" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.7,
                reviews: 112
            }
        ]
    },
    {
        id: 8,
        name: "Custom Stickers",
        slug: "stickers",
        description: "Durable vinyl stickers for laptops, water bottles, and more",
        image: PLACEHOLDER_IMAGES.stickers,
        products: [
            {
                id: 801,
                name: "Vinyl Sticker Pack",
                slug: "vinyl-sticker-pack",
                price: 7.99,
                originalPrice: 12.99,
                description: "Express yourself with our Vinyl Sticker Pack. Includes 10 unique waterproof, UV-resistant stickers.",
                shortDescription: "10 waterproof, UV-resistant stickers",
                features: ["10 Stickers", "Waterproof", "UV-Resistant", "Vibrant Colors"],
                specifications: { "Quantity": "10 stickers", "Material": "Vinyl", "Weather Resistant": "Yes", "Removable": "Yes" },
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.9,
                reviews: 412
            },
            {
                id: 802,
                name: "Custom Die-Cut Stickers",
                slug: "custom-die-cut-stickers",
                price: 14.99,
                originalPrice: 19.99,
                description: "Get your own design cut into a custom sticker! Upload your artwork and we will create professional die-cut stickers.",
                shortDescription: "Custom shape stickers from your artwork",
                features: ["Custom Shape", "Your Design", "Professional Quality", "Bulk Available"],
                specifications: { "Min Order": "25 stickers", "Material": "Premium Vinyl", "Finish": "Gloss or Matte", "Lifespan": "5+ years" },
                images: IMAGES.slice(),
                type: "physical",
                inStock: true,
                rating: 4.8,
                reviews: 87
            }
        ]
    },
    {
        id: 9,
        name: "Game Server Hosting",
        slug: "game-servers",
        description: "Reliable game server hosting for Minecraft, Valheim, and more",
        image: PLACEHOLDER_IMAGES.gameservers,
        products: [
            {
                id: 901,
                name: "Minecraft Server - Starter",
                slug: "minecraft-server-starter",
                price: 9.99,
                originalPrice: 14.99,
                description: "Start your Minecraft community with our Starter server. Perfect for small groups of friends. Includes 2GB RAM, 20GB SSD storage, and DDoS protection.",
                shortDescription: "2GB RAM, 20GB SSD, up to 10 players",
                features: ["2GB RAM", "20GB SSD Storage", "DDoS Protection", "Instant Setup", "Mod Support", "Daily Backups"],
                specifications: { "RAM": "2 GB", "Storage": "20 GB SSD", "Player Slots": "10", "Uptime": "99.9%", "Location": "Asia" },
                images: IMAGES.slice(),
                type: "digital",
                inStock: true,
                rating: 4.8,
                reviews: 234
            },
            {
                id: 902,
                name: "Minecraft Server - Pro",
                slug: "minecraft-server-pro",
                price: 19.99,
                originalPrice: 29.99,
                description: "Level up with our Pro server. Ideal for medium communities and modded gameplay. Includes 4GB RAM, 40GB SSD storage, and priority support.",
                shortDescription: "4GB RAM, 40GB SSD, up to 25 players",
                features: ["4GB RAM", "40GB SSD Storage", "DDoS Protection", "Priority Support", "Mod Pack Installer", "Automatic Backups"],
                specifications: { "RAM": "4 GB", "Storage": "40 GB SSD", "Player Slots": "25", "Uptime": "99.9%", "Location": "Asia" },
                images: IMAGES.slice(),
                type: "digital",
                inStock: true,
                rating: 4.9,
                reviews: 189
            },
            {
                id: 903,
                name: "Minecraft Server - Enterprise",
                slug: "minecraft-server-enterprise",
                price: 39.99,
                originalPrice: 59.99,
                description: "Our most powerful Minecraft server for large communities and network servers. Includes 8GB RAM, 80GB SSD storage, and dedicated resources.",
                shortDescription: "8GB RAM, 80GB SSD, up to 50 players",
                features: ["8GB RAM", "80GB SSD Storage", "DDoS Protection", "24/7 Support", "Multiple Server Slots", "Custom Domain"],
                specifications: { "RAM": "8 GB", "Storage": "80 GB SSD", "Player Slots": "50", "Uptime": "99.99%", "Location": "Asia/EU/US" },
                images: IMAGES.slice(),
                type: "digital",
                inStock: true,
                rating: 5.0,
                reviews: 156
            },
            {
                id: 904,
                name: "Valheim Server",
                slug: "valheim-server",
                price: 12.99,
                originalPrice: 19.99,
                description: "Explore the Viking world with friends on our Valheim server. Optimized for performance with 3GB RAM and 30GB SSD storage.",
                shortDescription: "3GB RAM, 30GB SSD, up to 10 players",
                features: ["3GB RAM", "30GB SSD Storage", "DDoS Protection", "One-Click Setup", "World Backups", "Mod Support"],
                specifications: { "RAM": "3 GB", "Storage": "30 GB SSD", "Player Slots": "10", "Uptime": "99.9%", "Location": "Asia" },
                images: IMAGES.slice(),
                type: "digital",
                inStock: true,
                rating: 4.7,
                reviews: 98
            },
            {
                id: 905,
                name: "Rust Server",
                slug: "rust-server",
                price: 14.99,
                originalPrice: 24.99,
                description: "Survive and thrive on our Rust server. High-performance hosting with 4GB RAM and 40GB SSD for smooth gameplay.",
                shortDescription: "4GB RAM, 40GB SSD, up to 50 players",
                features: ["4GB RAM", "40 GB SSD Storage", "DDoS Protection", "Instant Setup", "Oxide Support", "Daily Backups"],
                specifications: { "RAM": "4 GB", "Storage": "40 GB SSD", "Player Slots": "50", "Uptime": "99.9%", "Location": "Asia/EU" },
                images: IMAGES.slice(),
                type: "digital",
                inStock: true,
                rating: 4.6,
                reviews: 112
            }
        ]
    },
    {
        id: 10,
        name: "Canva Templates",
        slug: "canva-templates",
        description: "Professional Canva templates for social media, presentations, marketing, and business needs",
        image: PLACEHOLDER_IMAGES.canva,
        products: [
            {
                id: 1001,
                name: "Social Media Content Pack",
                slug: "social-media-content-pack",
                price: 12.99,
                originalPrice: 24.99,
                description: "A comprehensive pack of 50+ fully customizable Canva templates for Instagram, Facebook, LinkedIn, and Twitter. Includes post templates, story templates, and highlight covers. Perfect for content creators, small businesses, and marketers.",
                shortDescription: "50+ customizable social media templates for all platforms",
                features: ["50+ Templates", "Instagram Posts & Stories", "Facebook & LinkedIn Posts", "Twitter Posts", "Highlight Covers", "Fully Editable in Canva", "Brand Kit Ready", "Commercial License Included"],
                specifications: { "Format": "Canva Template Link", "Templates": "50+", "Platforms": "IG, FB, LI, TW", "License": "Commercial Use", "File Access": "Instant Canva Copy" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.9,
                reviews: 234
            },
            {
                id: 1002,
                name: "Business Presentation Template",
                slug: "business-presentation-template",
                price: 9.99,
                originalPrice: 19.99,
                description: "Professional business presentation template with 30+ unique slides. Includes pitch deck, company overview, financial slides, team introductions, and more. Modern, clean design that's fully customizable in Canva.",
                shortDescription: "30+ professional presentation slides, pitch deck ready",
                features: ["30+ Unique Slides", "Pitch Deck Structure", "Financial Charts & Graphs", "Team & Timeline Slides", "Device Mockups", "Icon Library Included", "Master Slides for Consistency", "Free Fonts Used"],
                specifications: { "Format": "Canva Template Link", "Slides": "30+", "Aspect Ratio": "16:9", "License": "Commercial Use", "File Access": "Instant Canva Copy" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.8,
                reviews: 156
            },
            {
                id: 1003,
                name: "Brand Identity Kit",
                slug: "brand-identity-kit",
                price: 14.99,
                originalPrice: 29.99,
                description: "Complete brand identity kit with logo variations, color palettes, typography system, business cards, social media templates, and brand guidelines. Everything you need to launch a professional brand in Canva.",
                shortDescription: "Complete brand kit: logos, colors, fonts, guidelines, social templates",
                features: ["Logo Variations (Primary, Secondary, Icon)", "Color Palette (Primary & Secondary)", "Typography System (Headings & Body)", "Business Card Templates", "Letterhead & Envelope", "Social Media Templates (12)", "Brand Guidelines Document", "Favicon & App Icon Templates"],
                specifications: { "Format": "Canva Template Link", "Components": "20+", "License": "Commercial Use", "File Access": "Instant Canva Copy", "Customizable": "Fully Editable" },
                images: IMAGES.slice(),
                type: "digital",
                downloadLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE",
                inStock: true,
                rating: 4.9,
                reviews: 89
            }
        ]
    }
];

// Create a flattened products array for easier filtering
window.products = [];
categories.forEach(function(cat) {
    cat.products.forEach(function(p) {
        p.category = cat.slug;
        window.products.push(p);
    });
});

// Free Downloads - resources users can grab at no cost
window.freeDownloads = [
    {
        id: 'fd1',
        name: 'Free Website Templates',
        description: 'A pack of ready-to-use HTML/CSS website templates you can customize and launch in minutes.',
        image: PLACEHOLDER_IMAGES.templates,
        tag: 'Web Design',
        fileUrl: 'files/free-website-templates.zip',
        fileSize: '8 MB'
    },
    {
        id: 'fd2',
        name: 'CapCut Account',
        description: 'Get started with a free CapCut account and unlock pro editing features for your videos.',
        image: PLACEHOLDER_IMAGES.stickers,
        tag: 'Account',
        fileUrl: 'files/capcut-account.txt',
        fileSize: '1 MB'
    },
    {
        id: 'fd3',
        name: 'Free Adobe Photoshop',
        description: 'Free trial setup guide and resources to start editing like a pro with Adobe Photoshop.',
        image: PLACEHOLDER_IMAGES.frames,
        tag: 'Software',
        fileUrl: 'files/free-adobe-photoshop.zip',
        fileSize: '2 GB'
    },
    {
        id: 'fd4',
        name: 'Free Source Code Database',
        description: 'A collection of open-source scripts and snippets to jumpstart your next coding project.',
        image: PLACEHOLDER_IMAGES.ebooks,
        tag: 'Code',
        fileUrl: 'files/free-source-code-database.zip',
        fileSize: '150 MB'
    },
    {
        id: 'fd5',
        name: 'Free Wifi Hacker Tool',
        description: 'A free utility toolkit for network analysis and wifi diagnostics on your own devices.',
        image: PLACEHOLDER_IMAGES.movies,
        tag: 'Tool',
        fileUrl: 'files/free-wifi-hacker-tool.zip',
        fileSize: '25 MB'
    }
];

