// Public.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import prisonlogo from "../img/prisons-department-logo.png";

import firstimg from '../img/First.jpeg'
import secondimg from '../img/Second.jpg'
import theardimg from '../img/theard.jpg'
import history from '../img/History.jpg'
import "./Public.css";

function Public() {
  const settings = {
    dots: true ,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className='logo-section'>
        <img src={prisonlogo} alt="Prisons Department Logo" className='logo-img' />
      </div>
      <div className="navbar">
        <ul>
          <li><Link to="/login">Login</Link></li> {/* Use Link component properly */}
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="image-slider">
        <Slider {...settings}>
          <div>
            <img src={firstimg} alt="Slider Image 1" className='slider-img'/>
          </div>
          <div>
            <img src={secondimg} alt="Slider Image 2" className='slider-img'/>
          </div>
          <div>
            <img src={theardimg} alt="Slider Image 3" className='slider-img'/>
          </div>
        </Slider>
      </div>

      <div className='history'>
        <div className='history-img'>
<img src={history}></img>
        </div>
        <div className='history-p'>
          <p>
          The Welikada Prison is a maximum-security prison and the largest prison in Sri Lanka. It was built in 1841 by the British colonial government under Governor Campbell. The prison covers an area of 48 acres (190,000 m2). It is overcrowded with about 1700 detainees exceeding the actual number that could be accommodated. The prison also has a gallows (unused since 1959) and its own hospital. The prison is administered by the Department of Prisons.</p><br/>

<p>Following the attempted military coup in 1962, the arrested military and police officers were remanded pending trial in a special section at Welikada prison called the Magazine Section. To guard these officers, a special security detachment called the composite guard was selected from the Ceylon Light Infantry, with Major A Hulangamuwa in charge.
          </p>
        </div>
      </div>

      <div className='footer'>
        <div className='footer-left'>
<ul>
<li><Link to="/login">Login</Link></li> {/* Use Link component properly */}
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
</ul>
        </div>
        <div className='footer-mid'>
          <h3>CONTACT US</h3>
          <br/>
          <br/>
          <h4>Address :</h4> <br/>
          <p>Prison Headquarters, No.150, Baseline Road, Colombo 09, Sri Lanka</p> <br/>
          <p>Tel : +94 114 677177</p> <br/>
          <p>Fax : +94 114 677180</p> <br/>
          <p>E-mail : prisons[at]sltnet.lk</p> <br/>
        </div>
        <div className='footer-right'>
          <h3>RELATED LINKS</h3>
          <ul>
            <li><a href='https://www.moj.gov.lk/index.php?lang=en'>Ministry of Justice, Human Rights & Legal Reforms</a></li>
            <li><a href='https://www.pubad.gov.lk/'>Ministry of Public Administration and Disaster Management</a></li>
            <li><a href='https://www.pensions.gov.lk/index.php?lang=en'>Department of Pensions</a></li>
            <li><a href='https://www.gov.lk/welcome.html'> www.gov.lk</a></li>
            <li><a href='http://prisons.gov.lk/old_web/'>Prison Department (Old Website)</a></li> 
          </ul>
        </div>
        <p>copyright by &copy; SRI LANKA PRISON DEPARTMENT </p>
      </div>
      
      
     
    </div>
  );
}

export default Public;
