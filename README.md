# Mercari Payment Warning Extension

A browser extension that warns you about items on Japanese Mercari that require payment on delivery or are handled by sellers.

## Features

- 🚨 Detects pay-on-delivery items (着払い / 代引き)
- 📦 Detects seller-handled shipping items
- 💬 Shows a prominent warning box on the right side of the page
- ✖️ Easy-to-close warning with an X button
- 📱 Responsive design for all screen sizes

## Installation

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
2. Checks for seller-handled shipping indicators
3. Shows a warning box if either condition is found
4. Lets you close the warning by clicking the X button

## Files

- `manifest.json` - Extension configuration
- `content.js` - Script that detects payment methods
- `warning.css` - Styling for the warning box

## Notes

- The selectors and text patterns may need adjustment as Mercari updates their site
- Currently works on both mercari.com and jp.mercari.com
- Extension only runs on item pages (/item/*)

## Future Improvements

- [ ] Add options page to customize warning text
- [ ] Add ability to filter by specific categories
- [ ] Store user preferences locally
- [ ] Add sound/notification alerts
