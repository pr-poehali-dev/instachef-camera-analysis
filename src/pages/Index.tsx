import { useState } from 'react';
import { Camera, ChevronLeft, Clock, Flame, Minus, Plus, Salad, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Screen = 'camera' | 'analysis' | 'recipes';

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

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('camera');
  const [selectedStyle, setSelectedStyle] = useState<DietStyle>('normal');
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

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      {currentScreen === 'camera' && (
        <div className="relative h-screen flex flex-col">
          <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFD93D] flex items-center justify-center text-2xl font-bold">
                I
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] bg-clip-text text-transparent">
                InstaChef
              </h1>
            </div>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex-1 relative bg-gradient-to-b from-black/40 to-black/20 flex items-center justify-center">
            <div className="w-full max-w-md mx-4">
              <div className="glass aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white/20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E]/50 to-[#6F4E37]/30 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-white/30" />
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
              <Camera className="w-10 h-10" />
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
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold w-16 text-center">{ingredient.grams}г</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42] hover:text-white"
                          onClick={() => updateGrams(ingredient.id, 10)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF8C42] to-[#FFD93D]"
                          style={{ width: `${Math.min((ingredient.calories / 500) * 100, 100)}%` }}
                        ></div>
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
                className="text-white"
                onClick={() => setCurrentScreen('analysis')}
              >
                <ChevronLeft className="w-6 h-6" />
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
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-[#FF8C42]" />
                        <span>{recipe.calories} ккал</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Salad className="w-4 h-4 text-[#FFD93D]" />
                        <span className="capitalize">{dietStyles.find(s => s.value === recipe.style)?.label}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold"
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
    </div>
  );
}
