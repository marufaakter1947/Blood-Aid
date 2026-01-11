// import Plants from '../../components/Home/Plants'

import Banner from "../../Component/Banner/Banner"
import BloodGroups from "../../Component/BloodGroups"
import ContactUs from "../../Component/ContactUs/ContactUs"
import Featured from "../../Component/Featured/Featured"
import HowItWorks from "../../Component/HowItWorks/HowItWorks"
import Testimonials from "../../Component/Testimonials/Testimonials"

const Home = () => {
  return (
    <div className="pt-15">
      {/* <Plants /> */}
      {/* More components */}
      <Banner></Banner>
      <BloodGroups></BloodGroups>
       <HowItWorks></HowItWorks>
      <Featured></Featured>
      <ContactUs></ContactUs>
      <Testimonials></Testimonials>
    </div>
  )
}

export default Home
