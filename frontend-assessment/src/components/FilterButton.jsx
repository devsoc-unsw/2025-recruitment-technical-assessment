const FilterButton = ({ icon, name }) => {
    return (
      <div className="border-2 border-primary rounded-md bg-white text-primary w-[140px] h-[44px] cursor-pointer flex items-center justify-center text-2xl hover:bg-primary hover:text-white flex flex-row">
        <span className="material-icons w-[24px] h-[24px]">{icon}</span>
        <h2 className="text-lg">{name}</h2>
      </div>
    );
  };
  
export default FilterButton;