
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto('https://penz7.github.io/android-zero-to-hero/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Debug CSS variables
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    return {
      '--background': style.getPropertyValue('--background'),
      '--foreground': style.getPropertyValue('--foreground'),
      '--primary': style.getPropertyValue('--primary'),
      '--font-sans': style.getPropertyValue('--font-sans'),
      '--radius': style.getPropertyValue('--radius'),
    };
  });
  console.log('CSS VARS:', JSON.stringify(cssVars, null, 2));
  
  // Check if globals.css is loaded
  const stylesheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(s => ({
      href: s.href,
      rules: (() => { try { return s.cssRules.length } catch { return 'CORS' } })()
    }));
  });
  console.log('STYLESHEETS:', JSON.stringify(stylesheets, null, 2));
  
  // Check body computed styles
  const bodyStyles = await page.evaluate(() => {
    const s = getComputedStyle(document.body);
    return {
      backgroundColor: s.backgroundColor,
      color: s.color,
      fontFamily: s.fontFamily,
      minHeight: s.minHeight,
      display: s.display,
      flexDirection: s.flexDirection
    };
  });
  console.log('BODY:', JSON.stringify(bodyStyles, null, 2));

  // Screenshot
  await page.screenshot({ path: '/Users/penz/.hermes/cache/screenshots/pw_debug.png', fullPage: false });
  
  await browser.close();
})();
