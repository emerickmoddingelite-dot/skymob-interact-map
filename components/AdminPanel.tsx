'use client';

import { useState, useEffect } from 'react';

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

interface AdminPanelProps {
  locations: Location[];
  onAddLocation: (location: Location) => void;
  onDeleteLocation: (id: string) => void;
  onUpdateLocation: (location: Location) => void;
  onTogglePositionSelect: () => void;
  isSelectingPosition: boolean;
  onPositionUpdate?: (x: number, y: number) => void;
}

export default function AdminPanel({ locations, onAddLocation, onDeleteLocation, onUpdateLocation, onTogglePositionSelect, isSelectingPosition, onPositionUpdate }: AdminPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState({
    name: '',
    type: 'stand' as 'entreprise' | 'stand' | 'zone',
    x: 50,
    y: 50,
    description: '',
    color: '#22c55e',
    emoji: ''
  });

  // Écouter l'événement de sélection de position
  useEffect(() => {
    const handlePositionSelected = (e: Event) => {
      const customEvent = e as CustomEvent<{x: number, y: number}>;
      setNewLocation({
        ...newLocation,
        x: Math.round(customEvent.detail.x),
        y: Math.round(customEvent.detail.y)
      });
    };

    window.addEventListener('positionSelected', handlePositionSelected);
    return () => window.removeEventListener('positionSelected', handlePositionSelected);
  }, [newLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLocation) {
      onUpdateLocation({
        ...newLocation,
        id: editingLocation.id
      });
      setEditingLocation(null);
    } else {
      onAddLocation({
        ...newLocation,
        id: Date.now().toString()
      });
    }
    setNewLocation({
      name: '',
      type: 'stand',
      x: 50,
      y: 50,
      description: '',
      color: '#22c55e',
      emoji: ''
    });
    setShowAddForm(false);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setNewLocation({
      name: location.name,
      type: location.type,
      x: location.x,
      y: location.y,
      description: location.description,
      color: location.color,
      emoji: location.emoji || ''
    });
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingLocation(null);
    setNewLocation({
      name: '',
      type: 'stand',
      x: 50,
      y: 50,
      description: '',
      color: '#22c55e',
      emoji: ''
    });
    setShowAddForm(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'entreprise': return '#3b82f6';
      case 'stand': return '#22c55e';
      case 'zone': return '#ef4444';
      case 'zone arrivée': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          ⚙️ Gestion des Marqueurs
        </h2>
        <button
          onClick={() => {
            if (showAddForm) {
              handleCancelEdit();
            } else {
              setShowAddForm(true);
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          {showAddForm ? '✕ Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-3">
            {editingLocation ? 'Modifier le Marqueur' : 'Nouveau Marqueur'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Nom</label>
              <input
                type="text"
                value={newLocation.name}
                onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                required
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nom du lieu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Type</label>
              <select
                value={newLocation.type}
                onChange={(e) => setNewLocation({...newLocation, type: e.target.value as any, color: getTypeColor(e.target.value)})}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="stand">Stand</option>
                <option value="entreprise">Entreprise</option>
                <option value="zone">Zone</option>
                <option value="zone arrivée">Zone d'arrivée</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Couleur du marqueur</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={newLocation.color}
                  onChange={(e) => setNewLocation({...newLocation, color: e.target.value})}
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/30"
                />
                <input
                  type="text"
                  value={newLocation.color}
                  onChange={(e) => setNewLocation({...newLocation, color: e.target.value})}
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="#22c55e"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Position sur la carte</label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={onTogglePositionSelect}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors font-medium ${
                    isSelectingPosition 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {isSelectingPosition ? '✓ Sélection active' : '📍 Cliquer sur la carte'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">X (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newLocation.x}
                    onChange={(e) => setNewLocation({...newLocation, x: parseInt(e.target.value)})}
                    required
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="X"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Y (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newLocation.y}
                    onChange={(e) => setNewLocation({...newLocation, y: parseInt(e.target.value)})}
                    required
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Y"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Description</label>
              <textarea
                value={newLocation.description}
                onChange={(e) => setNewLocation({...newLocation, description: e.target.value})}
                required
                rows={2}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Description du lieu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Émoji du blip</label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {['📍', '🏢', '🏝️', '🛫','🛬', '🚗', '🏥', '👮', '🔫', '🍕', '⛽', '🏦', '🏠', '🎰', '🏪', '🚑', '🚔', '💊', '🎓', '🏟️', '🎪', '🎮', '🍔', '☕', '🎵', '🛒', '🏨', '⚽', '🎬', '🎨', '🚁','🎽'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewLocation({...newLocation, emoji})}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all ${
                        newLocation.emoji === emoji 
                          ? 'bg-purple-600 ring-2 ring-purple-400' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newLocation.emoji}
                  onChange={(e) => setNewLocation({...newLocation, emoji: e.target.value})}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ou entrez un émoji personnalisé..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              {editingLocation ? 'Modifier le Marqueur' : 'Ajouter le Marqueur'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        <h3 className="text-sm font-semibold text-purple-200 mb-2">Marqueurs existants ({locations.length})</h3>
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-white/10 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: location.color }}
              />
              <div>
                <p className="text-white font-medium">{location.name}</p>
                <p className="text-white/60 text-xs capitalize">{location.type} • X:{location.x}% Y:{location.y}%</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditLocation(location)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ✏️
              </button>
              <button
                onClick={() => onDeleteLocation(location.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
