import React from "react";
import Slider from "react-slick";

function SimpleSlider() {
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {[
          "https://img.freepik.com/free-photo/cyber-monday-shopping-sales_23-2148688502.jpg?w=2000",
          "https://img.freepik.com/free-psd/3d-rendering-ecommerce-background_23-2151386703.jpg?w=2000",
          "https://img.freepik.com/free-photo/online-shopping-concept_23-2151896833.jpg?w=740",
          "https://img.freepik.com/free-vector/online-shopping-landing-page_33099-1725.jpg?w=2000",
          "https://img.freepik.com/free-photo/discount-shopping-season-with-sale_23-2150165932.jpg?w=2000",
        ].map((src, i) => (
          <div key={i}>
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full object-cover h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
