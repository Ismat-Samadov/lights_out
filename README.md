# Lights Out

An attractive, interactive Lights Out puzzle game built with Next.js and TypeScript.

## Game Rules

- Click any light to toggle it on/off
- Adjacent lights (up, down, left, right) will also toggle
- Turn off all lights to win the game
- Try to complete it in as few moves as possible

## Features

- Beautiful gradient animations
- Responsive design
- Move counter
- Win detection with celebration animation
- Solvable puzzles guaranteed
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project Structure

```
lights_out/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── LightCell.tsx     # Individual light cell component
│   └── LightsOutGame.tsx # Main game component
├── utils/
│   └── gameLogic.ts      # Game logic and state management
└── ...config files
```

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## How It Works

The game generates solvable puzzles by starting from an all-off state and applying random moves. This ensures every puzzle can be solved. The game logic handles:

- Grid initialization
- Cell toggling (including neighbors)
- Win condition checking
- Move tracking

Enjoy playing Lights Out!
