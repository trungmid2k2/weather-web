"use client";

import SearchNav from "@/components/SearchNav";
import Forecast from "@/components/weather/forecast/Forecast";
import Today from "@/components/weather/today/Today";
import { placeAtom } from "@/utils/atom";
import { metersToKilometers } from "@/utils/visibility";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { useQuery } from "react-query";

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CityCoord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: CityCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  console.log("data=>", data);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry: any) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white ">
        <div className=" h-[80px] w-full sm:flex-row flex flex-col justify-between items-center max-w-7xl mx-auto px-3">
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-3xl text-gray-500">Weather</h2>
            <MdSunny className="text-3xl text-yellow-300" />
          </div>
          <SearchNav />
        </div>
      </div>
      <div>
        <main className="max-w-7xl mx-auto px-3 pt-4 pb-10 mt-5">
          <Today {...data} />
          <div className="text-2xl my-5">Forcast (7 days)</div>
          {firstDataForEachDate.map((d, i) => (
            <Forecast
              key={i}
              description={d?.weather[0].description ?? ""}
              weatehrIcon={d?.weather[0].icon ?? "01d"}
              date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
              day={d ? format(parseISO(d.dt_txt), "EEEE") : ""}
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp_max ?? 0}
              temp_min={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa `}
              humidity={`${d?.main.humidity}% `}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1702517657),
                "H:mm"
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1702517657),
                "H:mm"
              )}
              visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
              windSpeed={`${d?.wind.speed ?? 1.64}  km/h`}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
