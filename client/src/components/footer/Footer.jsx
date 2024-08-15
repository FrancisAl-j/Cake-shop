import "./footer.css";
import fb from "../../assets/facebook.svg";
import gmail from "../../assets/gmail.svg";
import yt from "../../assets/youtube.svg";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1>Cake Shop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            inventore magnam tempore quibusdam assumenda soluta eum optio vitae
            perferendis voluptatibus?
          </p>
          <div className="footer-social-icons">
            <img src={fb} alt="" />
            <img src={gmail} alt="" />
            <img src={yt} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>09217296666</li>
            <li>kikobilas@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © cake.com - All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;
