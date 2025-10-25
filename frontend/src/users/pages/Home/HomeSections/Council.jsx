import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { User } from "lucide-react";
import ImageHover from "../../../../components/Animation/ImageHover";

const kagawads = [
  {
    name: "Hon. Roberto Dela Cruz",
    role: "Kagawad - Health & Sanitation",
    email: "health.kagawad@barangayculiat.gov.ph",
  },
  {
    name: "Hon. Ana Reyes-Garcia",
    role: "Kagawad - Education & Youth",
    email: "education.kagawad@barangayculiat.gov.ph",
  },
  {
    name: "Hon. Carlos Mendoza",
    role: "Kagawad - Infrastructure",
    email: "infrastructure.kagawad@barangayculiat.gov.ph",
  },
  {
    name: "Hon. Elena Villanueva",
    role: "Kagawad - Women & Family",
    email: "women.kagawad@barangayculiat.gov.ph",
  },
  {
    name: "Hon. Miguel Torres",
    role: "Kagawad - Peace & Order",
    email: "peace.kagawad@barangayculiat.gov.ph",
  },
  {
    name: "Hon. Luz Fernandez",
    role: "Kagawad - Environment",
    email: "environment.kagawad@barangayculiat.gov.ph",
  },
];

const Council = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="py-20 bg-neutral overflow-hidden md:overflow-visible"
      id="council"
    >
      <div className="max-w-6xl mx-auto  px-4">
        {/* --- Barangay Captain Section --- */}
        <div className="flex flex-wrap-reverse items-center gap-12 md:gap-[5em] justify-between mb-20 ">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 basis-xs"
          >
            <h3 className="text-3xl md:text-5xl font-extrabold text-secondary mb-6">
              Meet the Barangay Captain of Culiat
            </h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Hon. Cristina V. Benardino has dedicated over 15 years to public
              service, fostering inclusive growth and transparency in Barangay
              Culiat. Her leadership continues to uplift families and empower
              community-driven initiatives.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Focused on health, education, and local livelihood, she ensures
              that every citizen has a voice in shaping a progressive and
              sustainable Barangay.
            </p>

            <div className="border-l-4 border-accent pl-4 mt-6">
              <p className="italic text-lg text-text-color mb-1">
                “Leadership through Service”
              </p>
              <p className="text-sm text-text-secondary">
                — Hon. Cristina V. Benardino, Barangay Captain
              </p>
            </div>
          </motion.div>
          {/* Right Image */}
          <div className="flex-1 relative md:min-h-[480px] basis-xs ">
            {/* Right-side image (slides from right) */}
            {/* <motion.div
              initial={{ opacity: 0.5, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="cursor-brgy"
            >
              <div className="relative rounded-xl max-h-[620px] md:max-h-[550px] overflow-hidden shadow-2xl">
                <img
                  src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/481457033_572251952496279_7892937193905517506_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFaK-ibay8cIHBFxkUFcIbhzhiO2cMa6FXOGI7ZwxroVVI1A9G1A9znzggGOFQQX6fHThuXEpK_9tsQaCX11YuY&_nc_ohc=-rF4C6SYRwkQ7kNvwHwHvya&_nc_oc=Adm8DOLnIB5GRfsDEJCnnU69qMNqM0iquiFYZLYNjJAsJcpuThTLQ7ZXWstfZWehpnI&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=m9LXVWFuYpzb7zQHOde-Hg&oh=00_AffyW6R7NNHc8w2fQA8HFyBEQcV-_hvatplm5KmGMSwMVQ&oe=69017FB0"
                  alt="Barangay Captain"
                  className="w-full  object-top-right"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
            </motion.div> */}
            <ImageHover />
            {/* Left-side image (slides from below) */}
            {/* <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="absolute top-16 left-0 z-10"
            >
              <div className="relative w-[85%] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/480878973_570497736005034_381990214192133786_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHtDp-vrSFno1oeWdhqvswYXQoAJ3f-Q9RdCgAnd_5D1L6HlIQGcFWF1smpTQ-XHYEJbFmeiDuCsLMYI9zFZIw4&_nc_ohc=AXh3JsccRk8Q7kNvwGdN4qc&_nc_oc=Adl8-nnEWQtwdifICXTTH-BdHKB9WfG8SoKCfmoWi0eZafTno_20jJ2Q5YnJqyeE88c&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=GTOJeBmXjGYa_JydCOslkg&oh=00_AfejW7zuaaMWEsduh6WqMUTbZZxlwKpF0b0_0SozmerhOg&oe=69017105"
                  alt="Barangay Captain"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute  inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div> */}
          </div>
        </div>

        {/* --- Kagawad Carousel --- */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <h3 className="text-center text-2xl font-bold text-text-color mb-10">
            Our Dedicated Council Members
          </h3>

          <Slider {...settings}>
            {kagawads.map((k, index) => (
              <div key={index} className="px-3 py-2 max-h-64 h-64">
                <div
                  className="flex flex-col justify-around bg-white h-full rounded-2xl shadow-md border border-gray-100 text-center p-6 
        transition-all duration-500 transform hover:-translate-y-3 hover:rotate-x-3 hover:rotate-y-1 
        hover:shadow-lg group perspective-[1000px]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* User Icon (Pops Out in 3D) */}
                  <div
                    className="mx-auto mb-4 flex items-center justify-center transition-transform duration-500 
          group-hover:-translate-y-2 group-hover:scale-120"
                    style={{
                      transform: "translateZ(20px)",
                    }}
                  >
                    <User size={100} className="text-neutral-500" />
                  </div>

                  {/* Name */}
                  <h4 className="font-bold text-[#1e3a8a]  text-sm">
                    {k.name}
                  </h4>

                  {/* Role */}
                  <p className="text-xs text-primary font-semibold ">
                    {k.role}
                  </p>

                  {/* Email (fades & slides up on hover) */}
                  <p
                    className="text-xs text-gray-500 absolute group-hover:static 
          translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out -bottom-full"
                  >
                    {k.email}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default Council;
