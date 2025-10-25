import React, { useState, useEffect, useRef } from "react";

const Carousel = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const timeoutRef = useRef(null);

   // Carousel images
   const images = [
      {
         src: "/images/brgy/elderly-community.jpg",
         alt: "Elderly Community Program",
         caption: "Caring for Our Senior Citizens",
      },
      {
         src: "/images/brgy/feeding-program.jpg",
         alt: "Feeding Program",
         caption: "Community Feeding Initiative",
      },
      {
         src: "/images/brgy/paunang-handog.jpg",
         alt: "Paunang Handog",
         caption: "Barangay Community Programs",
      },
      {
         src: "/images/carousel/carousel-01.png",
         alt: "Barangay Services",
         caption: "Serving the Community",
      },
      {
         src: "/images/carousel/carousel-02.png",
         alt: "Community Events",
         caption: "Building Stronger Communities",
      },
      {
         src: "/images/carousel/carousel-03.png",
         alt: "Public Services",
         caption: "Quality Service for All",
      },
   ];

   // Auto-slide functionality
   useEffect(() => {
      if (!isPaused) {
         timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
         }, 4000); // 4 Sec
      }

      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
      };
   }, [currentIndex, isPaused, images.length]);

   const goToSlide = (index) => {
      setCurrentIndex(index);
   };

   const goToPrevious = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
   };

   const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
   };

   return (
      <section className="py- px-4 bg-neutral">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-[#262626] mb-4">
                  Community Highlights
               </h2>
               <p className="text-[#6c6c6c]">
                  Glimpses of our programs, events, and public services that
                  shape Bagong Culiat.
               </p>
            </div>

            {/* Carousel Container */}
            <div
               className="relative overflow-hidden rounded-lg shadow-lg bg-neutral mx-2 sm:mx-0"
               onMouseEnter={() => setIsPaused(true)}
               onMouseLeave={() => setIsPaused(false)}
            >
               {/* Images Container */}
               <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
               >
                  {images.map((image, index) => (
                     <div key={index} className="min-w-full relative">
                        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-neutral-active">
                           <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                           />
                           {/* Image Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                           {/* Caption */}
                           <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
                              <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold drop-shadow-lg leading-tight">
                                 {image.caption}
                              </h3>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Previous Button */}
               <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-text-color p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Previous slide"
               >
                  <svg
                     className="w-5 h-5 sm:w-6 sm:h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                     />
                  </svg>
               </button>

               {/* Next Button */}
               <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-text-color p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Next slide"
               >
                  <svg
                     className="w-5 h-5 sm:w-6 sm:h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                     />
                  </svg>
               </button>

               {/* Dots Navigation */}
               <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                  {images.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
                           index === currentIndex
                              ? "w-6 sm:w-8 md:w-10 h-1.5 sm:h-2 md:h-2.5 bg-white"
                              : "w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                     />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Carousel;
