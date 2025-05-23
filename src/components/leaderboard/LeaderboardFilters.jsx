/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

export default function LeaderboardFilters({ dropdowns, selectedOptions, handleOptionSelect }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Add a function to handle clearing all filters
  const clearAllFilters = () => {
    // Reset all dropdown selections
    dropdowns.forEach((_, index) => {
      handleOptionSelect(index, dropdowns[index].label);
    });
    // Close any open dropdown
    setOpenDropdown(null);
  };

  return (
    <div className="w-full md:w-64 space-y-4">
      {/* Search */}
      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
        <input
          type="text"
          placeholder="Search Here"
          className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white 
          placeholder-stone-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </motion.div>

      {/* Dropdowns */}
      {dropdowns.map((dropdown, index) => (
        <motion.div
          key={dropdown.label}
          whileTap={{ scale: 0.98 }}
          className="relative no-scrollbar"
        >
          <div
            onClick={() =>
              setOpenDropdown(openDropdown === index ? null : index)
            }
            className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg 
            text-white flex items-center justify-between cursor-pointer 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 "
          >
            {selectedOptions[index] || dropdown.label}
            <motion.div
              animate={{ rotate: openDropdown === index ? 180 : 0 }}
            >
              <FaAngleDown className="ml-2 w-4 h-4" />
            </motion.div>
          </div>
          {openDropdown === index && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 w-full mt-1 bg-gray-900 bg-opacity-800 rounded-lg shadow-lg"
            >
              {dropdown.options.map((option) => (
                <motion.div
                  key={option}
                  onClick={() => {
                    handleOptionSelect(index, option);
                    setOpenDropdown(null);
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 cursor-pointer 
                  text-white transition-all hover:border-2 hover:border-r-4 duration-200 ease-in-out"
                >
                  {option}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Clear All Filters Button - Make sure it's visible with proper margin */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={clearAllFilters}
        className="w-full mt-6 px-4 py-3 bg-cyan-500 bg-opacity-20 text-cyan-400 
        border border-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-black 
        font-medium transition-all duration-300 flex items-center justify-center"
      >
        Clear All Filters
      </motion.button>
    </div>
  );
}
