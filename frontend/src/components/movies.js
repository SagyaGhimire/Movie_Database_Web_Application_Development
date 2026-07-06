import threeIdiotsPoster from "../assets/3idiots.jpg";
import dangalPoster from "../assets/Dangal.jpg";
import bhoolBhulaiyaa2Poster from "../assets/BhoolBhulaiya2.jpg";
import housefull4Poster from "../assets/Housefull4.jpg";
import adipurushPoster from "../assets/adipurush.jpg";

{/* This contains the list of movies with their details like title, genre, year, rating, director, synopsis, cast and poster */}

const movies = [
  {
    id: 1,
    title: "3 Idiots",
    genre: "Comedy/Drama",
    year: 2009,
    rating: 9.0,
    director: "Rajkumar Hirani",
    poster: threeIdiotsPoster,
    synopsis:
      "Two friends search for their long-lost college companion while remembering the unforgettable lessons he taught them about life, education, and following their dreams.",
    cast: [
      "Aamir Khan",
      "R. Madhavan",
      "Sharman Joshi",
      "Kareena Kapoor",
    ],
  },

  {
    id: 2,
    title: "Dangal",
    genre: "Sports/Drama",
    year: 2016,
    rating: 8.4,
    director: "Nitesh Tiwari",
    poster:
        dangalPoster,
    synopsis:
      "A former wrestler trains his daughters to become world-class wrestlers despite facing social challenges and criticism.",
    cast: [
      "Aamir Khan",
      "Fatima Sana Shaikh",
      "Sanya Malhotra",
      "Sakshi Tanwar",
    ],
  },

  {
    id: 3,
    title: "Bhool Bhulaiyaa 2",
    genre: "Comedy/Horror",
    year: 2022,
    rating: 7.2,
    director: "Anees Bazmee",
    poster: bhoolBhulaiyaa2Poster,
    synopsis:
      "A young man gets caught in mysterious events surrounding an old mansion believed to be haunted by an angry spirit.",
    cast: [
      "Kartik Aaryan",
      "Kiara Advani",
      "Tabu",
      "Rajpal Yadav",
    ],
  },

  {
    id: 4,
    title: "Housefull 4",
    genre: "Comedy",
    year: 2019,
    rating: 5.8,
    director: "Farhad Samji",
    poster: housefull4Poster,
    synopsis:
      "Three couples discover they were reincarnated from the 15th century and try to reunite with their true soulmates.",
    cast: [
      "Akshay Kumar",
      "Riteish Deshmukh",
      "Bobby Deol",
      "Kriti Sanon",
    ],
  },

  {
    id: 5,
    title: "Adipurush",
    genre: "Action/Fantasy",
    year: 2023,
    rating: 3.8,
    director: "Om Raut",
    poster:
        adipurushPoster,
    synopsis:
      "A modern retelling of the Ramayana that follows Raghava's mission to rescue his wife from the demon king Lankesh.",
    cast: [
      "Prabhas",
      "Kriti Sanon",
      "Saif Ali Khan",
      "Sunny Singh",
    ],
  },
];

export default movies;