import React from "react";
import WeatherDetail, { WeatherDetailProps } from "../WeatherDetail";
import WeatherIcon from "../WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKtoC";


export interface ForecastProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function Forecast(props: ForecastProps) {
  return (
    <div className="w-full flex bg-white rounded-xl my-3 gap-4">
      <div className="flex gap-4 items-center py-4  ">
        <div className="flex items-center flex-col justify-center px-4">
          <WeatherIcon iconName={props.weatehrIcon} />

          <p>{props.date}</p>
          <p className="text-xs"> {props?.day}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-[84px]">
          <div className="text-5xl">{convertKelvinToCelsius(props.temp)}°</div>
          <p className="text-xs space-x-1 whitespace-nowrap  ">
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(props.feels_like)}°</span>
          </p>
          <div className="capitalize text-center">{props.description}</div>
        </div>
      </div>
      <div className="flex justify-between w-full overflow-x-auto">
        <WeatherDetail {...props} />
      </div>
    </div>
  );
}
