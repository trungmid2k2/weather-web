"use client";

import Image from "next/image";
import React from "react";

export default function WeatherIcon(props: any & { iconName: string }) {
  return (
    <div className="h-20 w-20">
      <Image
        width={100}
        height={100}
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
        alt="weather icon"
        className="w-full h-full"
      />
    </div>
  );
}
