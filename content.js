console.log('[Mercari Warning] Script loading...');

(function() {
  console.log('[Mercari Warning] Extension started!');
  console.log('[Mercari Warning] Current URL:', window.location.href);

  const warningTitle = chrome.i18n.getMessage('warningTitle') || 'Pay on Delivery';
  const warningMessage = chrome.i18n.getMessage('warningMessage') || 'This item is cash on delivery.';
  const closeWarningAriaLabel = chrome.i18n.getMessage('closeWarningAriaLabel') || 'Close warning';
  
  if (!window.location.pathname.includes('/item/')) {
    console.log('[Mercari Warning] Not on item page, pathname:', window.location.pathname);
    return;
  }

  console.log('[Mercari Warning] Extension loaded on item page');

  function checkItemDelivery() {
    console.log('[Mercari Warning] Checking item delivery method...');
    
    const pageText = document.body.innerText;
    const pageTextLower = pageText.toLowerCase();
    console.log('[Mercari Warning] Page text length:', pageText.length);
    
    const isPayOnDelivery = pageText.includes('着払い') || 
                            pageText.includes('代引き') ||
                            pageText.includes('代金引換') ||
                            pageTextLower.includes('paid on delivery') ||
                            pageTextLower.includes('payment on delivery') ||
                            pageTextLower.includes('pay on delivery') ||
                            pageTextLower.includes('cash on delivery') ||
                            pageTextLower.includes('cod') ||
                            pageText.includes('Paid on delivery');
    

    console.log('[Mercari Warning] isPayOnDelivery:', isPayOnDelivery);

    if (isPayOnDelivery) {
      console.log('[Mercari Warning] Showing pay-on-delivery warning');
      showWarning(warningTitle, warningMessage);
    } else {
      console.log('[Mercari Warning] No payment method warning needed');
    }
  }

  function showWarning(title, message) {
    const existing = document.getElementById('mercari-warning-box');
    if (existing) {
      existing.remove();
    }

    const warningBox = document.createElement('div');
    warningBox.id = 'mercari-warning-box';
    warningBox.className = 'mercari-warning';
    
    warningBox.innerHTML = `
      <div class="mercari-warning-header">
        <span class="mercari-warning-title">${title}</span>
        <button class="mercari-warning-close" aria-label="${closeWarningAriaLabel}">×</button>
      </div>
      <div class="mercari-warning-content">
        ${message}
      </div>
    `;

    document.body.appendChild(warningBox);

    const closeBtn = warningBox.querySelector('.mercari-warning-close');
    closeBtn.addEventListener('click', function() {
      warningBox.remove();
    });
  }

  const observer = new MutationObserver(function() {
    const pageText = document.body.innerText;
    if (pageText.includes('Shipping cost') || pageText.includes('配送料の負担')) {
      console.log('[Mercari Warning] Item details detected, checking delivery method');
      checkItemDelivery();
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  setTimeout(function() {
    console.log('[Mercari Warning] Fallback check (2s)');
    checkItemDelivery();
  }, 2000);

  setTimeout(function() {
    console.log('[Mercari Warning] Fallback check (5s)');
    checkItemDelivery();
  }, 5000);
})();
