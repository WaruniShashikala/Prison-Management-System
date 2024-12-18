import React from "react";
import Sidebar from "../Sidebar";
import "./Security.css";
import { Link } from "react-router-dom";
import firearmImg from "../Add Security/firearmImg.jpg"
import nonlethelImg from "../Add Security/nonlethelImg.jpg"
import protectiveImg from "../Add Security/protectiveImg.jpg"

function Security() {
  return (
    <div>
      <Sidebar/>
      <center>
        <h1>Security Resources</h1>

        <div class="security-container">

        <Link to="/firearmpage">
            <div class="clickable-part">
            
             <img src={firearmImg} alt="Image 1" />
             <span>Firearms</span>
            
          </div>
        </Link>

        <Link to="/lethalpage">
          <div class="clickable-part">
            <img src={nonlethelImg} alt="Image 2" />
            <span>Non Lethal Weapons</span>
          </div>
        </Link>

        <Link to="/protectivepage">
          <div class="clickable-part">
            <img src={protectiveImg} alt="Image 3" />     {/* onclick="alert('Clicked Part 3')"*/}
            <span>Protective Gears</span>
          </div>
        </Link>

        </div>

      </center>
    </div>
  );
}

export default Security;