import { useRef, useEffect, useState } from "react";

const MediaSequence = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaList = [
    { type: "video", src: "/videos/brgy-culiat-hall.mp4" },
    { type: "video", src: "/videos/qc-drone-shot.mp4" },
    {
      type: "image",
      src: "/images/brgy/elderly-community.jpg",
      duration: 4000,
    },
    { type: "image", src: "/images/brgy/paunang-handog.jpg", duration: 4000 },
    { type: "image", src: "/images/brgy/feeding-program.jpg", duration: 3000 },
  ];

  useEffect(() => {
    const currentMedia = mediaList[currentIndex];
    const video = videoRef.current;

    // Handle VIDEO
    if (currentMedia.type === "video" && video) {
      const handleEnded = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaList.length);
      };

      video.addEventListener("ended", handleEnded);

      // Pause and load new source safely
      video.pause();
      video.src = currentMedia.src;
      video.load();

      // Wait until loaded, then play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // avoid "play() request interrupted" error
          console.warn("Video play interrupted:", err.message);
        });
      }

      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }

    // Handle IMAGE
    if (currentMedia.type === "image") {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaList.length);
      }, currentMedia.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const currentMedia = mediaList[currentIndex];

  return (
    <div className="absolute inset-0 w-full h-full">
      {currentMedia.type === "video" ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
        />
      ) : (
        <img
          src={currentMedia.src}
          alt="Slideshow"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default MediaSequence;
