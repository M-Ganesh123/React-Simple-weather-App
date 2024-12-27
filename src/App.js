import { useState } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [city, setcity] = useState("");
  let [wDetails, setWdetails] = useState();
  let getData = (event) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=588befef7d246bb6601c7425fb75150b&units=metric`
    )
      .then((res) => res.json())
      .then((finalres) => {
        if (finalres.cod == "404") {
          setWdetails(undefined);
          toast.error("City not found");
        } else {
          setWdetails(finalres);
          toast.success("Today's weather details are fetched successfully");
        }
      });

    event.preventDefault();
    setcity("");
  };

  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1] flex flex-col  justify-center items-center ">
      <ToastContainer />
      <h1 className="text-[40px] font-bold py-[25px]  text-white ">
        Simple weather App
      </h1>

      <form onSubmit={getData}>
        <input
          type="text"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="w-[300px]  h-[40px] pl-3"
          placeholder="City Name"
        />
        <button className="bg-[#1d4a6b] text-white font-bold p-[10px_20px]">
          Submit
        </button>
      </form>

      <div className="w-[400px] mx-auto rounded-2xl bg-slate-300 shadow-lg mt-[40px] p-[25px]">
        {wDetails !== undefined ? (
          <>
            <h3 className="font-bold text-[30px]">{wDetails.name}</h3>
            <span className="bg-[yellow] text-[20px]">
              {wDetails.sys.country}
            </span>
            <h2 className="font-bold text-[40px]">{wDetails.main.temp}</h2>
            <img
              src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
            />

            <p className="text-[20px] font-bold">
              {wDetails.weather[0].description}
            </p>
          </>
        ) : (
          "No city Found"
        )}
      </div>
    </div>
  );
}

export default App;
