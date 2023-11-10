import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "GYMIA | Home";
  }, []);

  return (
    <div className=" h-[90vh]">
      <h1
        id="watermark"
        className=" phone:text-[7rem] laptop:text-[25rem] desktop:text-[23rem] "
      >
        GYMIA
      </h1>
      <div className=" uppercase laptop:absolute desktop:absolute desktop:text-7xl top-44 right-2 laptop:text-7xl phone:text-5xl phone:pt-8">
        <h1 className=" text-green-700 ">If you don&apos;t find the time,</h1>
        <h1 className=" text-white ">if you don&apos;t do the work,</h1>
        <h1 className=" text-gray-700 ">
          you don&apos;t get the
          <p className=" font-black text-black laptop:text-7xl phone:text-5xl ">
            results.
          </p>
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
