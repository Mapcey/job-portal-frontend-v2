import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

import { Avatar, Typography, Box } from "@mui/material";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "This platform helped me find my dream job in no time!",
    image: "/imgs/client imgs/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Very easy to use and the job matching was spot on.",
    image: "/imgs/client imgs/2.jpg",
  },
  {
    id: 3,
    name: "Ali Rahman",
    review: "Great experience from start to finish. Highly recommended!",
    image: "/imgs/client imgs/3.jpg",
  },
  {
    id: 4,
    name: "Maria Garcia",
    review: "Professional service and very supportive staff.",
    image: "/imgs/client imgs/2.jpg",
  },
];

const ReviewsSection = () => {
  return (
    <div className="reviews-section-container">
      <Typography variant="h4" textAlign="center" mb={4}>
        Client Testimonials
      </Typography>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        loop
      >
        {testimonials.map((client) => (
          <SwiperSlide key={client.id}>
            <Box className="testimonial-card">
              <Avatar
                src={client.image}
                sx={{ width: "20%", height: "20%", mb: 2 }}
              />
              <Typography variant="h6">{client.name}</Typography>
              <Typography variant="body2" className="testimonial-text">
                “{client.review}”
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsSection;
