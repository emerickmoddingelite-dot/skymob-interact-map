'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez sélectionner un fichier PNG ou JPG');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        📤 Ajouter la carte de Cayo Perico
      </h2>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? 'border-purple-400 bg-purple-500/10'
            : 'border-white/30 hover:border-purple-400 hover:bg-purple-500/5'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Aperçu de la carte"
              className="max-h-48 mx-auto rounded-lg shadow-lg"
            />
            <p className="text-green-400 text-sm font-medium">✓ Image chargée avec succès !</p>
            <p className="text-white/60 text-xs">Cliquez ou glissez une nouvelle image pour remplacer</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">🗺️</div>
            <div>
              <p className="text-white font-medium mb-2">
                Glissez votre image ici ou cliquez pour sélectionner
              </p>
              <p className="text-white/60 text-sm">
                Format PNG ou JPG recommandé (haute résolution)
              </p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
              Sélectionner une image
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 bg-white/5 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-purple-200 mb-2">💡 Instructions</h3>
        <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
          <li>Téléchargez une image de la carte de Cayo Perico</li>
          <li>Glissez-la ici ou cliquez pour sélectionner</li>
          <li>L'image sera affichée automatiquement sur la carte</li>
          <li>Les marqueurs s'ajusteront automatiquement</li>
        </ol>
      </div>
    </div>
  );
}
