/**
 * Apartment Price Tracker
 * Runs daily to check for price changes and deals
 * Can be triggered via cron job or webhook
 */

import * as fs from 'fs';
import * as https from 'https';

interface PriceRecord {
  apartment: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  special: string | null;
  available1BR: number;
}

interface PriceHistory {
  lastUpdated: string;
  records: PriceRecord[];
  alerts: string[];
}

const APARTMENTS_TO_TRACK = [
  {
    name: "Skyhouse Raleigh",
    url: "https://skyhouseraleigh.com/floorplans/",
    pricePattern: /\$[\d,]+(?:\.\d{2})?/g,
  },
  {
    name: "The Dillon",
    url: "https://livedillonraleigh.com/floorplans/",
    pricePattern: /\$[\d,]+/g,
  },
  {
    name: "Link Apartments Glenwood South", 
    url: "https://www.linkglenwood.com/floorplans",
    pricePattern: /\$[\d,]+/g,
  },
  {
    name: "Cortland Cary",
    url: "https://cortland.com/apartments/cortland-cary/floorplans/",
    pricePattern: /\$[\d,]+/g,
  },
];

const HISTORY_FILE = './price-history.json';
const WEBHOOK_URL = process.env.PRICE_ALERT_WEBHOOK || '';

function loadHistory(): PriceHistory {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading history:', e);
  }
  return { lastUpdated: '', records: [], alerts: [] };
}

function saveHistory(history: PriceHistory): void {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

async function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractPrices(html: string, pattern: RegExp): number[] {
  const matches = html.match(pattern) || [];
  return matches
    .map(m => parseInt(m.replace(/[$,]/g, '')))
    .filter(p => p > 500 && p < 5000) // Filter reasonable apartment prices
    .sort((a, b) => a - b);
}

function detectSpecials(html: string): string | null {
  const specialPatterns = [
    /(\d+)\s*months?\s*free/i,
    /free\s*rent/i,
    /move[- ]?in\s*special/i,
    /limited\s*time/i,
    /waived.*fee/i,
  ];
  
  for (const pattern of specialPatterns) {
    const match = html.match(pattern);
    if (match) return match[0];
  }
  return null;
}

async function sendWebhookAlert(message: string): Promise<void> {
  if (!WEBHOOK_URL) {
    console.log('No webhook configured. Alert:', message);
    return;
  }

  const payload = JSON.stringify({
    text: `🏠 Apartment Price Alert\n${message}`,
    timestamp: new Date().toISOString(),
  });

  return new Promise((resolve, reject) => {
    const url = new URL(WEBHOOK_URL);
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
      },
    }, (res) => {
      res.on('end', () => resolve());
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function trackPrices(): Promise<void> {
  console.log('Starting price check...', new Date().toISOString());
  
  const history = loadHistory();
  const today = new Date().toISOString().split('T')[0];
  const newAlerts: string[] = [];

  for (const apt of APARTMENTS_TO_TRACK) {
    try {
      console.log(`Checking ${apt.name}...`);
      const html = await fetchPage(apt.url);
      const prices = extractPrices(html, apt.pricePattern);
      const special = detectSpecials(html);

      if (prices.length === 0) {
        console.log(`  No prices found for ${apt.name}`);
        continue;
      }

      const minPrice = prices[0];
      const maxPrice = prices[prices.length - 1];
      
      // Check for price drops
      const lastRecord = history.records
        .filter(r => r.apartment === apt.name)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      if (lastRecord) {
        const priceDrop = lastRecord.minPrice - minPrice;
        if (priceDrop > 50) {
          const alert = `💰 ${apt.name}: Price dropped $${priceDrop}! Now starting at $${minPrice}`;
          newAlerts.push(alert);
          console.log(`  ALERT: ${alert}`);
        }
        
        if (special && !lastRecord.special) {
          const alert = `🎉 ${apt.name}: New special detected - "${special}"`;
          newAlerts.push(alert);
          console.log(`  ALERT: ${alert}`);
        }
      }

      // Save new record
      history.records.push({
        apartment: apt.name,
        date: today,
        minPrice,
        maxPrice,
        special,
        available1BR: prices.length,
      });

      console.log(`  ${apt.name}: $${minPrice}-$${maxPrice}, ${prices.length} units, Special: ${special || 'None'}`);

    } catch (e) {
      console.error(`  Error checking ${apt.name}:`, e);
    }
  }

  // Send alerts
  if (newAlerts.length > 0) {
    history.alerts.push(...newAlerts.map(a => `[${today}] ${a}`));
    await sendWebhookAlert(newAlerts.join('\n'));
  }

  // Save updated history
  history.lastUpdated = new Date().toISOString();
  saveHistory(history);
  
  console.log('Price check complete!');
}

// Run if called directly
trackPrices().catch(console.error);

export { trackPrices, loadHistory };
