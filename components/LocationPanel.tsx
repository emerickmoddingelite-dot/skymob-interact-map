'use client';

interface Location {
  id: string;
  name: string;
  type: 'entreprise' | 'stand' | 'zone' | 'zone arrivée';
  x: number;
  y: number;
  description: string;
  color: string;
  emoji?: string;
}

interface LocationPanelProps {
  location: Location;
  onClose: () => void;
}

export default function LocationPanel({ location, onClose }: LocationPanelProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'entreprise':
        return '🏢';
      case 'stand':
        return '📍';
      case 'zone':
        return '🏝️';
      case 'zone arrivée':
        return '🛫';
      default:
        return '📍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'entreprise':
        return 'Entreprise';
      case 'stand':
        return 'Stand';
      case 'zone':
        return 'Zone';
      case 'zone arrivée':
        return 'Zone d\'arrivée';
      default:
        return 'Emplacement';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-300 animate-in slide-in-from-right duration-300">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          {getTypeIcon(location.type)} {location.name}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 transition-colors text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: location.color }}
          >
            {getTypeLabel(location.type)}
          </span>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">📝 Description</h3>
          <p className="text-gray-900">{location.description}</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">📍 Coordonnées</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">X:</span>
              <span className="text-gray-900 ml-2">{location.x}%</span>
            </div>
            <div>
              <span className="text-gray-600">Y:</span>
              <span className="text-gray-900 ml-2">{location.y}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-400/30">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">🎯 Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              🗺️ Voir sur la carte
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              📋 Copier les infos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
