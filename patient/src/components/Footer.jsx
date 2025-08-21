
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div style={{visibility:"hidden"}}>
            {/* <img src="/logo.png" alt="logo" className="logo-img" /> */}
          </div>
          <div>
            <h4 style={{color:"grey"}}>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
     
            </ul>
          </div>
          <div>
            <h4 style={{color:"grey"}}>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{color:"grey"}}>Contact</h4>
            <div>
              <FaPhone />
              <span style={{fontSize:14}}>6767767676</span>
            </div>
            <div>
              <MdEmail />
              <span style={{fontSize:14}}>rajtech645@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span style={{fontSize:14}}>India, Bengaluru</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;