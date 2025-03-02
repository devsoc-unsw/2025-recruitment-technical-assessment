const RoomCard = ({ name, image, available }) => {

  const imagePath = image ? `/assets/${image.replace('./', '')}` : '';
  console.log(imagePath);
  return (
    <div className="max-w-sm w-full h-64 rounded overflow-hidden shadow-lg bg-cover bg-center relative" style={{ backgroundImage: `url(${imagePath})` }}>
      <div className="absolute top-4 right-4 flex">
        <div className="flex w-[154px] h-[38px] px-4 rounded bg-white text-black text-xs flex items-center">
          <div className="w-[10px] h-[10px] rounded-full mr-[10px]" style={{ backgroundColor: "rgb(76, 175, 80)" }}></div>
          <p>{available} rooms available</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="w-[90%] h-[54px] px-4 rounded bg-primary text-white text-l flex items-center">
          {name}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;