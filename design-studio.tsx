import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Save, 
  Download, 
  Search,
  SearchCheck,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Compass,
  Sparkles,
  Calculator,
  HelpCircle,
  Box,
  Bot
} from 'lucide-react';
import DesignCanvas from '@/components/design-canvas';
import RoomLibrary from '@/components/room-library';
import PropertiesPanel from '@/components/properties-panel';
import VastuAnalyzer from '@/components/vastu-analyzer';
import CostEstimator from '@/components/cost-estimator';
import useDesignStore from '@/hooks/use-design-store';
import { useToast } from '@/hooks/use-toast';

export default function DesignStudio() {
  const { toast } = useToast();
  const {
    rooms,
    vastuAnalysis,
    activeTab,
    rightPanelTab,
    canvasZoom,
    setActiveTab,
    setRightPanelTab,
    setCanvasZoom,
    clearDesign
  } = useDesignStore();

  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (rooms.length > 0) {
        setIsAutoSaving(true);
        // Simulate auto-save
        setTimeout(() => {
          setIsAutoSaving(false);
        }, 1000);
      }
    }, 120000); // Auto-save every 2 minutes

    return () => clearInterval(autoSaveInterval);
  }, [rooms]);

  const handleSaveDesign = () => {
    toast({
      title: "Design Saved",
      description: "Your design has been saved successfully.",
    });
  };

  const handleExportDesign = () => {
    toast({
      title: "Export Started",
      description: "Your design is being exported. Download will start shortly.",
    });
  };

  const handleClearDesign = () => {
    clearDesign();
    toast({
      title: "Design Cleared",
      description: "Your design has been cleared. Start fresh!",
    });
  };

  const totalArea = rooms.reduce((sum, room) => sum + (room.width * room.height), 0);
  const vastuScore = vastuAnalysis?.score || 0;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-vastu rounded-lg flex items-center justify-center">
              <Home className="text-white text-sm" />
            </div>
            <h1 className="text-xl font-bold text-[var(--vastu-dark)]">VastuAI</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button className="text-[var(--vastu-primary)] font-medium border-b-2 border-[var(--vastu-primary)] pb-1">
              Design Studio
            </button>
            <button className="text-gray-600 hover:text-[var(--vastu-primary)] transition-colors">
              Templates
            </button>
            <button className="text-gray-600 hover:text-[var(--vastu-primary)] transition-colors">
              Guidelines
            </button>
            <button className="text-gray-600 hover:text-[var(--vastu-primary)] transition-colors">
              Cost Calculator
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {vastuScore > 0 && (
            <div className="hidden lg:flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">
                Vastu Score: {vastuScore}%
              </span>
            </div>
          )}
          <Button 
            onClick={handleSaveDesign}
            className="btn-vastu-primary"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Design
          </Button>
          <Button 
            onClick={handleExportDesign}
            className="btn-vastu-accent"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-gray-200 p-4">
            <div className="grid grid-cols-5 gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="p-3 btn-vastu-primary"
                title="Select"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-3"
                title="Add Room"
              >
                <SearchCheck className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-3"
                title="Walls"
              >
                <div className="w-4 h-4 border border-current"></div>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-3"
                title="Doors"
              >
                <div className="w-4 h-1 bg-current"></div>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-3"
                title="Windows"
              >
                <div className="w-4 h-3 border border-current"></div>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'rooms'
                  ? 'text-[var(--vastu-primary)] border-b-2 border-[var(--vastu-primary)] bg-blue-50'
                  : 'text-gray-600 hover:text-[var(--vastu-primary)]'
              }`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'vastu'
                  ? 'text-[var(--vastu-primary)] border-b-2 border-[var(--vastu-primary)] bg-blue-50'
                  : 'text-gray-600 hover:text-[var(--vastu-primary)]'
              }`}
              onClick={() => setActiveTab('vastu')}
            >
              Vastu Rules
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'materials'
                  ? 'text-[var(--vastu-primary)] border-b-2 border-[var(--vastu-primary)] bg-blue-50'
                  : 'text-gray-600 hover:text-[var(--vastu-primary)]'
              }`}
              onClick={() => setActiveTab('materials')}
            >
              Materials
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <RoomLibrary />
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 flex flex-col bg-gray-100">
          {/* Canvas Controls */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCanvasZoom(canvasZoom * 0.9)}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-[60px] text-center">
                  {Math.round(canvasZoom * 100)}%
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCanvasZoom(canvasZoom * 1.1)}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Grid: 1 unit = 1 foot</div>
              <Button 
                className="btn-vastu-secondary" 
                size="sm"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Auto Layout
              </Button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 relative">
            <DesignCanvas />
            
            {/* Compass */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
              <div className="relative w-16 h-16">
                <Compass className="w-full h-full text-gray-600" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-red-500 text-white text-xs px-1 rounded">
                  N
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 bg-gray-600 text-white text-xs px-1 rounded">
                  E
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 bg-gray-600 text-white text-xs px-1 rounded">
                  S
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 bg-gray-600 text-white text-xs px-1 rounded">
                  W
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                rightPanelTab === 'properties'
                  ? 'text-[var(--vastu-primary)] border-b-2 border-[var(--vastu-primary)] bg-blue-50'
                  : 'text-gray-600 hover:text-[var(--vastu-primary)]'
              }`}
              onClick={() => setRightPanelTab('properties')}
            >
              Properties
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                rightPanelTab === 'analysis'
                  ? 'text-[var(--vastu-primary)] border-b-2 border-[var(--vastu-primary)] bg-blue-50'
                  : 'text-gray-600 hover:text-[var(--vastu-primary)]'
              }`}
              onClick={() => setRightPanelTab('analysis')}
            >
              Analysis
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                rightPanelTab === 'cost'
                  ? 'text-[var(--vastu-primary)] border-b-2 border-[var(--vastu-primary)] bg-blue-50'
                  : 'text-gray-600 hover:text-[var(--vastu-primary)]'
              }`}
              onClick={() => setRightPanelTab('cost')}
            >
              Cost
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {rightPanelTab === 'properties' && <PropertiesPanel />}
            {rightPanelTab === 'analysis' && <VastuAnalyzer />}
            {rightPanelTab === 'cost' && <CostEstimator />}
          </div>
        </aside>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3 z-50">
        <Button
          size="sm"
          className="w-12 h-12 bg-[var(--vastu-accent)] text-white rounded-full floating-shadow hover:bg-[var(--vastu-accent)]/90"
          title="3D View"
        >
          <Box className="w-5 h-5" />
        </Button>
        <Button
          size="sm"
          className="w-12 h-12 btn-vastu-secondary rounded-full floating-shadow"
          title="AI Assistant"
        >
          <Bot className="w-5 h-5" />
        </Button>
        <Button
          size="sm"
          className="w-12 h-12 btn-vastu-primary rounded-full floating-shadow"
          title="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-between text-sm text-gray-600 z-40">
        <div className="flex items-center space-x-6">
          <span>Total Area: {totalArea.toLocaleString()} sq ft</span>
          <span>Rooms: {rooms.length}</span>
          <span>Vastu Score: {vastuScore}/100</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoSaving ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span>{isAutoSaving ? 'Saving...' : 'Auto-save enabled'}</span>
          </div>
          <span>Last saved: 2 min ago</span>
        </div>
      </div>
    </div>
  );
}
