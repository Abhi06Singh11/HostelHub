@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Day theme: Forest Porcelain - Optimized for WCAG Contrast */
    --background: 150 5% 96.5%; /* #F5F7F6 */
    --foreground: 154 20% 11.2%; /* #17231E - Main Text */
    --card: 0 0% 100%; /* #FFFFFF */
    --card-foreground: 154 20% 11.2%;
    --popover: 0 0% 100%;
    --popover-foreground: 154 20% 11.2%;
    --primary: 161 43.4% 25.1%; /* #245B4A */
    --primary-foreground: 0 0% 100%; /* #FFFFFF */
    --secondary: 150 10% 92%;
    --secondary-foreground: 154 20% 11.2%;
    --muted: 150 10% 90%;
    --muted-foreground: 150 10% 25%; 
    --accent: 153.5 44.4% 81.2%; /* #B9E4D0 - Soft Accent */
    --accent-foreground: 154 20% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;
    --border: 150 10.4% 80%; /* Sharper border for better definition */
    --input: 150 10.4% 80%;
    --ring: 161 43.4% 25.1%;
    --radius: 0.75rem;

    /* Sidebar Specific Tokens */
    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 154 20% 11.2%;
    --sidebar-primary: 161 43.4% 25.1%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 150 10% 94%;
    --sidebar-accent-foreground: 161 43.4% 25.1%;
    --sidebar-border: 150 10.4% 90%;
    --sidebar-ring: 161 43.4% 25.1%;
  }

  .dark {
    /* Night theme: Forest Obsidian - High Visibility Adjustments */
    --background: 160 20% 7.8%; /* #101815 */
    --foreground: 144 13.8% 95.7%; /* #F1F6F3 - Main Text */
    --card: 154.3 17.1% 11.8%; /* #19231E */
    --card-foreground: 144 13.8% 95.7%;
    --popover: 154.3 17.1% 11.8%;
    --popover-foreground: 144 13.8% 95.7%;
    --primary: 151.4 44.9% 69.8%; /* #8ED6B4 */
    --primary-foreground: 160 20% 7.8%; /* #101815 */
    --secondary: 154.3 17.1% 18%;
    --secondary-foreground: 144 13.8% 95.7%;
    --muted: 154.3 17.1% 18%;
    --muted-foreground: 150 10% 85%; 
    --accent: 150 24.7% 28.8%; /* #375B49 - Soft Accent */
    --accent-foreground: 144 13.8% 95.7%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 144 13.8% 95.7%;
    --border: 154.3 17.1% 26%; /* #3B4A42 */
    --input: 154.3 17.1% 26%;
    --ring: 151.4 44.9% 69.8%;

    /* Sidebar Specific Tokens Dark */
    --sidebar-background: 160 20% 7.8%;
    --sidebar-foreground: 144 13.8% 95.7%;
    --sidebar-primary: 151.4 44.9% 69.8%;
    --sidebar-primary-foreground: 160 20% 7.8%;
    --sidebar-accent: 154.3 17.1% 18%;
    --sidebar-accent-foreground: 151.4 44.9% 69.8%;
    --sidebar-border: 154.3 17.1% 26%;
    --sidebar-ring: 151.4 44.9% 69.8%;
  }
}

@layer base {
  html {
    font-size: 18px;
  }
  * {
    @apply border-border transition-colors duration-200;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

.data-table-compact td {
  @apply py-4 px-6 align-middle;
}

.enterprise-card {
  @apply rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300;
}

.sidebar-link-active {
  @apply bg-primary/10 text-primary border-l-4 border-primary font-black;
}

/* Subtle Vintage Grain */
body::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.015;
  background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
}

/* Glassmorphism */
.glass-header {
  @apply backdrop-blur-lg bg-background/80 border-b sticky top-0 z-50;
}

/* Scrollbar styling for better visibility in both themes */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-muted-foreground/20 rounded-full hover:bg-muted-foreground/30 transition-colors;
}