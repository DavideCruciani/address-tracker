import { useState, useEffect } from 'react'
import Map from "./Map"

const Page = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [ipResult, setIpResult] = useState('');
  const [locationResult, setLocationResult] = useState('');
  const [timezoneResult, setTimezoneResult] = useState('');
  const [ispResult, setIspResult] = useState('');

  const handleGoButtonClick = () => {
    const input = document.getElementById('ipInput') as HTMLInputElement;
    setIpAddress(input.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if(ipAddress === "") return;
      try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8KNDDbbhqIFdHRQrCjIztIql1PV1b&ipAddress=${ipAddress}`);
        if (!response.ok) {
          throw new Error('Error occurred while fetching data');
        }
        const jsonData = await response.json();
        setIpResult(jsonData.ip);
        setLocationResult(jsonData.location.region);
        setTimezoneResult(jsonData.location.timezone);
        setIspResult(jsonData.isp);
        setLon(jsonData.location.lng);
        setLat(jsonData.location.lat);
        handleIpAddressFetched();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [ipAddress]);

  const handleIpAddressFetched = () => {
    setIpAddress('');
  };


  return (
    <section className="bg-gray-300 min-h-screen py-6">
        <div className="container mx-auto font-Electrolize">
          <h1 className="text-[#22577a] text-6xl text-center">IP ADDRESS TRACKER</h1>
          <p className="text-[#22577a] text-xl text-center my-3">Insert an IP Address and watch the results!</p>
          <div className="flex justify-center">
            <input id='ipInput' type="text" className="w-1/3 p-2 outline-none rounded-l-lg text-xl" />
            <button className="bg-[#22577a] hover:bg-[#143245] text-white p-3 rounded-r-lg" onClick={handleGoButtonClick}>GO</button>
          </div>
          <div className="flex justify-center my-12">
            <div className="bg-white text-[#22577a] p-4 sm:w-[300px] rounded-l-lg flex flex-col gap-5">
              <p className="text-xl">IP Address</p>
              <p className="text-2xl font-bold">{ipResult}</p>
            </div>
            <div className="bg-white text-[#22577a] p-4 sm:w-[300px] flex flex-col gap-5">
              <p className="text-xl">Location</p>
              <p className="text-2xl font-bold">{locationResult}</p>
            </div>
            <div className="bg-white text-[#22577a] p-4 sm:w-[300px] flex flex-col gap-5">
              <p className="text-xl">Timezone</p>
              <p className="text-2xl font-bold">{timezoneResult}</p>
            </div>
            <div className="bg-white text-[#22577a] p-4 sm:w-[300px] rounded-r-lg flex flex-col gap-5">
              <p className="text-xl">ISP</p>
              <p className="text-2xl font-bold">{ispResult}</p>
            </div>
          </div>
          <Map lon={lon}  lat={lat}/>
        </div>
      </section>
  )
}

export default Page