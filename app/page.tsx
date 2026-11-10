import Banner from "@/component/banner";
import Events from "@/component/events";
import Family from "@/component/family";
import Footer from "@/component/footer";
import Invite from "@/component/invite";
import SaveTheDate from "@/component/savedate";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <Banner/>
   <Family/>
   <SaveTheDate/>
   <Events/>
   <Invite/>
   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.950603092!2d76.76356906374642!3d28.64428745347555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1794332411138!5m2!1sen!2sin" width="100%" height="450" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
   <Footer/></>
  );
}
