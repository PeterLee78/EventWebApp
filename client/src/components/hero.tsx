"use client";
export default function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-center justify-center pt-16">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/bg.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-0"></div>
      <div className="relative z-20 text-white px-4 md:px-12">
        <h1 className="text-xl md:text-4xl">
          UNITE ALL WEARY SOULS,
          <br />
          RECHARGE WITH MUSIC AND TURN UP YOUR MODS
        </h1>
        <p className="mt-4 mb-8">
          The only flatfrom that connects online ads to offline purchases backed
          by exclusive partnerships, with visa, master card, black card,
          <br />
          amazon, etc tiketing.com tracks online ad impressions until the
          customer makes an offline purchase-just one click away
        </p>
        <button className=" border border-white text-white py-3 px-6 text-lg md:text-xl underline rounded-md font-bold transition duration-300 ease-in-out hover:bg-white hover:text-black">
          EXPLORE NOW
        </button>
      </div>
    </div>
  );
}
