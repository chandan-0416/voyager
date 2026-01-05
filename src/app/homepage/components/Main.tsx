import TourSearch from "./TourSearch";

export default function Main() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Travel-BG.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div
        className="
          relative z-10
          flex items-center justify-center
          min-h-screen
          px-4
        "
      >
        <TourSearch />
      </div>
    </div>
  );
}
