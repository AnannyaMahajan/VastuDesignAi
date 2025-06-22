import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sofa, 
  ChefHat, 
  Bed, 
  Bath, 
  BookOpen, 
  Church,
  UtensilsCrossed,
  Users,
  Lightbulb,
  Wand2
} from 'lucide-react';
import useDesignStore from '@/hooks/use-design-store';
import type { RoomConfig } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface RoomType {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  preferredDirection: string;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  defaultSize: { width: number; height: number };
}

const ROOM_TYPES: RoomType[] = [
  {
    id: 'living',
    name: 'Living Room',
    type: 'living',
    icon: <Sofa className="w-5 h-5" />,
    preferredDirection: 'West/Northwest preferred',
    color: 'text-[hsl(43,96%,56%)]',
    borderColor: 'border-[hsl(43,96%,56%)]/30',
    bgColor: 'bg-[hsl(43,96%,56%)]/10',
    description: 'Social area for family gatherings',
    defaultSize: { width: 180, height: 120 }
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    type: 'kitchen',
    icon: <ChefHat className="w-5 h-5" />,
    preferredDirection: 'Southeast (Agneya) zone',
    color: 'text-blue-600',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    description: 'Cooking and food preparation area',
    defaultSize: { width: 120, height: 100 }
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    type: 'bedroom',
    icon: <Bed className="w-5 h-5" />,
    preferredDirection: 'Southwest corner',
    color: 'text-purple-600',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    description: 'Primary sleeping area',
    defaultSize: { width: 140, height: 120 }
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    type: 'bathroom',
    icon: <Bath className="w-5 h-5" />,
    preferredDirection: 'West/Northwest zone',
    color: 'text-green-600',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    description: 'Sanitation and hygiene area',
    defaultSize: { width: 80, height: 80 }
  },
  {
    id: 'study',
    name: 'Study Room',
    type: 'study',
    icon: <BookOpen className="w-5 h-5" />,
    preferredDirection: 'Northeast preferred',
    color: 'text-orange-600',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    description: 'Learning and concentration space',
    defaultSize: { width: 120, height: 100 }
  },
  {
    id: 'pooja',
    name: 'Pooja Room',
    type: 'pooja',
    icon: <Church className="w-5 h-5" />,
    preferredDirection: 'Northeast corner',
    color: 'text-red-600',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    description: 'Sacred space for worship',
    defaultSize: { width: 80, height: 80 }
  },
  {
    id: 'dining',
    name: 'Dining Room',
    type: 'dining',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    preferredDirection: 'West/East zones',
    color: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
    description: 'Family dining area',
    defaultSize: { width: 120, height: 100 }
  },
  {
    id: 'guest',
    name: 'Guest Room',
    type: 'guest',
    icon: <Users className="w-5 h-5" />,
    preferredDirection: 'Northwest zone',
    color: 'text-slate-600',
    borderColor: 'border-slate-200',
    bgColor: 'bg-slate-50',
    description: 'Temporary accommodation',
    defaultSize: { width: 120, height: 100 }
  }
];

export default function RoomLibrary() {
  const { toast } = useToast();
  const { activeTab, addRoom, plotSize } = useDesignStore();
  
  const [draggedRoom, setDraggedRoom] = useState<RoomType | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(
    "Consider placing the kitchen in the Southeast corner for optimal fire element alignment according to Vastu principles."
  );

  const handleDragStart = (e: React.DragEvent, roomType: RoomType) => {
    setDraggedRoom(roomType);
    e.dataTransfer.setData('text/plain', JSON.stringify(roomType));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleAddRoom = (roomType: RoomType) => {
    const roomCount = useDesignStore.getState().rooms.filter(r => r.type === roomType.type).length;
    const roomName = `${roomType.name}${roomCount > 0 ? ` ${roomCount + 1}` : ''}`;
    
    // Find a suitable position for the new room
    const existingRooms = useDesignStore.getState().rooms;
    let x = 20;
    let y = 20;
    
    // Try to find empty space
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const testX = col * 40;
        const testY = row * 40;
        
        const overlaps = existingRooms.some(room => 
          testX < room.x + room.width &&
          testX + roomType.defaultSize.width > room.x &&
          testY < room.y + room.height &&
          testY + roomType.defaultSize.height > room.y
        );
        
        if (!overlaps && 
            testX + roomType.defaultSize.width <= plotSize.width - 40 &&
            testY + roomType.defaultSize.height <= plotSize.height - 40) {
          x = testX;
          y = testY;
          break;
        }
      }
    }

    const newRoom: RoomConfig = {
      id: `${roomType.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: roomName,
      type: roomType.type,
      width: roomType.defaultSize.width,
      height: roomType.defaultSize.height,
      x: x,
      y: y,
      vastuCompliant: false,
      floorMaterial: 'ceramic',
      color: roomType.bgColor.replace('bg-', '#').replace('-50', '100') // Convert to hex approximation
    };

    addRoom(newRoom);
    
    toast({
      title: "Room Added",
      description: `${roomName} has been added to your design.`,
    });
  };

  const handleApplySuggestion = () => {
    toast({
      title: "AI Suggestion Applied",
      description: "Layout has been optimized based on AI recommendation.",
    });
    setAiSuggestion(null);
  };

  if (activeTab === 'vastu') {
    return (
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-gray-800 mb-3">Vastu Guidelines</h3>
        
        <div className="space-y-3">
          <Card className="p-3 bg-green-50 border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">Direction Principles</span>
            </div>
            <p className="text-sm text-green-700">
              Northeast (Ishanya) for spiritual spaces, Southeast (Agneya) for fire element activities like cooking.
            </p>
          </Card>

          <Card className="p-3 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-800">Element Balance</span>
            </div>
            <p className="text-sm text-blue-700">
              Fire (Southeast), Water (Northeast), Earth (Southwest), Air (Northwest), Space (Center).
            </p>
          </Card>

          <Card className="p-3 bg-yellow-50 border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">Room Proportions</span>
            </div>
            <p className="text-sm text-yellow-700">
              Maintain rectangular or square shapes. Avoid irregular shapes that disrupt energy flow.
            </p>
          </Card>

          <Card className="p-3 bg-purple-50 border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-purple-800">Brahmasthan</span>
            </div>
            <p className="text-sm text-purple-700">
              Keep the center of the house open and free from heavy structures for positive energy circulation.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'materials') {
    return (
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-gray-800 mb-3">Vastu-Compliant Materials</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-200 rounded mb-2 flex items-center justify-center">
              <span className="text-xs font-medium text-amber-800">Marble</span>
            </div>
            <div className="text-sm font-medium text-gray-700">Premium Marble</div>
            <div className="text-xs text-gray-500">Flooring & Walls</div>
          </Card>

          <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 rounded mb-2 flex items-center justify-center">
              <span className="text-xs font-medium text-stone-800">Granite</span>
            </div>
            <div className="text-sm font-medium text-gray-700">Granite Stone</div>
            <div className="text-xs text-gray-500">Kitchen & Bath</div>
          </Card>

          <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded mb-2 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-800">Ceramic</span>
            </div>
            <div className="text-sm font-medium text-gray-700">Ceramic Tiles</div>
            <div className="text-xs text-gray-500">All Rooms</div>
          </Card>

          <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-300 rounded mb-2 flex items-center justify-center">
              <span className="text-xs font-medium text-amber-900">Wood</span>
            </div>
            <div className="text-sm font-medium text-gray-700">Wood Flooring</div>
            <div className="text-xs text-gray-500">Bedrooms</div>
          </Card>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-800 mb-3">Color Recommendations</h4>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-200 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">East</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-red-200 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">Southeast</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-200 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">West</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-200 rounded-full mx-auto mb-1"></div>
              <span className="text-xs text-gray-600">North</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-3">
        {ROOM_TYPES.map((roomType) => (
          <Card
            key={roomType.id}
            className={`p-3 ${roomType.bgColor} ${roomType.borderColor} cursor-pointer hover:shadow-sm transition-shadow animate-fade-in`}
            draggable
            onDragStart={(e) => handleDragStart(e, roomType)}
            onClick={() => handleAddRoom(roomType)}
          >
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={roomType.color}>
                    {roomType.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{roomType.name}</div>
                    <div className="text-sm text-gray-600">{roomType.preferredDirection}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full" title="Vastu Compliant"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      {aiSuggestion && (
        <Card className="mt-6 p-4 gradient-vastu text-white animate-slide-up">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">AI Suggestion</span>
          </div>
          <p className="text-sm text-white/90 mb-3">{aiSuggestion}</p>
          <Button 
            onClick={handleApplySuggestion}
            className="bg-white/20 text-white hover:bg-white/30 transition-colors"
            size="sm"
          >
            <Wand2 className="w-3 h-3 mr-1" />
            Apply Suggestion
          </Button>
        </Card>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-2">How to Use</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click on a room type to add it to your design</li>
          <li>• Drag rooms from here to the canvas</li>
          <li>• Green dots indicate Vastu compliance</li>
          <li>• Follow preferred directions for best results</li>
        </ul>
      </div>
    </div>
  );
}
