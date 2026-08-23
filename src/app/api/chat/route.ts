import { NextResponse } from 'next/server';

// Fixe la durée max d'exécution de la fonction Vercel (limite le coût/durée)
export const maxDuration = 30;

// Simple In-Memory Rate Limiter (Input Caps & Basic Rate Limit)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const ipMap = new Map<string, { count: number; lastReset: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const userRate = ipMap.get(ip) || { count: 0, lastReset: now };

  // Reinitialisation du compteur si la fenetre est ecoulee
  if (now - userRate.lastReset > RATE_LIMIT_WINDOW) {
    userRate.count = 0;
    userRate.lastReset = now;
  }

  if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }

  const body = await req.json();

  // Input Cap: Limiter la taille des prompts recus pour economiser les tokens
  if (body.prompt && body.prompt.length > 500) {
    return NextResponse.json(
      { error: 'Prompt length exceeds max limit of 500 characters.' },
      { status: 400 }
    );
  }

  userRate.count += 1;
  ipMap.set(ip, userRate);

  return NextResponse.json({ message: 'Request processed successfully' });
}