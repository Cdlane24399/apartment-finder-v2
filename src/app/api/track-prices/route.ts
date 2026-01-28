import { NextRequest, NextResponse } from 'next/server';

// Price tracking API endpoint
// Can be called by Vercel Cron or external webhook

interface PriceRecord {
  apartment: string;
  date: string;
  minPrice: number;
  maxPrice: number;
  special: string | null;
}

// In-memory store (in production, use a database like Vercel KV or Supabase)
let priceHistory: PriceRecord[] = [];

const APARTMENTS_TO_TRACK = [
  { name: "Skyhouse Raleigh", checkUrl: "skyhouseraleigh.com" },
  { name: "The Dillon", checkUrl: "livedillonraleigh.com" },
  { name: "Link Apartments", checkUrl: "linkglenwood.com" },
  { name: "Cortland Cary", checkUrl: "cortland.com" },
  { name: "Camden Carolinian", checkUrl: "camdenliving.com" },
];

export async function GET(request: NextRequest) {
  // Return current price history
  return NextResponse.json({
    lastChecked: new Date().toISOString(),
    tracked: APARTMENTS_TO_TRACK.map(a => a.name),
    history: priceHistory.slice(-50), // Last 50 records
    message: "Use POST to trigger a price check"
  });
}

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret if configured
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date().toISOString().split('T')[0];
    const alerts: string[] = [];

    // Note: In production, you'd want to use a proper scraping service
    // or API. This is a simplified example.
    
    for (const apt of APARTMENTS_TO_TRACK) {
      // Simulated price check - in production, fetch actual prices
      const record: PriceRecord = {
        apartment: apt.name,
        date: today,
        minPrice: 1200 + Math.floor(Math.random() * 500), // Placeholder
        maxPrice: 1800 + Math.floor(Math.random() * 500),
        special: Math.random() > 0.7 ? "Move-in special available" : null,
      };

      // Check for price drops
      const lastRecord = priceHistory
        .filter(r => r.apartment === apt.name)
        .pop();

      if (lastRecord && record.minPrice < lastRecord.minPrice - 50) {
        alerts.push(`💰 ${apt.name}: Price dropped! Now $${record.minPrice}`);
      }

      if (record.special && (!lastRecord || !lastRecord.special)) {
        alerts.push(`🎉 ${apt.name}: New special - ${record.special}`);
      }

      priceHistory.push(record);
    }

    // Send alerts via webhook if configured
    if (alerts.length > 0 && process.env.ALERT_WEBHOOK_URL) {
      await fetch(process.env.ALERT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: `🏠 Apartment Price Alerts:\n${alerts.join('\n')}`,
          timestamp: new Date().toISOString()
        }),
      }).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      checked: APARTMENTS_TO_TRACK.length,
      alerts,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Price tracking error:', error);
    return NextResponse.json({ error: 'Failed to track prices' }, { status: 500 });
  }
}
