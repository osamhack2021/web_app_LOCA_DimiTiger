interface Weather {
  temp: number;
  humidity: number;
  pressure: number;
  description: string;
  weathercode: number;
  rain: string | boolean | null;
}
export default Weather;
