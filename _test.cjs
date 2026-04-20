
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const results = {};
  
  await page.goto('https://penz7.github.io/android-zero-to-hero/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // CSS variables
  const vars = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    return {
      '--background': s.getPropertyValue('--background').trim(),
      '--foreground': s.getPropertyValue('--foreground').trim(),
      '--primary': s.getPropertyValue('--primary').trim(),
      '--font-sans': s.getPropertyValue('--font-sans').trim(),
      '--radius': s.getPropertyValue('--radius').trim(),
    };
  });
  results['css_vars'] = vars;
  
  // Body styling
  const body = await page.evaluate(() => {
    const s = getComputedStyle(document.body);
    return {
      bg: s.backgroundColor,
      color: s.color,
      fontFamily: s.fontFamily.substring(0, 30),
      display: s.display,
      flexDirection: s.flexDirection,
      minHeight: s.minHeight,
    };
  });
  results['body'] = body;
  
  // CTA button
  const cta = await page.evaluate(() => {
    const btn = document.querySelector('a[href*="kotlin-intro"]');
    if (!btn) return null;
    const s = getComputedStyle(btn);
    return { bg: s.backgroundColor, color: s.color, borderRadius: s.borderRadius };
  });
  results['cta'] = cta;
  
  // Container
  const container = await page.evaluate(() => {
    const el = document.querySelector('.container');
    return el ? getComputedStyle(el).maxWidth : null;
  });
  results['container'] = container;
  
  // OG image
  const ogImage = await page.evaluate(() => {
    const meta = document.querySelector('meta[property="og:image"]');
    return meta ? meta.content : null;
  });
  results['og_image'] = ogImage;
  
  // Screenshot
  await page.screenshot({ path: '/Users/penz/.hermes/cache/screenshots/pw_fixed.png' });
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
