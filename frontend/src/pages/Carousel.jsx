import React from "react";
import Slider from "react-slick";

function SimpleSlider() {
  const settings = {
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img style={{height:'500px',width:'100%'}} src="https://img.freepik.com/free-photo/cyber-monday-shopping-sales_23-2148688502.jpg?t=st=1752123644~exp=1752127244~hmac=91f33ac178938ad983977d142c0751c874c3aae168edc2f32cdd33a5d04ac029&w=2000" alt="" />
        </div>
        <div>
         <img style={{height:'500px',width:'100%'}} src="https://img.freepik.com/free-psd/3d-rendering-ecommerce-background_23-2151386703.jpg?t=st=1752123793~exp=1752127393~hmac=547c527694e928ad002d344722ef650037cb7e277b731e194726d056e23b0b89&w=2000" alt="" />
        </div>
        <div>
          <img style={{height:'500px',width:'100%'}} src="https://img.freepik.com/free-photo/online-shopping-concept_23-2151896833.jpg?ga=GA1.1.379400606.1738514735&semt=ais_hybrid&w=740" alt="" />
        </div>
        <div>
          <img style={{height:'500px',width:'100%'}} src="https://img.freepik.com/free-vector/online-shopping-landing-page_33099-1725.jpg?t=st=1752123878~exp=1752127478~hmac=1d95333d8032f887238f8eaad234afd6f2afa4cfe514bcf6830caca8ce8287c7&w=2000" alt="" />
        </div>
        <div>
          <img style={{height:'500px',width:'100%'}} src="https://img.freepik.com/free-photo/discount-shopping-season-with-sale_23-2150165932.jpg?t=st=1752123926~exp=1752127526~hmac=f054e6fdb4cd89ecd8d844d9a57de29a40dc2d9b34d71db7fffe28f0f5271734&w=2000" alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
