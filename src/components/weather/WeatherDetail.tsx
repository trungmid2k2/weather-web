import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface SingleWeatheDetailProps {
  infor: string;
  icon: any;
  value: string;
}

export interface WeatherDetailProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}
export default function WeatherDetail(props: WeatherDetailProps) {
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        infor="Visability"
        value={props.visability}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        infor="Humidity"
        value={props.humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        infor="WindSpeed"
        value={props.windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        infor="Air Pressure"
        value={props.airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        infor="Sunrise"
        value={props.sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        infor="Sunset"
        value={props.sunset}
      />
    </>
  );
}

const SingleWeatherDetail = (props: SingleWeatheDetailProps) => {
  return (
    <div className="flex justify-between flex-col items-center text-xs px-6 py-4">
      <div>{props.infor}</div>
      <div className="text-3xl">{props.icon}</div>
      <div>{props.value}</div>
    </div>
  );
};
