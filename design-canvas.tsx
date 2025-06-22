import { useEffect, useRef, useState } from 'react';
import useDesignStore from '@/hooks/use-design-store';
import type { RoomConfig } from '@shared/schema';

export default function DesignCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedRoom, setDraggedRoom] = useState<string | null>(null);

  const {
    rooms,
    plotSize,
    selectedRoomId,
    canvasZoom,
    canvasOffset,
    selectRoom,
    updateRoom,
    setCanvasOffset
  } = useDesignStore();

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    setContext(ctx);
  }, []);

  // Draw canvas content
  useEffect(() => {
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and offset
    context.save();
    context.scale(canvasZoom, canvasZoom);
    context.translate(canvasOffset.x, canvasOffset.y);

    // Draw grid
    drawGrid(context, canvas.width / canvasZoom, canvas.height / canvasZoom);

    // Draw plot boundary
    drawPlotBoundary(context);

    // Draw rooms
    rooms.forEach(room => {
      drawRoom(context, room, room.id === selectedRoomId);
    });

    context.restore();
  }, [context, rooms, selectedRoomId, canvasZoom, canvasOffset, plotSize]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 20;
    
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawPlotBoundary = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeRect(50, 50, plotSize.width, plotSize.height);
  };

  const drawRoom = (ctx: CanvasRenderingContext2D, room: RoomConfig, isSelected: boolean) => {
    const x = 50 + room.x;
    const y = 50 + room.y;
    
    // Room background
    ctx.fillStyle = room.color || getRoomColor(room.type);
    ctx.fillRect(x, y, room.width, room.height);

    // Room border
    ctx.strokeStyle = isSelected ? '#4A90E2' : getRoomBorderColor(room.type);
    ctx.lineWidth = isSelected ? 3 : 2;
    ctx.setLineDash(isSelected ? [5, 5] : []);
    ctx.strokeRect(x, y, room.width, room.height);

    // Room label
    ctx.fillStyle = '#333';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const centerX = x + room.width / 2;
    const centerY = y + room.height / 2;
    
    ctx.fillText(room.name, centerX, centerY - 8);
    
    // Room dimensions
    ctx.fillStyle = '#666';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText(`${room.width}' × ${room.height}'`, centerX, centerY + 8);

    // Vastu compliance indicator
    const indicatorColor = room.vastuCompliant ? '#10B981' : '#F59E0B';
    ctx.fillStyle = indicatorColor;
    ctx.beginPath();
    ctx.arc(x + room.width - 10, y + 10, 4, 0, 2 * Math.PI);
    ctx.fill();
  };

  const getRoomColor = (roomType: string): string => {
    const colors = {
      living: '#FEF3C7', // Yellow-100
      kitchen: '#DBEAFE', // Blue-100
      bedroom: '#F3E8FF', // Purple-100
      bathroom: '#D1FAE5', // Green-100
      study: '#FED7AA', // Orange-100
      pooja: '#FEE2E2', // Red-100
      dining: '#F0FDF4', // Green-100
      guest: '#F1F5F9', // Slate-100
    };
    return colors[roomType as keyof typeof colors] || '#F8FAFC';
  };

  const getRoomBorderColor = (roomType: string): string => {
    const colors = {
      living: '#D97706', // Yellow-600
      kitchen: '#2563EB', // Blue-600
      bedroom: '#9333EA', // Purple-600
      bathroom: '#059669', // Green-600
      study: '#EA580C', // Orange-600
      pooja: '#DC2626', // Red-600
      dining: '#16A34A', // Green-600
      guest: '#64748B', // Slate-500
    };
    return colors[roomType as keyof typeof colors] || '#64748B';
  };

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / canvasZoom - canvasOffset.x;
    const y = (clientY - rect.top) / canvasZoom - canvasOffset.y;
    
    return { x, y };
  };

  const findRoomAtPosition = (x: number, y: number): RoomConfig | null => {
    const plotX = x - 50;
    const plotY = y - 50;
    
    for (let i = rooms.length - 1; i >= 0; i--) {
      const room = rooms[i];
      if (
        plotX >= room.x &&
        plotX <= room.x + room.width &&
        plotY >= room.y &&
        plotY <= room.y + room.height
      ) {
        return room;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    const room = findRoomAtPosition(coords.x, coords.y);
    
    if (room) {
      selectRoom(room.id);
      setIsDragging(true);
      setDraggedRoom(room.id);
      setDragStart({ x: coords.x - 50 - room.x, y: coords.y - 50 - room.y });
    } else {
      selectRoom(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedRoom) return;

    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    const newX = Math.max(0, Math.min(plotSize.width - 100, coords.x - 50 - dragStart.x));
    const newY = Math.max(0, Math.min(plotSize.height - 100, coords.y - 50 - dragStart.y));

    // Snap to grid
    const gridSize = 20;
    const snappedX = Math.round(newX / gridSize) * gridSize;
    const snappedY = Math.round(newY / gridSize) * gridSize;

    updateRoom(draggedRoom, { x: snappedX, y: snappedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedRoom(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(3, canvasZoom * delta));
    
    // Zoom towards mouse position
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    const zoomPoint = {
      x: coords.x,
      y: coords.y
    };

    const newOffset = {
      x: canvasOffset.x + (zoomPoint.x * (1 - delta)),
      y: canvasOffset.y + (zoomPoint.y * (1 - delta))
    };

    useDesignStore.getState().setCanvasZoom(newZoom);
    setCanvasOffset(newOffset);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden design-canvas"
    >
      <canvas
        ref={canvasRef}
        className="cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      
      {/* Room count overlay */}
      {rooms.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium mb-2">Start designing your home</div>
            <div className="text-sm">Drag rooms from the left panel to begin</div>
          </div>
        </div>
      )}
    </div>
  );
}
