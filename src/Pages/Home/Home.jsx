// import Plants from '../../components/Home/Plants'

import Banner from "../../Component/Banner/Banner"
import ContactUs from "../../Component/ContactUs/ContactUs"
import Featured from "../../Component/Featured/Featured"
import HowItWorks from "../../Component/HowItWorks/HowItWorks"
import Testimonials from "../../Component/Testimonials/Testimonials"

const Home = () => {
  return (
    <div>
      {/* <Plants /> */}
      {/* More components */}
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Featured></Featured>
      <ContactUs></ContactUs>
      <Testimonials></Testimonials>
    </div>
  )
}

export default Home
