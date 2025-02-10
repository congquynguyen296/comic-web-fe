// components/Banner.jsx
import Slider from "react-slick";

export default function Banner() {
  const stories = [
    {
      name: "Trần Hữu",
      imageUrl:
        "https://img.9gate.net/files/4148393882/2018/09/24/1537777201-cover-dau-pha-khung-thuong-mobile-9gate.jpg",
    },
    {
      name: "Aoyama Gosho",
      imageUrl:
        "https://aeonmall-review-rikkei.cdn.vccloud.vn/public/wp/16/events/rQPpOix3ttkVzuygfC1Nv0Os8Gd3blrCFSyhTabo.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Ẩn mũi tên
  };

  return (
    <div className="bg-gray-100 h-96 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {stories.map((story, index) => (
            <div key={index} className="rounded-xl bg-gray-300 h-80 w-full flex items-center justify-center relative overflow-hidden">
              <img
                src={story.imageUrl}
                alt={story.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full text-center p-4">
                <h2 className="text-white font-bold text-lg">{story.name}</h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
