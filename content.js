// Content script that runs on Mercari item pages
console.log('[Mercari Warning] Script loading...');

(function() {
  console.log('[Mercari Warning] Extension started!');
  console.log('[Mercari Warning] Current URL:', window.location.href);
  
  // Check if we're on a Mercari item page
  if (!window.location.pathname.includes('/item/')) {
    console.log('[Mercari Warning] Not on item page, pathname:', window.location.pathname);
    return;
  }

  console.log('[Mercari Warning] Extension loaded on item page');

  function checkItemDelivery() {
    console.log('[Mercari Warning] Checking item delivery method...');
    
    const pageText = document.body.innerText;
    console.log('[Mercari Warning] Page text length:', pageText.length);

    // Debug: Log all text to find the actual shipping info
    console.log('[Mercari Warning] Full page text:', pageText);
    
    // Check for pay-on-delivery indicators
    // English: "Paid on delivery", "pay on delivery", "Payment on delivery"
    // Japanese: 着払い, 代引き, 代金引換, 着払い
    const isPayOnDelivery = pageText.includes('着払い') || 
                            pageText.includes('代引き') ||
                            pageText.includes('代金引換') ||
                            pageText.toLowerCase().includes('paid on delivery') ||
                            pageText.toLowerCase().includes('payment on delivery') ||
                            pageText.toLowerCase().includes('pay on delivery') ||
                            pageText.toLowerCase().includes('cash on delivery') ||
                            pageText.toLowerCase().includes('cod') ||
                            pageText.includes('Paid on delivery');
    
    // Check for seller-handled shipping
    // English: "Seller pays"
    // Japanese: 出品者が送料負担, 送料込み, 出品者送料負担
    const isSellerHandled = pageText.includes('出品者が送料負担') ||
                           pageText.includes('出品者送料負担') ||
                           pageText.includes('送料込み') ||
                           pageText.toLowerCase().includes('seller pays') ||
                           pageText.toLowerCase().includes('seller handles') ||
                           pageText.toLowerCase().includes('seller paid');

    console.log('[Mercari Warning] isPayOnDelivery:', isPayOnDelivery);
    console.log('[Mercari Warning] isSellerHandled:', isSellerHandled);

    if (isPayOnDelivery) {
      console.log('[Mercari Warning] Showing pay-on-delivery warning');
      showWarning('Pay on Delivery', 'This item requires payment on delivery (着払い). Please be aware of this before purchasing.');
    } else if (isSellerHandled) {
      console.log('[Mercari Warning] Showing seller-handled warning');
      showWarning('Seller Handled', 'This item shipping is handled by the seller (出品者が送料負担).');
    } else {
      console.log('[Mercari Warning] No payment method warning needed');
    }
  }

  function showWarning(title, message) {
    // Remove existing warning if present
    const existing = document.getElementById('mercari-warning-box');
    if (existing) {
      existing.remove();
    }

    // Create warning box
    const warningBox = document.createElement('div');
    warningBox.id = 'mercari-warning-box';
    warningBox.className = 'mercari-warning';
    
    warningBox.innerHTML = `
      <div class="mercari-warning-header">
        <span class="mercari-warning-title">${title}</span>
        <button class="mercari-warning-close" aria-label="Close warning">×</button>
      </div>
      <div class="mercari-warning-content">
        ${message}
      </div>
    `;

    // Add to page
    document.body.appendChild(warningBox);

    // Close button handler
    const closeBtn = warningBox.querySelector('.mercari-warning-close');
    closeBtn.addEventListener('click', function() {
      warningBox.remove();
    });
  }

  // Use MutationObserver to watch for dynamic content loading
  const observer = new MutationObserver(function(mutations) {
    const pageText = document.body.innerText;
    // Check if shipping cost text exists (indicates item details loaded)
    if (pageText.includes('Shipping cost') || pageText.includes('配送料の負担')) {
      console.log('[Mercari Warning] Item details detected, checking delivery method');
      checkItemDelivery();
      // Stop observing after first check
      observer.disconnect();
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // Fallback: check after delays
  setTimeout(function() {
    console.log('[Mercari Warning] Fallback check (2s)');
    checkItemDelivery();
  }, 2000);

  setTimeout(function() {
    console.log('[Mercari Warning] Fallback check (5s)');
    checkItemDelivery();
  }, 5000);
})();
