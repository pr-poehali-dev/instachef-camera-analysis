import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface CameraScreenProps {
  onTakePhoto: () => void;
  onOpenProfile: () => void;
}

export default function CameraScreen({ onTakePhoto, onOpenProfile }: CameraScreenProps) {
  return (
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
          onClick={onOpenProfile}
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
          onClick={onTakePhoto}
          size="lg"
          className="w-24 h-24 rounded-full mx-auto block bg-gradient-to-r from-[#FF8C42] to-[#FFD93D] hover:from-[#FF7A30] hover:to-[#FFC71B] text-[#1A1A2E] font-semibold shadow-2xl shadow-[#FF8C42]/50 transition-all hover:scale-105"
        >
          <Icon name="Camera" size={40} />
        </Button>
      </div>
    </div>
  );
}
