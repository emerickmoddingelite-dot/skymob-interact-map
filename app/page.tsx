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

  // Charger les marqueurs depuis la base de données au démarrage
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Erreur lors du chargement des marqueurs:', error);
    }
  };

  const handleAddLocation = async (newLocation: Location) => {
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocation),
      });
      const data = await response.json();
      setLocations([...locations, data]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du marqueur:', error);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
      });
      setLocations(locations.filter(loc => loc.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du marqueur:', error);
    }
  };

  const handleUpdateLocation = async (updatedLocation: Location) => {
    try {
      await fetch(`/api/locations/${updatedLocation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLocation),
      });
      setLocations(locations.map(loc => 
        loc.id === updatedLocation.id ? updatedLocation : loc
      ));
    } catch (error) {
      console.error('Erreur lors de la modification du marqueur:', error);
    }
  };

  const handlePositionSelect = (x: number, y: number) => {
    setIsSelectingPosition(false);
    // Envoyer un événement personnalisé pour mettre à jour le formulaire admin
    const event = new CustomEvent('positionSelected', { detail: { x, y } });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02d9f9] via-[#06a2db] to-[#03ffff]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
               SkyMob - SkyFA
            </h1>
            <p className="text-gray-700 text-lg">
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
