/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const partnersDir = path.join(__dirname, '../public/images/partners');

// Ensure directory exists
if (!fs.existsSync(partnersDir)) {
  fs.mkdirSync(partnersDir, { recursive: true });
}

const logos = [
  {
    name: 'icog.png',
    urls: [
      'https://icog-labs.com/wp-content/uploads/2020/05/icog-logo.png',
      'https://icog-labs.com/logo.png',
      'https://icog-labs.com/assets/images/logo.png'
    ]
  },
  {
    name: 'gebeya.png',
    urls: [
      'https://gebeya.com/wp-content/uploads/2020/05/gebeya-logo.png',
      'https://www.gebeya.com/logo.png',
      'https://gebeya.com/assets/images/logo.png'
    ]
  },
  {
    name: 'ethio-telecom.png',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/3b/Ethio_telecom2.png',
      'https://www.ethiotelecom.et/wp-content/uploads/2021/06/ethio-telecom-logo.png'
    ]
  },
  {
    name: 'safaricom.png',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Safaricom_New_Logo.svg/512px-Safaricom_New_Logo.svg.png',
      'https://www.safaricom.et/assets/images/logo.png'
    ]
  },
  {
    name: 'ethiopian-airlines.png',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ethiopian_Airlines_logo.svg/512px-Ethiopian_Airlines_logo.svg.png',
      'https://www.ethiopianairlines.com/assets/images/logo.png'
    ]
  },
  {
    name: 'chapa.png',
    urls: [
      'https://chapa.co/assets/images/logo.svg',
      'https://chapa.co/logo.png',
      'https://chapa.co/assets/logo.svg'
    ]
  },
  {
    name: 'kifiya.png',
    urls: [
      'https://kifiya.com/wp-content/uploads/2021/06/kifiya-logo.png',
      'https://kifiya.com/logo.png',
      'https://kifiya.com/assets/images/logo.png'
    ]
  },
  {
    name: 'mpesa.png',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png'
    ]
  },
  {
    name: 'insa.png',
    urls: [
      'https://www.insa.gov.et/wp-content/uploads/2021/06/INSA-Logo.png',
      'https://insa.gov.et/logo.png'
    ]
  }
];

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(new Error('Timeout'));
    });
  });
}

async function downloadLogo(logo) {
  const filepath = path.join(partnersDir, logo.name);
  
  // Skip if already exists
  if (fs.existsSync(filepath)) {
    console.log(`⊘ Skipped (exists): ${logo.name}`);
    return true;
  }
  
  for (const url of logo.urls) {
    try {
      await downloadFile(url, filepath);
      return true;
    } catch (error) {
      // Try next URL
      continue;
    }
  }
  
  console.error(`✗ Failed to download: ${logo.name}`);
  return false;
}

async function downloadAllLogos() {
  console.log('Downloading partner logos...\n');
  
  const results = await Promise.all(logos.map(logo => downloadLogo(logo)));
  
  const successCount = results.filter(r => r).length;
  console.log(`\n${successCount}/${logos.length} logos downloaded successfully.`);
  
  if (successCount < logos.length) {
    console.log('\nSome logos need to be added manually. Please add the missing images to:');
    console.log('public/images/partners/');
  }
}

downloadAllLogos().catch(console.error);
