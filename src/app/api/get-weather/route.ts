import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    console.log(apiKey);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${apiKey}`
    );

    const weatherData = await response.json();

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}