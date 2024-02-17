import React from "react";

const About = () => {
  return (
    <>
      <div className="bg-blue-200">
        <div className="w-full h-80 bg-cover bg-center">
          <img
            className="w-full h-80 object-cover"
            src="https://blinkit.com/careers/sites/default/files/2022-03/about-masthead-desktop.png"
            alt="main-image"
          />
        </div>
        <h1 className=" flex justify-center mt-12 text-4xl font-bold text-white pb-12">
          Instant commerce indistinguishable from magic
        </h1>
      </div>
      <div className="px-16 text-[16px]">
        <h1 className="mt-10 text-3xl font-semibold pb-8">
          100x retail in 5 years
        </h1>
        <p className="mb-4">
          Imagine needing something when you are at home and getting it before
          you have tied your shoelaces to step out. We are revolutionizing
          e-commerce by making the stuff most important to you, available to you
          in a blink of your eye.
        </p>
        <p className="mb-4">
          We want our customers to focus on the more important things for
          themselves and not need to plan for the little things that life needs
          on an everyday basis. We are here to get your chores out of your way.
        </p>
        <p className="mb-4">
          Our mission is – “instant commerce indistinguishable from magic”.
          Using a backbone of technology, data sciences, and rich customer
          insights, we've built a dense and fast network of partner stores
          enabling lightning fast deliveries in minutes.
        </p>
        <p className="mb-4">
          We are already one of the largest e-grocery companies in India. Our
          ambition however, is to be 100x this size in the next five years.
        </p>
        <p className="mb-4">
          In order to become one of the most important e-retail companies of our
          generation, we need builders who can think on their feet, take extreme
          ownership and commit to making outcomes happen. If you are ambitious,
          smart, and don’t have an ego about it, we’d love to hear from you.
        </p>
        <p className="mb-4">
          Opportunities to create $100 billion businesses in India are rare. We
          are on the way and looking for the hungry.
        </p>
        <p className="mb-4 text-green-700 font-bold">
          "Blinkit" is owned & managed by "Blink Commerce Private Limited”
          (formerly known as Grofers India Private Limited) and is not related,
          linked or interconnected in whatsoever manner or nature, to
          “GROFFR.COM” which is a real estate services business operated by
          “Redstone Consultancy Services Private Limited”
        </p>
        <h1 className="mt-10 text-2xl font-semibold pb-4">
          Our shared philosophy
        </h1>
        <div className="flex flex-wrap justify-between product-details flex ">
          <div className="w-full md:w-1/2 pr-4 ">
            <div className="flex flex-col justify-center max-h-[560px]">
              <img
                className="object-cover max-h-[560px]"
                src="https://blinkit.com/careers/sites/default/files/2021-12/career-mindsets.png"
                alt="main-image"
              />
              <h1 className="mt-4 text-2xl font-semibold pb-4">
                Mindsets & leverage points
              </h1>
              <p className="mb-4">
                We believe that being a leader is a mindset, much more than it
                is a title. And are codifying the operating principles that
                leaders at Blinkit follow at all times
                <br />
                Learn about how we lead here
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 ">
            <div className="flex flex-col justify-center max-h-[560px]">
              <img
                className="object-cover max-h-[560px]"
                src="https://blinkit.com/careers/sites/default/files/2021-12/career-organisation.png"
                alt="main-image"
              />
              <h1 className="mt-4 text-2xl font-semibold pb-4">
                Learning organisation
              </h1>
              <p className="mb-4">
                We are a group of people who are constantly learning the skills
                we need, and continuously improving upon ourselves to create the
                future we desire
                <br />
                Learn about what we value here
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col justify-center max-h-[560px]">
              <img
                className="object-cover max-h-[560px]"
                src="https://blinkit.com/careers/sites/default/files/2021-12/career-sustainability.png"
                alt="main-image"
              />
              <h1 className="mt-4 text-2xl font-semibold pb-4">
                Sustainability conscious
              </h1>
              <p className="mb-4">
                There is no viable path forward that does not take into account
                the needs of the future generations. The concept of
                sustainability entails that we live and work in the present in a
                manner that does not jeopardise the future
                <br />
                Learn about our sustainability commitment here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
