'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const IngredientImagesForStep = ({ ingredientNames, allIngredients, hideHeader }) => {
  const filteredIngredients = allIngredients.filter((ingredient) =>
    ingredientNames.includes(ingredient.name)
  );

  return (
    <div className="mt-6">
      {!hideHeader && (
        <h3 className="text-lg font-medium text-amber-800 mb-4">Ingredients for this Step:</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((ingredient) => (
            <Card
              key={ingredient.name}
              className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg"
            >
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
                loading="lazy"
              />
              <p className="text-sm font-medium text-gray-800">{ingredient.name}</p>
              <p className="text-xs text-gray-600">{ingredient.quantity || 'N/A'}</p>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-md text-amber-600">
            No specific ingredients are required for this step.
          </p>
        )}
      </div>
    </div>
  );
};

const RecipeStepCard = ({ step, allIngredients, onShowIngredients }) => {
  const ingredientNames = step.ingredientsUsed.split(', ');

  return (
    <div className="p-6 md:p-8 bg-white shadow-md rounded-lg flex flex-col justify-between min-h-[400px]">
      <div>
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Step {step.stepNumber}</h2>
        <p className="text-lg font-medium text-gray-800 leading-relaxed mb-6">{step.instruction}</p>
        <IngredientImagesForStep ingredientNames={ingredientNames} allIngredients={allIngredients} />
      </div>
      <Button
        onClick={onShowIngredients}
        className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg shadow-md hover:from-orange-500 hover:to-amber-500"
      >
        Show All Ingredients
      </Button>
    </div>
  );
};

const FinalMessage = ({ onComeBack }) => (
  <div className="p-6 md:p-8 bg-gradient-to-br from-orange-100 to-amber-100 shadow-lg rounded-lg text-center mt-6">
    <h2 className="text-3xl font-bold text-amber-800 mb-4">Hope you like it!</h2>
    <p className="text-lg text-gray-700 mb-6">
      Enjoy your delicious dish and don’t forget to share it with your loved ones!
    </p>
    <Button
      variant="ghost"
      size="icon"
      className="mt-4 mx-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      onClick={onComeBack}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  </div>
);

const RecipePage = () => {
  const recipe = useSelector((state) => state.recipe.recipe); // Fetching recipe data from Redux
  const [currentStep, setCurrentStep] = useState(-1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [returnStep, setReturnStep] = useState(null);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, recipe.steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, -1));

  const handleShowIngredients = () => {
    setReturnStep(currentStep);
    setShowIngredients(true);
    setCurrentStep(null); // Temporarily hide the steps
  };

  const handleGoBackToSteps = () => {
    setShowIngredients(false);
    setCurrentStep(returnStep !== null ? returnStep : 0);
    setReturnStep(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8 overflow-hidden relative">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-800">
        {recipe.recipeName}
      </h1>
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-lg relative">
          {currentStep === -1 && !showIngredients ? (
            <div className="p-6 md:p-8 bg-white shadow-md rounded-lg min-h-[400px] flex flex-col justify-between">
              <h2 className="text-2xl font-semibold mb-4 text-amber-800">Ingredients</h2>
              <IngredientImagesForStep
                ingredientNames={recipe.ingredients.map((ing) => ing.name)}
                allIngredients={recipe.ingredients}
                hideHeader={true}
              />
              <Button
                onClick={() => setCurrentStep(0)}
                className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg hover:from-orange-500 hover:to-amber-500"
              >
                Start Recipe
              </Button>
            </div>
          ) : currentStep < recipe.steps.length && !showIngredients ? (
            <RecipeStepCard
              step={recipe.steps[currentStep]}
              allIngredients={recipe.ingredients}
              onShowIngredients={handleShowIngredients}
            />
          ) : currentStep === recipe.steps.length ? (
            <FinalMessage onComeBack={() => setCurrentStep(recipe.steps.length - 1)} />
          ) : showIngredients ? (
            <div className="p-6 md:p-8 bg-white shadow-md rounded-lg min-h-[400px] flex flex-col justify-between">
              <IngredientImagesForStep
                ingredientNames={recipe.ingredients.map((ing) => ing.name)}
                allIngredients={recipe.ingredients}
                hideHeader={false}
              />
              <Button
                onClick={handleGoBackToSteps}
                className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg shadow-md hover:from-orange-500 hover:to-amber-500"
              >
                Go Back to Steps
              </Button>
            </div>
          ) : null}
        </Card>

        {/* Fixed Navigation Buttons */}
        {!showIngredients && (
          <>
            {/* Left Button */}
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full hover:scale-110 transition-transform"
              onClick={prevStep}
              disabled={currentStep <= 0}
            >
              <ChevronLeft className="h-8 w-8 text-amber-800" />
            </Button>
            {/* Right Button */}
            <Button
              variant="ghost"
              size="icon"
              className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full hover:scale-110 transition-transform"
              onClick={nextStep}
              disabled={currentStep >= recipe.steps.length}
            >
              <ChevronRight className="h-8 w-8 text-amber-800" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
