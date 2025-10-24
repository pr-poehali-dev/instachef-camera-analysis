import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Screen = 'camera' | 'analysis' | 'recipes' | 'cooking' | 'share' | 'profile';

type DietStyle = 'normal' | 'diet' | 'vegan' | 'eco';

interface Ingredient {
  id: string;
  name: string;
  image: string;
  calories: number;
  grams: number;
}

interface Recipe {
  id: string;
  name: string;
  image: string;
  time: string;
  calories: number;
  style: DietStyle;
}

interface CookingStep {
  id: string;
  number: number;
  text: string;
  duration?: string;
}

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('camera');
  const [selectedStyle, setSelectedStyle] = useState<DietStyle>('normal');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: '1',
      name: 'Помидор',
      image: 'https://images.unsplash.com/photo-1546470427-227d2076ccb6?w=256',
      calories: 18,
      grams: 100
    },
    {
      id: '2',
      name: 'Огурец',
      image: 'https://images.unsplash.com/photo-1568584711271-2cfdf98e9acd?w=256',
      calories: 15,
      grams: 150
    },
    {
      id: '3',
      name: 'Сыр',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=256',
      calories: 402,
      grams: 50
    },
    {
      id: '4',
      name: 'Базилик',
      image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=256',
      calories: 23,
      grams: 20
    }
  ]);

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Капрезе с соусом песто',
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800',
      time: '15 мин',
      calories: 320,
      style: 'normal'
    },
    {
      id: '2',
      name: 'Салат с овощами гриль',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      time: '25 мин',
      calories: 180,
      style: 'vegan'
    },
    {
      id: '3',
      name: 'Легкий овощной микс',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      time: '10 мин',
      calories: 120,
      style: 'diet'
    }
  ];

  const cookingSteps: CookingStep[] = [
    { id: '1', number: 1, text: 'Нарежьте помидоры и сыр моцарелла кружками одинаковой толщины', duration: '3 мин' },
    { id: '2', number: 2, text: 'Выложите на тарелку чередуя: помидор, моцарелла, помидор', duration: '2 мин' },
    { id: '3', number: 3, text: 'Приготовьте соус песто: смешайте базилик, чеснок и оливковое масло', duration: '5 мин' },
    { id: '4', number: 4, text: 'Полейте блюдо соусом песто', duration: '1 мин' },
    { id: '5', number: 5, text: 'Украсьте свежими листьями базилика и подавайте', duration: '1 мин' }
  ];

  const dietStyles: { value: DietStyle; label: string }[] = [
    { value: 'normal', label: 'Обычное' },
    { value: 'diet', label: 'Диета' },
    { value: 'vegan', label: 'Веган' },
    { value: 'eco', label: 'Эконом' }
  ];

  const updateGrams = (id: string, delta: number) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.id === id
          ? { ...ing, grams: Math.max(10, ing.grams + delta) }
          : ing
      )
    );
  };

  const takePhoto = () => {
    setCurrentScreen('analysis');
  };

  const findRecipes = () => {
    setCurrentScreen('recipes');
  };

  const startCooking = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentScreen('cooking');
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < cookingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateVideo = () => {
    setCurrentScreen('share');
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      {currentScreen === 'camera' && (
        <div className="relative h-screen flex flex-col">
          <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFD93D] flex items-center justify-center text-2xl font-bold text-[#1A1A2E]">
                I
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] bg-clip-text text-transparent">
                InstaChef
              </h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => setCurrentScreen('profile')}
            >
              <Icon name="User" size={24} />
            </Button>
          </div>

          <div className="flex-1 relative bg-gradient-to-b from-black/40 to-black/20 flex items-center justify-center">
            <div className="w-full max-w-md mx-4">
              <div className="glass aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white/20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E]/50 to-[#11A1A3E]/30 flex items-center justify-center">
                  <Icon name="Camera" size={96} className="text-white/30" />
                </div>
                <div className="absolute inset-0 border-2 border-dashed border-white/30 m-8 rounded-2xl"></div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-4">
            <p className="text-center text-white/70 text-sm mb-6">
              Сфотографируй холодильник или продукты на столе
            </p>
            <Button
              onClick={takePhoto}
              size="lg"
              className="w-24 h-24 rounded-full mx-auto block bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold shadow-2xl shadow-[#FF8C42]/50 transition-all hover:scale-105"
            >
              <Icon name="Camera" size={40} />
            </Button>
          </div>
        </div>
      )}

      {currentScreen === 'analysis' && (
        <div className="min-h-screen p-6 pb-24 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 mt-4">Распознанные ингредиенты</h2>

            <div className="space-y-4 mb-8">
              {ingredients.map((ingredient, index) => (
                <Card
                  key={ingredient.id}
                  className="glass-dark border-white/10 p-4 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{ingredient.name}</h3>
                      <p className="text-sm text-white/60">{ingredient.calories} ккал на 100г</p>

                      <div className="flex items-center gap-3 mt-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42] hover:text-white"
                          onClick={() => updateGrams(ingredient.id, -10)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="font-semibold w-16 text-center">{ingredient.grams}г</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42] hover:text-white"
                          onClick={() => updateGrams(ingredient.id, 10)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>

                      <div className="mt-2">
                        <Progress 
                          value={Math.min((ingredient.calories / 500) * 100, 100)} 
                          className="h-1.5 bg-white/10"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Выбери стиль рецепта</h3>
              <div className="flex gap-3 flex-wrap">
                {dietStyles.map(style => (
                  <Badge
                    key={style.value}
                    variant={selectedStyle === style.value ? 'default' : 'outline'}
                    className={`cursor-pointer px-6 py-2.5 text-sm font-medium transition-all ${
                      selectedStyle === style.value
                        ? 'bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] text-[#1A1A2E] border-0 shadow-lg shadow-[#FF8C42]/30'
                        : 'border-white/20 text-white/70 hover:border-[#FF8C42] hover:text-white'
                    }`}
                    onClick={() => setSelectedStyle(style.value)}
                  >
                    {style.label}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={findRecipes}
              size="lg"
              className="w-full bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-bold text-lg py-6 rounded-2xl shadow-xl shadow-[#FF8C42]/30 transition-all hover:scale-[1.02]"
            >
              🍳 Подобрать рецепты
            </Button>
          </div>
        </div>
      )}

      {currentScreen === 'recipes' && (
        <div className="min-h-screen p-6 pb-24 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6 mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setCurrentScreen('analysis')}
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              <div>
                <h2 className="text-3xl font-bold">Подходящие блюда</h2>
                <p className="text-white/60 text-sm mt-1">По твоим ингредиентам найдено {recipes.length} рецепта</p>
              </div>
            </div>

            <div className="space-y-6">
              {recipes.map((recipe, index) => (
                <Card
                  key={recipe.id}
                  className="glass-dark border-white/10 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3">{recipe.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Icon name="Clock" size={16} />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon name="Flame" size={16} className="text-[#FF8C42]" />
                        <span>{recipe.calories} ккал</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon name="Salad" size={16} className="text-[#FFD93D]" />
                        <span className="capitalize">{dietStyles.find(s => s.value === recipe.style)?.label}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold"
                        onClick={() => startCooking(recipe)}
                      >
                        👨‍🍳 Пошагово
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        🔊
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        📤
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'cooking' && selectedRecipe && (
        <div className="min-h-screen pb-24 animate-fade-in">
          <div className="relative h-64 overflow-hidden">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#1A1A2E]"></div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 left-6 text-white hover:bg-white/10"
              onClick={() => setCurrentScreen('recipes')}
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>

            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h2>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  {selectedRecipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Flame" size={16} />
                  {selectedRecipe.calories} ккал
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Шаги приготовления</h3>
              <span className="text-white/60 text-sm">Шаг {currentStep + 1} из {cookingSteps.length}</span>
            </div>

            <Progress 
              value={((currentStep + 1) / cookingSteps.length) * 100} 
              className="mb-8 h-2 bg-white/10"
            />

            <div className="space-y-4 mb-8">
              {cookingSteps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`glass-dark border-white/10 p-5 transition-all ${
                    index === currentStep 
                      ? 'border-[#FF8C42] shadow-lg shadow-[#FF8C42]/20 scale-105' 
                      : index < currentStep 
                        ? 'opacity-50' 
                        : 'opacity-30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] text-[#1A1A2E]' 
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {index < currentStep ? '✓' : step.number}
                    </div>
                    <div className="flex-1">
                      <p className="text-base mb-2">{step.text}</p>
                      {step.duration && (
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Icon name="Timer" size={14} />
                          <span>{step.duration}</span>
                        </div>
                      )}
                    </div>
                    {index === currentStep && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        <Icon name={isPlaying ? "Pause" : "Volume2"} size={20} />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-3 sticky bottom-6">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <Icon name="ChevronLeft" size={20} />
                Назад
              </Button>
              {currentStep < cookingSteps.length - 1 ? (
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold"
                  onClick={nextStep}
                >
                  Далее
                  <Icon name="ChevronRight" size={20} />
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold"
                  onClick={generateVideo}
                >
                  🎬 Сделать видео
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'share' && selectedRecipe && (
        <div className="min-h-screen p-6 pb-24 animate-fade-in flex items-center justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 mb-4"
                onClick={() => setCurrentScreen('cooking')}
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              <h2 className="text-3xl font-bold mb-2">Твое видео готово!</h2>
              <p className="text-white/60 text-sm">AI-ролик на основе твоих ингредиентов и рецепта</p>
            </div>

            <Card className="glass-dark border-white/10 overflow-hidden mb-8 animate-scale-in">
              <div className="aspect-[9/16] relative bg-gradient-to-br from-[#1A1A2E] to-[#11A1A3E] flex items-center justify-center">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] shadow-2xl shadow-[#FF8C42]/50"
                  >
                    <Icon name="Play" size={32} />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{selectedRecipe.name}</h3>
                  <p className="text-sm text-white/80">15 сек • InstaChef AI</p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center mb-4">Поделиться в соцсетях</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                <button className="flex flex-col items-center gap-2 p-4 glass-dark rounded-2xl border border-white/10 hover:border-[#FF8C42] transition-all hover:scale-105">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                    <Icon name="Instagram" size={28} fallback="Camera" />
                  </div>
                  <span className="text-xs">Instagram</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-4 glass-dark rounded-2xl border border-white/10 hover:border-[#FF8C42] transition-all hover:scale-105">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
                    <Icon name="Music" size={28} />
                  </div>
                  <span className="text-xs">TikTok</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-4 glass-dark rounded-2xl border border-white/10 hover:border-[#FF8C42] transition-all hover:scale-105">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Icon name="Send" size={28} />
                  </div>
                  <span className="text-xs">Telegram</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-4 glass-dark rounded-2xl border border-white/10 hover:border-[#FF8C42] transition-all hover:scale-105">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFD93D] flex items-center justify-center">
                    <Icon name="Download" size={28} className="text-[#1A1A2E]" />
                  </div>
                  <span className="text-xs">Сохранить</span>
                </button>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => setCurrentScreen('cooking')}
              >
                🔁 Создать заново
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'profile' && (
        <div className="min-h-screen p-6 pb-24 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8 mt-4">
              <h2 className="text-3xl font-bold">Профиль</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setCurrentScreen('camera')}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <Card className="glass-dark border-white/10 p-6 mb-6 animate-scale-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFD93D] flex items-center justify-center text-3xl font-bold text-[#1A1A2E]">
                  Г
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Гость</h3>
                  <p className="text-white/60 text-sm">Войди, чтобы сохранить историю</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold justify-start"
                >
                  <Icon name="LogIn" size={20} />
                  Войти через Google
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <Icon name="Apple" size={20} fallback="Smartphone" />
                  Войти через Apple ID
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              <Card className="glass-dark border-white/10 p-4 flex items-center justify-between hover:border-[#FF8C42] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Crown" size={20} className="text-[#FFD93D]" />
                  <div>
                    <h4 className="font-semibold">Подписка Premium</h4>
                    <p className="text-sm text-white/60">Безлимитные рецепты и видео</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-white/40" />
              </Card>

              <Card className="glass-dark border-white/10 p-4 flex items-center justify-between hover:border-[#FF8C42] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="History" size={20} className="text-[#FF8C42]" />
                  <div>
                    <h4 className="font-semibold">История блюд</h4>
                    <p className="text-sm text-white/60">Твои последние рецепты</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-white/40" />
              </Card>

              <Card className="glass-dark border-white/10 p-4 flex items-center justify-between hover:border-[#FF8C42] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={20} className="text-[#FF8C42]" />
                  <div>
                    <h4 className="font-semibold">Язык и голос озвучки</h4>
                    <p className="text-sm text-white/60">Русский • Женский голос</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-white/40" />
              </Card>

              <Card className="glass-dark border-white/10 p-4 flex items-center justify-between hover:border-[#FF8C42] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Trash2" size={20} className="text-red-400" />
                  <div>
                    <h4 className="font-semibold">Удалить данные</h4>
                    <p className="text-sm text-white/60">Очистить все сохраненные рецепты</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={20} className="text-white/40" />
              </Card>
            </div>

            <div className="mt-8 text-center text-white/40 text-sm">
              <p>InstaChef AI v1.0.0</p>
              <p className="mt-1">© 2025 InstaChef. Все права защищены</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
