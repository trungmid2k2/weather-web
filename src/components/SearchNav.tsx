import { placeAtom } from "@/utils/atom";

import { useAtom } from "jotai";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdMyLocation, MdOutlineLocationOn } from "react-icons/md";

export default function SearchNav() {
  const [country, setCountry] = useState("");

  const [place, setPlace] = useAtom(placeAtom);

  async function handleInputOnChange(value: string) {
    setCountry(value);
    if (value.length > 3) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleSubmiSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      // setLoadingCity(false);
      setPlace(country);
    }, 500);
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="sm:block hidden">
        <MdMyLocation className="text-gray-400 text-2xl" />
      </div>
      <div className="sm:block hidden">
        <MdOutlineLocationOn className=" text-3xl" />
      </div>
      <div className="capitalize">{place}</div>
      <div>
        <form className="flex items-center h-10 " onSubmit={handleSubmiSearch}>
          <input
            value={country}
            // onSubmit={handleSubmiSearch}
            onChange={(e) => handleInputOnChange(e.target.value)}
            className="border border-gray-300 rounded-1-sm focus:outline-none focus:border-blue-500 w-[230px] px-4 py-2 h-full"
            type="text"
            placeholder="Search country not city.."
          />
          <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full">
            <IoSearch />
          </button>
        </form>
      </div>
    </div>
  );
}
