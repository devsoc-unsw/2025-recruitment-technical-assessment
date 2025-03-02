import React from 'react';
import FilterButton from './FilterButton';
const SearchControls = () => {
  return (
  <div className="flex flex-wrap sm:items-center justify-between w-full px-3 h-16 pt-2 sm:pt-0">
    <div className="order-2 sm:order-none">
      <FilterButton icon="filter_alt" name="Filters" />
    </div>
    <div className="flex items-center h-[44px] order-1 sm:order-none w-full sm:w-1/2 p-2 border border-gray-300 rounded mb-4 sm:mb-0 mx-auto">
      <span className="material-icons w-[24px] h-[24px]">search</span>
      <input 
        type="text" 
        placeholder="Search for a building..." 
        className="w-full h-full border-none focus:outline-none"
      />
    </div>
    <div className="order-3 sm:order-none">
      <FilterButton icon="filter_list" name="Sort" />
    </div>


  </div>

  );
};
  
export default SearchControls;