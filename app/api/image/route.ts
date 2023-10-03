import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { Configuration, OpenAIApi } from 'openai';

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt, resolution = '512x512', amount = 1 } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized User!', { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API key not configured!', {
        status: 500,
      });
    }

    if (!prompt) new NextResponse('Prompt is required!', { status: 400 });

    if (!amount) new NextResponse('Amount is required!', { status: 400 });

    if (!resolution)
      new NextResponse('Resolution is required!', { status: 400 });

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      new NextResponse('Free trial has expired.', {
        status: 403,
      });

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log('[IMAGE_ERROR:] ', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
