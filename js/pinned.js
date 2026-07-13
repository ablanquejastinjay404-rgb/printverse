function PinnedProducts() {
    this.anonKey = 'printverse_pinned';
    this.pinned = this.loadPinned();
}

PinnedProducts.prototype.loadPinned = function() {
    try {
        if (typeof auth !== 'undefined' && auth.isLoggedIn()) {
            var userPinned = auth.getUserPinned();
            return userPinned !== null ? userPinned : [];
        }
        var pinnedData = localStorage.getItem(this.anonKey);
        return pinnedData ? JSON.parse(pinnedData) : [];
    } catch (e) {
        return [];
    }
};

PinnedProducts.prototype.savePinned = function() {
    try {
        if (typeof auth !== 'undefined' && auth.isLoggedIn()) {
            auth.saveUserPinned(this.pinned);
        } else {
            localStorage.setItem(this.anonKey, JSON.stringify(this.pinned));
        }
        this.updatePinnedUI();
    } catch (e) {
        console.error('Error saving pinned products:', e);
    }
};

PinnedProducts.prototype.reload = function() {
    this.pinned = this.loadPinned();
    this.updatePinnedUI();
};

PinnedProducts.prototype.pinProduct = function(product) {
    for (var i = 0; i < this.pinned.length; i++) {
        if (this.pinned[i].productId === product.id) {
            return false;
        }
    }
    this.pinned.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        type: product.type,
        slug: product.slug,
        shortDescription: product.shortDescription,
        categoryName: product.categoryName || 'Other',
        pinnedAt: Date.now()
    });
    this.savePinned();
    return true;
};

PinnedProducts.prototype.unpinProduct = function(productId) {
    var newPinned = [];
    for (var i = 0; i < this.pinned.length; i++) {
        if (this.pinned[i].productId !== productId) {
            newPinned.push(this.pinned[i]);
        }
    }
    this.pinned = newPinned;
    this.savePinned();
};

PinnedProducts.prototype.isPinned = function(productId) {
    for (var i = 0; i < this.pinned.length; i++) {
        if (this.pinned[i].productId === productId) {
            return true;
        }
    }
    return false;
};

PinnedProducts.prototype.getPinnedCount = function() {
    return this.pinned.length;
};

PinnedProducts.prototype.getPinnedProducts = function() {
    return this.pinned.slice();
};

PinnedProducts.prototype.getPinnedById = function(productId) {
    for (var i = 0; i < this.pinned.length; i++) {
        if (this.pinned[i].productId === productId) {
            return this.pinned[i];
        }
    }
    return null;
};

PinnedProducts.prototype.clearPinned = function() {
    this.pinned = [];
    this.savePinned();
};

PinnedProducts.prototype.updatePinnedUI = function() {
    var pinnedCountElements = document.querySelectorAll('.pinned-count');
    var count = this.getPinnedCount();
    for (var i = 0; i < pinnedCountElements.length; i++) {
        pinnedCountElements[i].textContent = count;
        pinnedCountElements[i].style.display = count > 0 ? 'flex' : 'none';
    }
};

var pinned = new PinnedProducts();
