// Product data
const products = {
    perfectPicks: [
        {
            id: "oversized-fit-cotton-t-shirt",
            title: "Oversized Fit Cotton T-shirt",
            price: 190,
            discount: 15,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "t-shirt"
        },
        {
            id: "button-detail-jacket",
            title: "Button-detail Jacket",
            price: 420,
            discount: 20,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "jacket"
        },
        {
            id: "linen-blend-shirt",
            title: "Linen-blend Shirt",
            price: 290,
            discount: 10,
            image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "shirt"
        }
    ],
    bestSellers: [
        {
            id: "twill-jacket",
            title: "Twill Jacket",
            price: 380,
            discount: 0,
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "jacket"
        },
        {
            id: "formal-suit",
            title: "Formal Suit",
            price: 590,
            discount: 25,
            image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "suit"
        },
        {
            id: "polo-shirt",
            title: "Polo Shirt",
            price: 120,
            discount: 0,
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60",
            category: "men",
            subcategory: "shirt"
        }
    ]
};

// Function to create product card HTML
function createProductCard(product) {
    const discountedPrice = product.discount 
        ? (product.price * (1 - product.discount / 100)).toFixed(2)
        : product.price.toFixed(2);

    return `
        <div class="product-card" onclick="navigateToProductDetail('${product.id}', '${product.category}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">$${discountedPrice}</span>
                    ${product.discount ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ''}
                </div>
                <button class="buy-now-btn">Buy Now</button>
            </div>
        </div>
    `;
}

// Function to render products
function renderProducts() {
    // Render Perfect Picks
    const perfectPicksGrid = document.querySelector('#perfect-picks-grid');
    if (perfectPicksGrid) {
        perfectPicksGrid.innerHTML = products.perfectPicks.map(product => createProductCard(product)).join('');
    }

    // Render Best Sellers
    const bestSellersGrid = document.querySelector('#best-sellers-grid');
    if (bestSellersGrid) {
        bestSellersGrid.innerHTML = products.bestSellers.map(product => createProductCard(product)).join('');
    }
}

// Search functionality
const searchBtn = document.querySelector('.search-btn');
const searchPopup = document.getElementById('search-popup');
const closeSearchBtn = document.querySelector('.close-search');
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

// Show search popup
searchBtn.addEventListener('click', () => {
    searchPopup.classList.add('active');
    searchInput.focus();
});

// Close search popup
closeSearchBtn.addEventListener('click', () => {
    searchPopup.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
});

// Close search popup when clicking outside
searchPopup.addEventListener('click', (e) => {
    if (e.target === searchPopup) {
        searchPopup.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }

    // Combine all products for search
    const allProducts = [...products.perfectPicks, ...products.bestSellers];
    
    // Filter products based on search query
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
    );

    // Display search results
    searchResults.innerHTML = filteredProducts.map(product => `
        <div class="search-result-item" data-id="${product.id}" data-category="${product.category}">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <p class="product-price">$${product.discount 
                    ? (product.price * (1 - product.discount / 100)).toFixed(2)
                    : product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');

    // Add click event to search results
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            const category = item.dataset.category;
            window.location.href = `/category/${category}/${id}`;
        });
    });
});

// Product detail page navigation
function navigateToProductDetail(id, category) {
    window.location.href = `/category/${category}/${id}.html`;
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Implement newsletter subscription
        console.log('Newsletter subscription:', email);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
}); 