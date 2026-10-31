import React from 'react';
import { useState } from 'react';
import cloudsimg from "../Images/cloudsimg.svg"
import Rain from "../Images/Rain.svg"
import Sunny from "../Images/Sunny.svg"
const WeatherApp = () => {
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
    const API_Key = "f3441a6fa573150fef79002a8338cfdf"
    const [Text, setText] = useState("");
    const [Data, setData] = useState(null)

    const handleInput = (e) => {
        setText(e.target.value)
        // console.log(e.target.value);

    }
    const Myfun = async () => {
        if (Text === "") {
            alert("Please Enter City Name")
            return;
        }
        const get = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${Text}&appid=${API_Key}&units=metric`);
        const JsonData = await get.json()
        console.log(JsonData);
        setData(JsonData)


    }
    // Myfun()
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex justify-center items-center p-4">
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>

                    <h1 className="text-3xl font-bold text-white">Weather App</h1>
                    <p className="text-blue-200 mt-2">
                        Check weather of your city
                    </p>
                </div>
                {/* Search Bar */}

                <div className="flex gap-2 mb-6">

                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={Text}
                        onChange={handleInput}
                        onKeyDown={(e) => e.key === "Enter" && Myfun()}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-400"
                    />

                    <button
                        onClick={Myfun}
                        className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition"
                    >
                        Search
                    </button> </div>

                {Data && (
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl">

                        {/* City Name */}

                        <div className="text-center">

                            <h2 className="text-2xl font-semibold">
                                {Data.name}, {Data.sys.country}
                            </h2>

                            <p className="text-blue-200 mt-1 capitalize">
                                {Data.weather[0].description}
                            </p>

                        </div>

                        {/* Image & Temperature */}

                        <div className="flex items-center justify-center gap-4 my-6">

                            <img
                                src={
                                    Data.weather[0].main === "Clouds" ? cloudsimg :
                                        Data.weather[0].main === "Rain" ||
                                            Data.weather[0].main === "Drizzle" ? Rain :
                                            Data.weather[0].main === "Clear" ? Sunny :
                                                cloudsimg
                                }
                                alt="Weather"
                                className="w-30 h-30 object-contain"
                            />

                            <div className="text-center">

                                <h1 className="text-6xl font-bold">
                                    {Math.round(Data.main.temp)}°C
                                </h1>

                                <p className="text-blue-200 mt-3">
                                    Feels like {Math.round(Data.main.feels_like)}°C
                                </p>

                            </div>

                        </div>

                        {/* Weather Details */}

                        <div className="grid grid-cols-3 gap-3 mt-8">

                            <div className="bg-white/10 rounded-2xl p-3 text-center">
                                <p className="text-2xl">💧</p>
                                <p className="text-sm text-blue-200 mt-2">Humidity</p>
                                <h3 className="font-bold mt-1">
                                    {Data.main.humidity}%
                                </h3>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-3 text-center">
                                <p className="text-2xl">💨</p>
                                <p className="text-sm text-blue-200 mt-2">Wind</p>
                                <h3 className="font-bold mt-1">
                                    {Data.wind.speed} m/s
                                </h3>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-3 text-center">
                                <p className="text-2xl">🌡️</p>
                                <p className="text-sm text-blue-200 mt-2">Pressure</p>
                                <h3 className="font-bold mt-1">
                                    {Data.main.pressure} hPa
                                </h3>
                            </div>

                        </div>

                    </div>
                )}

                {/* Footer */}

                <p className="text-center text-blue-300/60 text-sm mt-6">
                    Weather data powered by OpenWeatherMap
                </p>

            </div>

        </div>

    );
}

export default WeatherApp;
