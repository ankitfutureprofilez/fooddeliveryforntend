import React from 'react'
import axios from 'axios';

export default function AllRestaurant() {
  
  const [resaturant, setResaturant] = useState([]);
  
  useEffect(() => {
  axios
      .get("http://localhost:8000/restaurant/get")
      .then((record) => {
        setResaturant(record.data);
      })
      .catch((error) => console.log(error));
    }, []);

  return (
    <div>
        <h1>Trending dining restaurants</h1>
        <div className="w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 px-4 mb-4">
        <div className="w-full bg-white product_shadow py-5 px-4 cursor-pointer flex flex-col rounded-xl ">
          {image ? (
            <>
              {/* <Link
                to={`/menu/${id}`}
                onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
              > */}
                <div className="h-28 flex flex-col justify-center items-center">
                  <img src={image} className="h-full" />
                </div>
                <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
                  {r_name}
                </h3>
                <p className=" text-slate-500  font-medium">{description}</p>
                <p className=" font-bold">
                  {/* <span className="text-red-500">₹</span> */}
                  <span>{location}</span>
                </p>
              {/* </Link> */}
            </>
          ) : (
            <div className="min-h-[150px] flex justify-center items-center">
              <p>{loading}</p>
            </div>
          )}
        </div>
        </div>
        </div>
  )
}
