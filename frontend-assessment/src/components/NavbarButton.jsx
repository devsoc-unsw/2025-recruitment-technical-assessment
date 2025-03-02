const NavbarButton = ({ icon }) => {
    return (
      <div className="border border-primary rounded-sm bg-white text-primary w-[42px] h-[42px] cursor-pointer flex items-center justify-center text-2xl hover:bg-primary hover:text-white">
        <span className="material-icons w-[24px] h-[24px]">{icon}</span>
      </div>
    );
  };
  
export default NavbarButton;