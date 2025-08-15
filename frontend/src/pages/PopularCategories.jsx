import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { name: "Printed Cushion", items: 7, img: "https://gifty.theoptimumwebs.in/wp-content/uploads/2025/01/custom-cuson.png", key: "cushion" },
  { name: "Mugs", items: 7, img: "https://gifty.theoptimumwebs.in/wp-content/uploads/2025/01/customized-cup.png", key: "mugs" },
  { name: "Lamp", items: 5, img: "https://gifty.theoptimumwebs.in/wp-content/uploads/2025/01/lights55.png", key: "lamp" },
  { name: "T-shirts", items: 6, img: "https://gifty.theoptimumwebs.in/wp-content/uploads/2025/01/custom-tshirt.png", key: "tshirts" },
  { name: "Photo Frames", items: 9, img: "https://gifty.theoptimumwebs.in/wp-content/uploads/2025/01/photo-frame-11.png", key: "frames" },
  { name: "Bags", items: 3, img: "https://gifty.theoptimumwebs.in/wp-content/uploads/2025/01/custom-wallet.png", key: "bags" },
];

export default function PopularCategories({ onCategorySelect }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="my-8 px-4 relative mt-20">
      <h2 className="text-2xl font-bold mb-4 ml-10">Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => onCategorySelect(cat.key)}
            className="cursor-pointer text-center"
          >
            <div className="w-50 h-50 mx-auto rounded-full overflow-hidden border border-gray-200">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 font-semibold">{cat.name}</p>
            {/* <p className="text-sm text-gray-500">{cat.items} items</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-800 transition`}
      style={{ ...style, display: "flex", right: "-20px", width: "35px", height: "35px", zIndex: 2 }}
      onClick={onClick}
    >
      <FaChevronRight size={16} color="purple" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-800 transition`}
      style={{ ...style, display: "flex", left: "-20px", width: "35px", height: "35px", zIndex: 2 }}
      onClick={onClick}
    >
      <FaChevronLeft size={20} color="purple"/>
    </div>
  );
}
