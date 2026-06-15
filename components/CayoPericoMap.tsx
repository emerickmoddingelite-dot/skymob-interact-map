'use client';

import { useState } from 'react';

interface Location {
  id: string;
  name: string;
  type: 'entreprise' | 'stand' | 'zone';
  x: number;
  y: number;
  description: string;
  color: string;
  emoji?: string;
}

interface CayoPericoMapProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
  customImage?: string | null;
  isSelectingPosition?: boolean;
  onPositionSelect?: (x: number, y: number) => void;
}

export default function CayoPericoMap({ locations, onSelectLocation, customImage, isSelectingPosition, onPositionSelect }: CayoPericoMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState<Location | null>(null);
  const [tempPosition, setTempPosition] = useState<{x: number, y: number} | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelectingPosition || !onPositionSelect) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTempPosition({ x, y });
    onPositionSelect(x, y);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20">
      <div 
        className={`relative w-full aspect-[4/3] bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 rounded-xl overflow-hidden shadow-inner ${isSelectingPosition ? 'cursor-crosshair' : ''}`}
        style={{minHeight: '1080px', 
                maxHeight: '1080px',
                minWidth: '1080px',
                maxWidth: '1080px'
              }}
        onClick={handleMapClick}
      >
        {/* Carte de fond - Utilise l'image uploadée ou l'image par défaut */}
        <div className="absolute inset-0 opacity-60">
          <img 
            src={customImage || "/cayo-perico-map.png"} 
            alt="Carte de Cayo Perico"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback si l'image n'existe pas
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* Indicateur de mode sélection */}
        {isSelectingPosition && (
          <div className="absolute top-4 left-4 bg-purple-600/90 backdrop-blur rounded-lg px-4 py-2 z-20">
            <p className="text-white text-sm font-medium">📍 Cliquez sur la carte pour placer le marqueur</p>
          </div>
        )}

        {/* Indicateur de position temporaire */}
        {tempPosition && (
          <div
            className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            style={{
              left: `${tempPosition.x}%`,
              top: `${tempPosition.y}%`,
            }}
          >
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-ping opacity-75" />
            <div className="absolute inset-0 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📍</span>
            </div>
          </div>
        )}

        {/* Marqueurs */}
        {locations.map((location) => (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
            }}
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() => {
              setSelectedLocationInfo(selectedLocationInfo?.id === location.id ? null : location);
              onSelectLocation(location);
            }}
          >
            {/* Marqueur principal - rond et transparent */}
            <div
              className="relative w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: `${location.color}80`,
                borderRadius: '50%',
                boxShadow: `0 0 15px ${location.color}60`,
              }}
            >
              <span className="text-white text-sm font-bold">
                {location.emoji || (location.type === 'entreprise' ? '🏢' : location.type === 'stand' ? '📍' : '🏝️')}
              </span>
              
              {/* Animation de pulsation */}
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-50"
                style={{ backgroundColor: location.color }}
              />
            </div>

            {/* Tooltip au survol */}
            {hoveredLocation?.id === location.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white/95 backdrop-blur rounded-lg shadow-xl whitespace-nowrap z-10">
                <p className="text-sm font-semibold text-gray-800">{location.name}</p>
                <p className="text-xs text-gray-600 capitalize">{location.type}</p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white/95" />
              </div>
            )}

            {/* Popup d'information détaillée quand sélectionné */}
            {selectedLocationInfo?.id === location.id && (
              <div 
                className="absolute z-20 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 overflow-hidden"
                style={{
                  left: location.x > 50 ? 'auto' : `${location.x + 5}%`,
                  right: location.x > 50 ? `${100 - location.x + 5}%` : 'auto',
                  top: `${location.y}%`,
                  transform: 'translateY(-50%)'
                }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{location.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full text-white capitalize" style={{ backgroundColor: location.color }}>
                        {location.type}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocationInfo(null);
                      }}
                      className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{location.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Légende</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-700">Zones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-700">Entreprises</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-700">Stands</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs text-gray-700">Zone d'arrivée</span>
            </div>
          </div>
        </div>

        {/* Titre de la carte */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
          <p className="text-sm font-bold text-gray-800">Île de Cayo Perico</p>
          <p className="text-xs text-gray-600">SkyMob 2026</p>
        </div>
      </div>

      
    </div>
  );
}
