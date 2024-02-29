import { convertKelvinToCelsius } from "@/utils/convertKtoC";
import { format, formatDate, fromUnixTime, parseISO } from "date-fns";

import React, { useState } from "react";
import WeatherIcon from "../WeatherIcon";
import WeatherDetail from "../WeatherDetail";
import { convertWindSpeed } from "@/utils/convertWindspeed";

export default function Today(props: any) {
  const [isShow, setIsShow] = useState(false);

  const firstData = props?.list[0];
  return (
    <div className="space-y-4 ">
      <div>
        <h2 className="flex items-center text-2xl gap-1">
          {formatDate(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
          <p className="text-lg">
            ({formatDate(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
          </p>
        </h2>
        <div className="w-full flex border rounded-xl px-6 bg-white gap-10 py-4 mt-2">
          <div className="flex flex-col px-4 items-center justify-center">
            <div className="text-5xl">
              {convertKelvinToCelsius(firstData.main.temp ?? 296.37)}°
            </div>
            <p className="text-xs space-x-1 whitespace-nowrap  ">
              <span>Feels like</span>
              <span>
                {convertKelvinToCelsius(firstData.main.feels_like ?? 296.37)}°
              </span>
            </p>
            <div className="text-xs space-x-2">
              <span>
                {convertKelvinToCelsius(firstData.main.temp_min ?? 296.37)}°↓
              </span>
              <span>
                {convertKelvinToCelsius(firstData.main.temp_max ?? 296.37)}°↑
              </span>
            </div>
          </div>
          <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
            {props?.list.map((item: any, index: any) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center "
              >
                <div className=" whitespace-nowrap">
                  {formatDate(parseISO(item?.dt_txt), "h:mm a")}
                </div>
                <div className="relative capitalize group">
                  <WeatherIcon iconName={item.weather[0].icon} />
                  <div className="absolute hidden text-[9px] text-white bg-[#48474c] capitalize top-[70%] right-0 group-hover:block ">
                    {item.weather[0].description}
                  </div>
                </div>
                <div>{convertKelvinToCelsius(item.main.temp ?? 296.37)}° </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex justify-center items-center flex-col p-4 bg-white w-fit border rounded-xl">
          <div className="capitalize text-center">
            {firstData.weather[0].description}
          </div>
          <div>
            <WeatherIcon iconName={firstData.weather[0].icon} />
          </div>
        </div>

        <div className="flex justify-between w-full bg-[#fbe46a] rounded-xl overflow-x-auto">
          <WeatherDetail
            visability={firstData.visibility / 1000 + " km"}
            humidity={firstData.main.humidity + " %"}
            windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
            airPressure={firstData.main.pressure + " hPa"}
            sunrise={format(
              fromUnixTime(props?.city.sunrise ?? 1702517657),
              "H:mm"
            )}
            sunset={format(fromUnixTime(props?.city.sunset ?? 111), "H:mm")}
          />
        </div>
      </div>
    </div>
  );
}
