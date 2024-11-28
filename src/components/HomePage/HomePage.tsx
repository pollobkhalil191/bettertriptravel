import React from "react";
import TabComponent from "../TabComponent";
import { FaLeaf, FaLandmark, FaUtensils, FaFutbol } from "react-icons/fa";
import Destination from "./Destination";

const tabs = [
  { id: "nature", label: "Nature", icon: <FaLeaf />, bg: "https://i.ibb.co/q11VRrt/BM24-HP-DESKTOP-011-right.webp" },
  { id: "culture", label: "Culture", icon: <FaLandmark />, bg: "https://i.ibb.co/n675kkY/BM24-HP-DESKTOP-008.webp" },
  { id: "food", label: "Food", icon: <FaUtensils />, bg: "https://i.ibb.co/QkFYjQG/BCS-2024-Paris-Bakery-Homepage-Desktop.webp" },
  { id: "sports", label: "Sports", icon: <FaFutbol />, bg: "https://i.ibb.co/Jzc9KNH/BM24-Desktop-Oahu.webp" },
];

const tourCards = [
  { id: 1, tab: "nature", title: "Beautiful Forests", description: "Explore the green landscapes." },
  { id: 2, tab: "culture", title: "Historical Monuments", description: "Dive into history." },
  { id: 3, tab: "food", title: "Local Cuisine", description: "Taste unique flavors." },
  { id: 4, tab: "sports", title: "Adventure Sports", description: "Feel the adrenaline." },
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* TabComponent Section */}
      <TabComponent tabs={tabs} tourCards={tourCards} />

      {/* Destination Section */}
      <Destination />
    </>
  );
};

export default HomePage;
