import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Booking from "./components/booking";
import Destination from "./components/destination";
import Packages from "./components/packages";
import Whychoose from "./components/whychoose";
import Testimonial from "./components/testimonial";
import Contact from "./components/contact";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Booking />
      <Destination />
      <Packages />
      <Whychoose />
      <Testimonial />
      <Contact />
      <Footer />

    </div>
  );
}
