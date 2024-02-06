import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../components/AllProduct";
import Cart from "./Cart";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="grid grid-cols-3">
    <div className="bg-white p-2 md:p-4 pt-6 md:pt-10  col-span-2">
      <div className="mb-6 block">
        <h2 className="text-gray-700 mb-6 text-lg">
          <strong>Menu</strong> Category
        </h2>
        <ul className="flex w-full flex-wrap space-x-2 md:space-x-4">
          <li>
            <div className="px-8 pb-6 text-white relative before:absolute before:bg-orange-500 before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem]">
              <div className="text-orange-500 bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon points="188.357,233.739 208.185,512 239.304,512 239.304,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <polygon points="272.696,233.739 272.696,512 302.772,512 322.6,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M356.074,233.739L336.246,512h53.319c8.457,0,15.565-6.315,16.577-14.707l31.626-263.554H356.074z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M154.883,233.739H74.232l31.626,263.554c1.012,8.391,8.12,14.707,16.577,14.707h52.276L154.883,233.739z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M456.348,166.957H55.652c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696h400.696
                                c9.206,0,16.696-7.49,16.696-16.696C473.043,174.446,465.554,166.957,456.348,166.957z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M416.892,72.848c-10.653-23.913-34.087-39.456-60.718-39.456c-2.956,0-5.891,0.196-8.815,0.598
                                C335.728,13.391,313.728,0,289.391,0C277.62,0,266.131,3.174,256,9.109C245.869,3.174,234.38,0,222.609,0
                                c-24.337,0-46.337,13.391-57.967,33.989c-2.924-0.402-5.859-0.598-8.815-0.598c-26.631,0-50.076,15.544-60.718,39.467
                                c-23.913,10.642-39.456,34.076-39.456,60.707h400.696C456.348,106.935,440.804,83.501,416.892,72.848z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="font-base currentColor font-medium relative z-10">
                Snack
              </h3>
            </div>
          </li>
          <li>
            <div className="px-8 pb-6 text-gray-600 relative before:absolute before:bg-white before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem] ">
              <div className="bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon points="188.357,233.739 208.185,512 239.304,512 239.304,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <polygon points="272.696,233.739 272.696,512 302.772,512 322.6,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M356.074,233.739L336.246,512h53.319c8.457,0,15.565-6.315,16.577-14.707l31.626-263.554H356.074z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M154.883,233.739H74.232l31.626,263.554c1.012,8.391,8.12,14.707,16.577,14.707h52.276L154.883,233.739z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M456.348,166.957H55.652c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696h400.696
                                c9.206,0,16.696-7.49,16.696-16.696C473.043,174.446,465.554,166.957,456.348,166.957z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M416.892,72.848c-10.653-23.913-34.087-39.456-60.718-39.456c-2.956,0-5.891,0.196-8.815,0.598
                                C335.728,13.391,313.728,0,289.391,0C277.62,0,266.131,3.174,256,9.109C245.869,3.174,234.38,0,222.609,0
                                c-24.337,0-46.337,13.391-57.967,33.989c-2.924-0.402-5.859-0.598-8.815-0.598c-26.631,0-50.076,15.544-60.718,39.467
                                c-23.913,10.642-39.456,34.076-39.456,60.707h400.696C456.348,106.935,440.804,83.501,416.892,72.848z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="font-base currentColor font-medium relative z-10">
                Fishes
              </h3>
            </div>
          </li>
          <li>
            <div className="px-8 pb-6 text-gray-600 relative before:absolute before:bg-white before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem] ">
              <div className="bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon points="188.357,233.739 208.185,512 239.304,512 239.304,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <polygon points="272.696,233.739 272.696,512 302.772,512 322.6,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M356.074,233.739L336.246,512h53.319c8.457,0,15.565-6.315,16.577-14.707l31.626-263.554H356.074z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M154.883,233.739H74.232l31.626,263.554c1.012,8.391,8.12,14.707,16.577,14.707h52.276L154.883,233.739z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M456.348,166.957H55.652c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696h400.696
                                c9.206,0,16.696-7.49,16.696-16.696C473.043,174.446,465.554,166.957,456.348,166.957z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M416.892,72.848c-10.653-23.913-34.087-39.456-60.718-39.456c-2.956,0-5.891,0.196-8.815,0.598
                                C335.728,13.391,313.728,0,289.391,0C277.62,0,266.131,3.174,256,9.109C245.869,3.174,234.38,0,222.609,0
                                c-24.337,0-46.337,13.391-57.967,33.989c-2.924-0.402-5.859-0.598-8.815-0.598c-26.631,0-50.076,15.544-60.718,39.467
                                c-23.913,10.642-39.456,34.076-39.456,60.707h400.696C456.348,106.935,440.804,83.501,416.892,72.848z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="font-base currentColor font-medium relative z-10">
                Pasta
              </h3>
            </div>
          </li>
          <li>
            <div className="px-8 pb-6 text-gray-600 relative before:absolute before:bg-white before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem] ">
              <div className="bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon points="188.357,233.739 208.185,512 239.304,512 239.304,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <polygon points="272.696,233.739 272.696,512 302.772,512 322.6,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M356.074,233.739L336.246,512h53.319c8.457,0,15.565-6.315,16.577-14.707l31.626-263.554H356.074z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M154.883,233.739H74.232l31.626,263.554c1.012,8.391,8.12,14.707,16.577,14.707h52.276L154.883,233.739z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M456.348,166.957H55.652c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696h400.696
                                c9.206,0,16.696-7.49,16.696-16.696C473.043,174.446,465.554,166.957,456.348,166.957z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M416.892,72.848c-10.653-23.913-34.087-39.456-60.718-39.456c-2.956,0-5.891,0.196-8.815,0.598
                                C335.728,13.391,313.728,0,289.391,0C277.62,0,266.131,3.174,256,9.109C245.869,3.174,234.38,0,222.609,0
                                c-24.337,0-46.337,13.391-57.967,33.989c-2.924-0.402-5.859-0.598-8.815-0.598c-26.631,0-50.076,15.544-60.718,39.467
                                c-23.913,10.642-39.456,34.076-39.456,60.707h400.696C456.348,106.935,440.804,83.501,416.892,72.848z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="font-base currentColor font-medium relative z-10">
                Desert
              </h3>
            </div>
          </li>
          <li>
            <div className="px-8 pb-6 text-gray-600 relative before:absolute before:bg-white before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem] ">
              <div className="bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon points="188.357,233.739 208.185,512 239.304,512 239.304,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <polygon points="272.696,233.739 272.696,512 302.772,512 322.6,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M356.074,233.739L336.246,512h53.319c8.457,0,15.565-6.315,16.577-14.707l31.626-263.554H356.074z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M154.883,233.739H74.232l31.626,263.554c1.012,8.391,8.12,14.707,16.577,14.707h52.276L154.883,233.739z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M456.348,166.957H55.652c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696h400.696
                                c9.206,0,16.696-7.49,16.696-16.696C473.043,174.446,465.554,166.957,456.348,166.957z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M416.892,72.848c-10.653-23.913-34.087-39.456-60.718-39.456c-2.956,0-5.891,0.196-8.815,0.598
                                C335.728,13.391,313.728,0,289.391,0C277.62,0,266.131,3.174,256,9.109C245.869,3.174,234.38,0,222.609,0
                                c-24.337,0-46.337,13.391-57.967,33.989c-2.924-0.402-5.859-0.598-8.815-0.598c-26.631,0-50.076,15.544-60.718,39.467
                                c-23.913,10.642-39.456,34.076-39.456,60.707h400.696C456.348,106.935,440.804,83.501,416.892,72.848z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="font-base currentColor font-medium relative z-10">
                Burger
              </h3>
            </div>
          </li>
          <li>
            <div className="px-8 pb-6 text-gray-600 relative before:absolute before:bg-white before:flex before:h-20 before:w-full before:bottom-0 before:left-0 before:shadow-md before:rounded-t-xl before:rounded-b-[2.5rem] ">
              <div className="bg-white w-12 h-12 mx-auto shadow-lg rounded-xl flex items-center justify-center mb-3 relative z-10">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon points="188.357,233.739 208.185,512 239.304,512 239.304,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <polygon points="272.696,233.739 272.696,512 302.772,512 322.6,233.739" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M356.074,233.739L336.246,512h53.319c8.457,0,15.565-6.315,16.577-14.707l31.626-263.554H356.074z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M154.883,233.739H74.232l31.626,263.554c1.012,8.391,8.12,14.707,16.577,14.707h52.276L154.883,233.739z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M456.348,166.957H55.652c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696h400.696
                                c9.206,0,16.696-7.49,16.696-16.696C473.043,174.446,465.554,166.957,456.348,166.957z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M416.892,72.848c-10.653-23.913-34.087-39.456-60.718-39.456c-2.956,0-5.891,0.196-8.815,0.598
                                C335.728,13.391,313.728,0,289.391,0C277.62,0,266.131,3.174,256,9.109C245.869,3.174,234.38,0,222.609,0
                                c-24.337,0-46.337,13.391-57.967,33.989c-2.924-0.402-5.859-0.598-8.815-0.598c-26.631,0-50.076,15.544-60.718,39.467
                                c-23.913,10.642-39.456,34.076-39.456,60.707h400.696C456.348,106.935,440.804,83.501,416.892,72.848z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="font-base currentColor font-medium relative z-10">
                Soft Drinks
              </h3>
            </div>
          </li>
        </ul>
      </div>

      <div className="md:flex gap-4 py-2">

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"} />
    </div>
    <div className="p-4">
      <Cart/>
    </div>

    </div>
  );
};

export default Home;
