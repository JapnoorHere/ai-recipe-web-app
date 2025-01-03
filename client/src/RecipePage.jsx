'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const IngredientsCard = ({ ingredients, onStart }) => {
  return (
    <div className="p-6 md:p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-amber-800">Ingredients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ingredients.map((ingredient) => (
          <Card key={ingredient.name} className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
              loading='lazy'
            />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-1">{ingredient.name}</h3>
              <p className="text-sm text-gray-600">{ingredient.quantity}</p>
            </div>
          </Card>
        ))}
      </div>
      <Button
        onClick={onStart}
        className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg hover:from-orange-500 hover:to-amber-500"
      >
        Start Recipe
      </Button>
    </div>
  );
};

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-amber-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-amber-700">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-amber-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const RecipeStepCard = ({ step, stepNumber }) => {
  return (
    <div className="p-6 md:p-8 bg-white shadow-md rounded-lg">
      <div className="mb-4 text-sm font-semibold text-amber-600">Step {stepNumber}</div>
      <div className="mb-6">
        <img
          src={step.image}
          alt={`Step ${stepNumber}`}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-lg shadow-md border"
        />
      </div>
      <p className="text-lg leading-relaxed text-gray-700">{step.instruction}</p>
    </div>
  );
};

const RecipePage = () => {
  const recipe = useSelector((state) => state.recipe.recipe); // Fetching recipe data from Redux
  const [currentStep, setCurrentStep] = useState(-1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [returnStep, setReturnStep] = useState(null);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, recipe.steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, -1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-800">{recipe.recipeName}</h1>
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-lg">
          {currentStep === -1 || showIngredients ? (
            <IngredientsCard
              ingredients={recipe.ingredients}
              onStart={() => {
                setShowIngredients(false);
                setCurrentStep(returnStep !== null ? returnStep : 0);
                setReturnStep(null);
              }}
            />
          ) : (
            <div className="relative">
              <RecipeStepCard step={recipe.steps[currentStep]} stepNumber={currentStep + 1} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 md:left-4"
                onClick={prevStep}
                disabled={currentStep <= 0}
              >
                <ChevronLeft className="h-8 w-8 text-amber-800" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 md:right-4"
                onClick={nextStep}
                disabled={currentStep >= recipe.steps.length - 1}
              >
                <ChevronRight className="h-8 w-8 text-amber-800" />
              </Button>
            </div>
          )}
        </Card>
        {currentStep !== -1 && !showIngredients && (
          <>
            <ProgressIndicator currentStep={currentStep + 1} totalSteps={recipe.steps.length} />
            <div className="mt-4">
              <Button
                onClick={() => {
                  setReturnStep(currentStep);
                  setShowIngredients(true);
                }}
                className="w-full bg-amber-500 text-white py-2 rounded-lg shadow-md hover:from-orange-500 hover:to-amber-500"
              >
                Show Ingredients
              </Button>
            </div>
          </>
        )}
        <div className="mt-4 flex justify-between md:hidden">
          <Button
            onClick={prevStep}
            disabled={currentStep <= -1}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-amber-500"
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep >= recipe.steps.length - 1}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-amber-500"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
