# Mercari Payment Warning Extension

A browser extension that warns you about items on Mercari that require payment on delivery.



### Chrome/Edge
1. Clone or download this extension
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `mercari-extension` folder
6. The extension is now active!

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file from the `mercari-extension` folder
4. The extension is now active!

## How It Works

When you visit a Mercari item page, the extension:
1. Checks for payment method indicators (Japanese text: 着払い, 代引き)
2. Shows a warning box if a pay-on-delivery condition is found
3. Lets you close the warning by clicking the X button

## Files

- `manifest.json` - Extension configuration
- `content.js` - Script that detects payment methods
- `warning.css` - Styling for the warning box
