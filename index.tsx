@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: hsl(224, 71%, 4%);
  --foreground: hsl(213, 31%, 91%);
  --muted: hsl(223, 47%, 11%);
  --muted-foreground: hsl(215, 20%, 65%);
  --popover: hsl(224, 71%, 4%);
  --popover-foreground: hsl(215, 20%, 65%);
  --card: hsl(224, 71%, 4%);
  --card-foreground: hsl(213, 31%, 91%);
  --border: hsl(216, 34%, 17%);
  --input: hsl(216, 34%, 17%);
  --primary: hsl(210, 40%, 98%);
  --primary-foreground: hsl(222, 84%, 5%);
  --secondary: hsl(222, 47%, 11%);
  --secondary-foreground: hsl(213, 31%, 91%);
  --accent: hsl(216, 34%, 17%);
  --accent-foreground: hsl(210, 40%, 98%);
  --destructive: hsl(0, 63%, 31%);
  --destructive-foreground: hsl(210, 40%, 98%);
  --ring: hsl(216, 34%, 17%);
  --radius: 0.75rem;
  
  /* Advanced Vastu color palette for dark theme */
  --vastu-primary: hsl(25, 85%, 65%); /* Warm golden */
  --vastu-secondary: hsl(120, 70%, 45%); /* Vibrant green */
  --vastu-accent: hsl(43, 96%, 56%); /* Bright gold */
  --vastu-dark: hsl(215, 28%, 17%); /* Deep blue-gray */
  --vastu-light: hsl(210, 40%, 98%); /* Pure white */
  --vastu-purple: hsl(259, 94%, 51%); /* Mystical purple */
  --vastu-cyan: hsl(180, 100%, 50%); /* Electric cyan */
  
  /* Advanced sidebar colors */
  --sidebar-background: hsl(224, 71%, 4%);
  --sidebar-foreground: hsl(213, 31%, 91%);
  --sidebar-primary: hsl(25, 85%, 65%);
  --sidebar-primary-foreground: hsl(222, 84%, 5%);
  --sidebar-accent: hsl(222, 47%, 11%);
  --sidebar-accent-foreground: hsl(213, 31%, 91%);
  --sidebar-border: hsl(216, 34%, 17%);
  --sidebar-ring: hsl(216, 34%, 17%);
}

.light {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(20, 14.3%, 4.1%);
  --muted: hsl(60, 4.8%, 95.9%);
  --muted-foreground: hsl(25, 5.3%, 44.7%);
  --popover: hsl(0, 0%, 100%);
  --popover-foreground: hsl(0, 0%, 98%);
  --card: hsl(240, 10%, 3.9%);
  --card-foreground: hsl(0, 0%, 98%);
  --border: hsl(240, 3.7%, 15.9%);
  --input: hsl(240, 3.7%, 15.9%);
  --primary: hsl(207, 90%, 54%);
  --primary-foreground: hsl(211, 100%, 99%);
  --secondary: hsl(240, 3.7%, 15.9%);
  --secondary-foreground: hsl(0, 0%, 98%);
  --accent: hsl(240, 3.7%, 15.9%);
  --accent-foreground: hsl(0, 0%, 98%);
  --destructive: hsl(0, 62.8%, 30.6%);
  --destructive-foreground: hsl(0, 0%, 98%);
  --ring: hsl(240, 4.9%, 83.9%);
  
  /* Dark mode Vastu colors */
  --vastu-primary: hsl(25, 71%, 45%);
  --vastu-secondary: hsl(120, 61%, 44%);
  --vastu-accent: hsl(43, 74%, 59%);
  --vastu-dark: hsl(210, 29%, 14%);
  --vastu-light: hsl(240, 10%, 3.9%);
  
  --sidebar-background: hsl(240, 10%, 3.9%);
  --sidebar-foreground: hsl(0, 0%, 98%);
  --sidebar-primary: hsl(25, 71%, 45%);
  --sidebar-primary-foreground: hsl(0, 0%, 98%);
  --sidebar-accent: hsl(240, 3.7%, 15.9%);
  --sidebar-accent-foreground: hsl(0, 0%, 98%);
  --sidebar-border: hsl(240, 3.7%, 15.9%);
  --sidebar-ring: hsl(240, 4.9%, 83.9%);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased bg-background text-foreground;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  /* Custom scrollbars */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-600 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400 dark:bg-gray-500;
  }
}

@layer components {
  /* Vastu compliance indicators */
  .vastu-compliant {
    @apply bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800;
  }
  
  .vastu-warning {
    @apply bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800;
  }
  
  .vastu-violation {
    @apply bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800;
  }

  /* Room type colors */
  .room-living {
    @apply bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700;
  }
  
  .room-kitchen {
    @apply bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700;
  }
  
  .room-bedroom {
    @apply bg-purple-100 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700;
  }
  
  .room-bathroom {
    @apply bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700;
  }
  
  .room-study {
    @apply bg-orange-100 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700;
  }
  
  .room-pooja {
    @apply bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700;
  }

  /* Canvas styles */
  .design-canvas {
    background-image: radial-gradient(circle, hsl(0, 0%, 80%) 1px, transparent 1px);
    background-size: 20px 20px;
    @apply bg-gray-50 dark:bg-gray-900;
  }

  .canvas-grid {
    opacity: 0.3;
  }

  /* Advanced button variants */
  .btn-vastu-primary {
    background: linear-gradient(135deg, hsl(25, 85%, 65%) 0%, hsl(25, 85%, 55%) 100%);
    color: hsl(222, 84%, 5%);
    border: 1px solid hsl(25, 85%, 75%);
    box-shadow: 0 4px 14px 0 hsla(25, 85%, 65%, 0.39);
    transition: all 0.3s ease;
  }
  
  .btn-vastu-primary:hover {
    background: linear-gradient(135deg, hsl(25, 85%, 75%) 0%, hsl(25, 85%, 65%) 100%);
    box-shadow: 0 6px 20px 0 hsla(25, 85%, 65%, 0.5);
    transform: translateY(-2px);
  }
  
  .btn-vastu-secondary {
    background: linear-gradient(135deg, hsl(120, 70%, 45%) 0%, hsl(120, 70%, 35%) 100%);
    color: white;
    border: 1px solid hsl(120, 70%, 55%);
    box-shadow: 0 4px 14px 0 hsla(120, 70%, 45%, 0.39);
    transition: all 0.3s ease;
  }
  
  .btn-vastu-secondary:hover {
    background: linear-gradient(135deg, hsl(120, 70%, 55%) 0%, hsl(120, 70%, 45%) 100%);
    box-shadow: 0 6px 20px 0 hsla(120, 70%, 45%, 0.5);
    transform: translateY(-2px);
  }
  
  .btn-vastu-accent {
    background: linear-gradient(135deg, hsl(43, 96%, 56%) 0%, hsl(43, 96%, 46%) 100%);
    color: hsl(222, 84%, 5%);
    border: 1px solid hsl(43, 96%, 66%);
    box-shadow: 0 4px 14px 0 hsla(43, 96%, 56%, 0.39);
    transition: all 0.3s ease;
  }
  
  .btn-vastu-accent:hover {
    background: linear-gradient(135deg, hsl(43, 96%, 66%) 0%, hsl(43, 96%, 56%) 100%);
    box-shadow: 0 6px 20px 0 hsla(43, 96%, 56%, 0.5);
    transform: translateY(-2px);
  }

  /* Advanced floating elements */
  .floating-shadow {
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.3),
      0 10px 10px -5px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
  }

  .floating-shadow:hover {
    box-shadow: 
      0 20px 35px -5px rgba(0, 0, 0, 0.4),
      0 15px 15px -5px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }

  /* Advanced glass morphism effects */
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px 0 rgba(31, 38, 135, 0.37),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  }

  .neon-glow {
    box-shadow: 
      0 0 5px hsl(43, 96%, 56%),
      0 0 10px hsl(43, 96%, 56%),
      0 0 15px hsl(43, 96%, 56%),
      0 0 20px hsl(43, 96%, 56%);
  }

  .cyber-border {
    position: relative;
    border: 1px solid hsl(180, 100%, 50%);
    box-shadow: 
      0 0 10px hsla(180, 100%, 50%, 0.5),
      inset 0 0 10px hsla(180, 100%, 50%, 0.1);
  }

  .cyber-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      hsl(180, 100%, 50%), 
      hsl(259, 94%, 51%), 
      hsl(43, 96%, 56%), 
      hsl(25, 85%, 65%));
    z-index: -1;
    border-radius: inherit;
    opacity: 0.7;
    filter: blur(1px);
  }

  /* Gradient backgrounds */
  .gradient-vastu {
    background: linear-gradient(135deg, var(--vastu-primary), var(--vastu-accent));
  }
  
  .gradient-vastu-subtle {
    background: linear-gradient(135deg, var(--vastu-primary)/10, var(--vastu-accent)/10);
  }

  /* Animation utilities */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* Status indicators */
  .status-indicator {
    @apply relative;
  }

  .status-indicator::before {
    content: '';
    @apply absolute -top-1 -right-1 w-3 h-3 rounded-full;
  }

  .status-indicator.status-success::before {
    @apply bg-green-500;
  }

  .status-indicator.status-warning::before {
    @apply bg-yellow-500;
  }

  .status-indicator.status-error::before {
    @apply bg-red-500;
  }
}

/* Fabric.js canvas customizations */
.canvas-container {
  @apply relative overflow-hidden;
}

.canvas-container canvas {
  @apply border-0;
}

/* Responsive design utilities */
@media (max-width: 768px) {
  .sidebar-mobile {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }

  .sidebar-mobile.open {
    transform: translateX(0);
  }
}

/* Print styles for PDF export */
@media print {
  .no-print {
    display: none !important;
  }
  
  .print-full-width {
    width: 100% !important;
    max-width: none !important;
  }
}
