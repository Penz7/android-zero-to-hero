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
  const css = fs.readFileSync(filePath, 'utf8');
  
  // Strategy: Remove @layer NAME { and its matching closing }
  // by tracking brace depth
  let result = '';
  let i = 0;
  
  while (i < css.length) {
    // Check for @layer declaration
    const layerMatch = css.slice(i).match(/^@layer\s+[\w-]+\s*\{/);
    if (layerMatch) {
      // Skip the @layer declaration (including the opening {)
      i += layerMatch[0].length;
      // Now find the matching closing } by tracking depth
      let depth = 1;
      let contentStart = i;
      while (i < css.length && depth > 0) {
        if (css[i] === '{') depth++;
        if (css[i] === '}') depth--;
        if (depth > 0) i++;
      }
      // Add the content (without the outer braces)
      result += css.slice(contentStart, i);
      i++; // skip the closing }
      continue;
    }
    
    // Check for standalone @layer declaration (@layer X;)
    const standaloneMatch = css.slice(i).match(/^@layer\s+[\w-]+;\s*/);
    if (standaloneMatch) {
      i += standaloneMatch[0].length;
      continue;
    }
    
    result += css[i];
    i++;
  }
  
  // Verify brace balance
  let opens = 0, closes = 0;
  for (const c of result) {
    if (c === '{') opens++;
    if (c === '}') closes++;
  }
  
  fs.writeFileSync(filePath, result);
  console.log(`${file}: ${css.length} → ${result.length} bytes | braces: ${opens}/{closes} ${opens === closes ? '✅' : '❌'}`);
}

console.log('Done!');
