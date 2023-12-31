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
        alert("Invalid IP Address!")
      }
    };

    fetchData();
  }, [ipAddress]);

  const handleIpAddressFetched = () => {
    setIpAddress('');
  };


  return (
    <>
    <section className="bg-white min-h-screen pt-6">
        <div className="container mx-auto font-Electrolize px-4">
          <h1 className="text-blue-600 text-4xl md:text-6xl text-center font-bold">IP ADDRESS TRACKER</h1>
          <img src="globe.png" className='w-36 mx-auto my-12' alt="A globe" />
          <p className="text-blue-600 text-lg md:text-xl text-center my-3 font-bold">Insert an IP Address and watch the results!</p>
          <div className="flex justify-center">
            <input id='ipInput' type="text" className="min-w-[200px] w-1/3 p-3 outline-none rounded-l-lg text-xl bg-gray-200" />
            <button className="bg-blue-600 hover:bg-[#143245] text-white p-3 rounded-r-lg" onClick={handleGoButtonClick}>GO</button>
          </div>
          <div className='flex flex-col items-center mt-3 md:text-lg text-blue-600 break-words'>
            <p className='font-bold'>Here some IP addresses you can try:</p>
            <p>160.80.80.100 / 2.41.2.10</p>
            <p>35.214.7.178 / 161.0.8.228</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 my-6 md:my-12 gap-2">
            <div className="bg-gray-200 text-blue-600 p-4 rounded-tl-lg md:rounded-l-lg flex flex-col gap-5">
              <p className="text-lg lg:text-xl">IP Address:</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold break-words">{ipResult}</p>
            </div>
            <div className="bg-gray-200 text-blue-600 p-4 rounded-tr-lg md:rounded-none flex flex-col gap-5">
              <p className="text-lg lg:text-xl">Location:</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold">{locationResult}</p>
            </div>
            <div className="bg-gray-200 text-blue-600 p-4 rounded-bl-lg md:rounded-none flex flex-col gap-5">
              <p className="text-lg lg:text-xl">Timezone:</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold">{timezoneResult}</p>
            </div>
            <div className="bg-gray-200 text-blue-600 p-4 rounded-br-lg md:rounded-r-lg flex flex-col gap-5">
              <p className="text-lg lg:text-xl">ISP:</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold">{ispResult}</p>
            </div>
          </div>
          <Map lon={lon} lat={lat}/>
        </div>
      </section>
      <footer className='bg-blue-600'>
        <div className='container mx-auto font-Electrolize px-4'>
          <div className='flex flex-col items-center sm:flex-row justify-between text-white py-6'>
            <p>Made by Davide Cruciani</p>
            <p>Map by <a className='text-gray-300 underline' href="https://leafletjs.com/" target='_blank'>Leaflet</a></p>
            <p>IP Geolocation API by <a className='text-gray-300 underline' href="https://geo.ipify.org/" target='_blank'>Ipify</a></p>
          </div>
        </div>
      </footer>
      </>
  )
}

export default Page