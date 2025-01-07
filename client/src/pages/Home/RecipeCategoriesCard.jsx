const RecipeCategoriesCard = ({ name, cuisine, description, image, diet, handleCardClick }) => {
    return (
      <div
        onClick={() => handleCardClick(name, diet, cuisine)}
        className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full h-80 overflow-hidden group"
      >
        {/* Image Section */}
        <div className="relative h-1/2 w-full">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover rounded-t-xl"
          />
          {/* Gradient Overlay */}
         
        </div>
  
        {/* Content Section */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-b-xl p-5 space-y-3">
          <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-orange-500 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs font-semibold text-gray-500 bg-amber-200 px-2 py-1 rounded-md">
              {cuisine}
            </span>
            <span className="text-xs font-semibold text-gray-500 bg-orange-200 px-2 py-1 rounded-md">
              {diet}
            </span>
          </div>
        </div>
  
        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 opacity-25 pointer-events-none  transition-opacity"></div>
      </div>
    );
  };
  
  export default RecipeCategoriesCard;
  