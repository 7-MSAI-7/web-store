// Get product ID and category from URL
const pathParts = window.location.pathname.split('/');
const category = pathParts[2];
const productId = pathParts[3];

// Product data (in a real application, this would come from an API)
const products = {
    perfectPicks: [
        {
            id: "oversized-fit-cotton-t-shirt",
            title: "Oversized Fit Cotton T-shirt",
            price: 190,
            discount: 15,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "t-shirt",
            description: "A comfortable and stylish oversized t-shirt made from high-quality cotton. Perfect for casual everyday wear.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["#000000", "#FFFFFF", "#808080"]
        },
        // ... other products
    ],
    bestSellers: [
        {
            id: "twill-jacket",
            title: "Twill Jacket",
            price: 380,
            discount: 0,
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "jacket",
            description: "A classic twill jacket that combines style and functionality. Perfect for both formal and casual occasions.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["#000000", "#4A4A4A", "#8B4513"]
        },
        // ... other products
    ]
};

// Find the product
const allProducts = [...products.perfectPicks, ...products.bestSellers];
const product = allProducts.find(p => p.id === productId);

if (product) {
    // Update product details
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('main-image').src = product.image;
    document.getElementById('main-image').alt = product.title;
    
    const currentPrice = document.getElementById('current-price');
    const originalPrice = document.getElementById('original-price');
    
    if (product.discount) {
        const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
        currentPrice.textContent = `$${discountedPrice}`;
        originalPrice.textContent = `$${product.price.toFixed(2)}`;
    } else {
        currentPrice.textContent = `$${product.price.toFixed(2)}`;
        originalPrice.style.display = 'none';
    }
    
    document.getElementById('product-description').textContent = product.description;
    
    // Add size options
    const sizeOptions = document.getElementById('size-options');
    product.sizes.forEach(size => {
        const sizeOption = document.createElement('div');
        sizeOption.className = 'size-option';
        sizeOption.textContent = size;
        sizeOption.addEventListener('click', () => {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
            sizeOption.classList.add('selected');
        });
        sizeOptions.appendChild(sizeOption);
    });
    
    // Add color options
    const colorOptions = document.getElementById('color-options');
    product.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            colorOption.classList.add('selected');
        });
        colorOptions.appendChild(colorOption);
    });
    
    // Add to cart functionality
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-option.selected');
        const selectedColor = document.querySelector('.color-option.selected');
        
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        
        if (!selectedColor) {
            alert('Please select a color');
            return;
        }
        
        // In a real application, this would add the item to the cart
        console.log('Added to cart:', {
            product,
            size: selectedSize.textContent,
            color: selectedColor.style.backgroundColor
        });
        
        alert('Product added to cart!');
    });
} else {
    // Product not found
    document.querySelector('.product-detail-content').innerHTML = `
        <div class="error-message">
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <a href="/" class="back-to-home">Back to Home</a>
        </div>
    `;
} 