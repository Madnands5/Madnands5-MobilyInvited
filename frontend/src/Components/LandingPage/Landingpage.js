import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.min.css";
import "./css/Landingpage.css";
import "./css/animate.min.css";
import "./css/apton-icons.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/fontawesome-all.min.css";
import LoginSignup from "../Auth/LoginSignup";
import Banner from "./Banner";
import Clients from "./Clients";
import Contact from "./Contact";
import CTAOne from "./CTAOne";
import CTATwo from "./CTATwo";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Header from "./Header";
import Layout from "./Layout";
import MobileMenu from "./MobileMenu";
import Pricing from "./Pricing";
import Services from "./Services";
import Testimonials from "./Testimonials";
import VideoOne from "./VideoOne";
import Popup from "../Helpers/Popups/Popup";

export default function Landingpage() {
  const [showPopup, toggleShowPopup] = useState(false);

  return (
    <div>
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={LoginSignup}
      />
      <Layout pageTitle="Mobilly Invite">
        <Header
          btnClass="main-nav__btn"
          extraClassName="site-header-one__fixed-top"
          toggleShowPopup={toggleShowPopup}
        />
        <MobileMenu />
        <Banner toggleShowPopup={toggleShowPopup} />
        <Services />
        <CTAOne />
        <CTATwo />
        <Pricing />
        <Testimonials />
        <Clients />
        <VideoOne />
        <br />
        <br />
        <FAQ />
        <Contact />
        <Footer />
      </Layout>
    </div>
  );
}
