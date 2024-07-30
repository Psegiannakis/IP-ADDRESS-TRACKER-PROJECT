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

  {
  }

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

      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <input
            className="w-[30rem] h-[3rem] rounded-lg px-5"
            type="search"
            id="IP-address"
            placeholder="Search for any IP address or domain"
            value={IPinput}
            onChange={(e) => setIPinput(e.target.value)}
          />
          <button className="ml-2 h-[3rem] w-[5rem] rounded-lg bg-blue-500 text-white">
            {isLoading ? (
              <div className="flex justify-center items-center" role="status">
                <svg
                  aria-hidden="true"
                  className="size-4 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "SEARCH"
            )}
          </button>
        </form>

        <div className="rounded-xl w-2/3 bg-slate-50 h-[11rem] my-6 flex justify-between text-center py-4 px-20 font-bold relative">
          <span>
            <p className="pb-6 text-black/30">IP ADDRESS</p>
            <h1 className=" text-[1.5rem]">{data?.ip}</h1>
          </span>
          <span>
            <p className="pb-6 text-black/30">LOCATION</p>
            <h1 className="text-[1.5rem]">
              {data?.location?.region}
              {isLoading ? "" : ","} {data?.location?.country}
            </h1>
          </span>
          <div className=" border-l-2 bg-slate-400 h-[8rem]"></div>
          <span>
            <p className="pb-6 text-black/30">TIMEZONE</p>
            <h1 className=" text-[1.5rem]">{data?.location?.timezone}</h1>
          </span>
          <span>
            <p className="pb-6 text-black/30">ISP</p>
            <h1 className=" text-[1.5rem]">{data?.isp}</h1>
          </span>
        </div>
      </div>
    </div>
  );
}
