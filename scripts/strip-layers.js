const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'out/_next/static/chunks');

if (!fs.existsSync(cssDir)) {
  console.log('CSS directory not found');
  process.exit(0);
}

const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of cssFiles) {
  const filePath = path.join(cssDir, file);
  let css = fs.readFileSync(filePath, 'utf8');
  
  // Remove @layer declarations and their opening braces
  // But keep the content inside
  css = css.replace(/@layer\s+[\w-]+\s*\{/g, '');
  css = css.replace(/@layer\s+[\w-]+;/g, '');
  
  fs.writeFileSync(filePath, css);
  console.log(`Stripped @layer from: ${file} (${css.length} bytes)`);
}

console.log('Done! CSS layers stripped.');
