import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "./movie.js";



dotenv.config(
  {
    path: ".env"
  }
);

{/* This contains the list of movies with their details like title, genre, year, rating, director, synopsis, cast and poster */}
const movies = [
  {
    title: "3 Idiots",
    genre: "Comedy/Drama",
    year: 2009,
    rating: 9.0,
    director: "Rajkumar Hirani",
    poster: "https://m.media-amazon.com/images/M/MV5BMjA1NDE3NjQxNV5BMl5BanBnXkFtZTcwOTg0MzYxMg@@._V1_FMjpg_UX1000_.jpg",
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
    title: "Dangal",
    genre: "Sports/Drama",
    year: 2016,
    rating: 8.4,
    director: "Nitesh Tiwari",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0Lkx6quw4IUy_IzLWGYzqPk62Ifcpvw6omkEaegEiA&s=10",
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
    title: "Bhool Bhulaiyaa 2",
    genre: "Comedy/Horror",
    year: 2022,
    rating: 7.2,
    director: "Anees Bazmee",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABt6XeBNaUcjvEbafru1CDeR0LeDKNyuCrIy9H6O4Kw&s=10",
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
    title: "Housefull 4",
    genre: "Comedy",
    year: 2019,
    rating: 5.8,
    director: "Farhad Samji",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1RwcrnajnlPbh4PqpGgDYnBT298gOzrDBnS7bHIe4Sg&s=10",
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
    title: "Adipurush",
    genre: "Action/Fantasy",
    year: 2023,
    rating: 3.8,
    director: "Om Raut",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulxVwGKVJNSeOnTtcnSAobBDI9pfn5HfwnxCuxncPzA&s=10",
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

// Connection established to MongoDB
const connection= mongoose.connect(process.env.mongoURI,{});
await Movie.deleteMany({}); // Delete all existing movies in the collection
await Movie.insertMany(movies); // Insert the new list of movies into the collection

export default movies;