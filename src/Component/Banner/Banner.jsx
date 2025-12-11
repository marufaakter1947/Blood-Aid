import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import heroImage from "../../assets/images/Blood-Hero.jpg";

const Banner = () => {
   const navigate = useNavigate();

  const handleFindDonorClick = () => {
    navigate("/search-donor");
  };
  return (
    <section
      className=" mt-10 relative h-[70vh] flex items-center bg-cover bg-center bg-no-repeat mx-4 rounded-xl overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto md:mx-0"
        >
          <h1 className="text-4xl md:text-3xl font-bold text-white leading-tight">
            Donate Blood,
            <br /> Save Lives
          </h1>

          <p className="mt-4 text-gray-200 text-lg">
            Blood Aid connects donors with people in need. Your one donation can save a life.
          </p>

          <div className="mt-6 flex flex-col  md:flex-row gap-10 md:gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
               onClick={handleFindDonorClick}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Find Donors
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/registration"
                className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                Become a Donor
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
