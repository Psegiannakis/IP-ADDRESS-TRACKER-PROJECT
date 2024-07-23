import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Header() {
  const [IPinput, setIPinput] = useState("");
  const [searchIP, setSearchIP] = useState("");

  const ApiKey = `${import.meta.env.VITE_API_KEY}${searchIP}`;

  const fetchIP = () => axios.get(ApiKey).then((res) => res.data);

  const { data, error, isLoading } = useQuery({
    queryKey: ["IP", searchIP],
    queryFn: fetchIP,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchIP(IPinput);
  };

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;
  {
  }
  console.log(ApiKey);
  return (
    <div className="w-100">
      <img
        className="absolute -z-10"
        src="./pattern-bg-desktop.png"
        alt="background img"
      />
      <h1 className="relative py-5 font-semibold text-[2rem] tracking-wider text-white flex justify-center">
        IP Address Tracker
      </h1>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            className="w-[30rem] h-[3rem] rounded-lg text-center"
            type="search"
            id="IP-address"
            placeholder="Search for any IP address or domain"
            value={IPinput}
            onChange={(e) => setIPinput(e.target.value)}
          />
          <button className="ml-2 h-[3rem] w-[5rem] rounded-lg bg-blue-500 text-white">
            SEARCH
          </button>
        </form>
        <div>{data.as.name}</div>
      </div>
    </div>
  );
}
