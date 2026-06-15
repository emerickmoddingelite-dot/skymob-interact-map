'use client';

import { useState, useEffect } from 'react';
import CayoPericoMap from '@/components/CayoPericoMap';
import EventInfo from '@/components/EventInfo';
import LocationPanel from '@/components/LocationPanel';
import ImageUploader from '@/components/ImageUploader';
import AdminAuth from '@/components/AdminAuth';
import AdminPanel from '@/components/AdminPanel';

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

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);

  // Charger les marqueurs depuis localStorage au démarrage
  useEffect(() => {
    const savedLocations = localStorage.getItem('cayoPericoLocations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    }
  }, []);

  // Sauvegarder les marqueurs dans localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem('cayoPericoLocations', JSON.stringify(locations));
  }, [locations]);

  const handleAddLocation = (newLocation: Location) => {
    setLocations([...locations, newLocation]);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const handleUpdateLocation = (updatedLocation: Location) => {
    setLocations(locations.map(loc => 
      loc.id === updatedLocation.id ? updatedLocation : loc
    ));
  };

  const handlePositionSelect = (x: number, y: number) => {
    setIsSelectingPosition(false);
    // Envoyer un événement personnalisé pour mettre à jour le formulaire admin
    const event = new CustomEvent('positionSelected', { detail: { x, y } });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
               SkyMob - SkyFA
            </h1>
            <p className="text-purple-200 text-lg">
              Carte interactive du SkyMob - SkyFA
            </p>
          </div>
          <AdminAuth 
            onLogin={() => setIsAdmin(true)} 
            onLogout={() => setIsAdmin(false)} 
            isLoggedIn={isAdmin}
          />
        </header>

        <div className="flex flex-col xl:flex-row gap-6 items-start">
          <div className="flex-1 space-y-6">
            <CayoPericoMap 
              locations={locations}
              onSelectLocation={setSelectedLocation} 
              customImage={uploadedImage}
              isSelectingPosition={isSelectingPosition}
              onPositionSelect={handlePositionSelect}
            />

            {showUploader && (
              <ImageUploader onImageUpload={setUploadedImage} />
            )}
          </div>

          <div className="w-full xl:w-96 space-y-6">
            <EventInfo />
            {isAdmin && (
              <AdminPanel 
                locations={locations}
                onAddLocation={handleAddLocation}
                onDeleteLocation={handleDeleteLocation}
                onUpdateLocation={handleUpdateLocation}
                onTogglePositionSelect={() => setIsSelectingPosition(!isSelectingPosition)}
                isSelectingPosition={isSelectingPosition}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
