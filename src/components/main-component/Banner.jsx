import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
  const stories = [
    {
      name: "Điện Đài Thổ Tú",
      subtitle: "Tôn Trân Ni - Triệu Bân Bân",
      description: "Tâm lý - Hành động - Cổ trang - Chính kịch",
      imageUrl:
        "https://www.elle.vn/app/uploads/2025/01/17/633100/Hinh-1-phim-co-trang-thien-doa-dao-hoa-nhat-the-khai.webp",
      cta: "Khám phá ngay",
    },
    {
      name: "Conan",
      subtitle: "Hwang Min Hyun",
      description:
        "Anh chàng có nấm đấm chắc nhưng kiến thức từng, quyết tâm lập nhóm học tập tại ngôi trường cả biệt để chính phục giấc mơ đại học.",
      imageUrl:
        "https://aeonmall-review-rikkei.cdn.vccloud.vn/public/wp/16/events/rQPpOix3ttkVzuygfC1Nv0Os8Gd3blrCFSyhTabo.jpg",
      cta: "Đọc truyện",
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
    arrows: false,
    dotsClass: "slick-dots !bottom-8",
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-white transition-colors duration-300"></div>
    ),
  };

  return (
    <div className="bg-gray-100 h-[28rem] md:h-[32rem] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {stories.map((story, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden relative group"
            >
              <picture>
                <source
                  srcSet={`${story.imageUrl}?w=1920&q=75`}
                  media="(min-width: 1024px)"
                />
                <source
                  srcSet={`${story.imageUrl}?w=1280&q=75`}
                  media="(min-width: 768px)"
                />
                <img
                  src={`${story.imageUrl}?w=800&q=75`}
                  alt={story.name}
                  className="w-full h-[28rem] md:h-[32rem] object-cover transform transition-all duration-700 group-hover:scale-110 will-change-transform"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-filter backdrop-brightness-75"></div>
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-white text-4xl md:text-5xl font-bold drop-shadow-2xl animate-fade-in-up">
                    {story.name}
                  </h2>
                  <p className="text-gray-200 text-lg md:text-xl font-medium drop-shadow-md animate-fade-in-up delay-100">
                    {story.subtitle}
                  </p>
                  <p className="text-gray-200 text-lg md:text-xl font-medium drop-shadow-md animate-fade-in-up delay-200">
                    {story.description}
                  </p>
                  <button className="mt-4 px-8 py-3 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 animate-fade-in-up delay-300">
                    {story.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}