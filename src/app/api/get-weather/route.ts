import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    console.log(apiKey);

    const response = await fetch(
      'https://api.openweathermappr.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=YOUR_API_KEY'
    );

    const weatherData = await response.json();

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}