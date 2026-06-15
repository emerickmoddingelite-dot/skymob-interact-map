'use client';

export default function EventInfo() {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        🎉 Informations Événement
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 Date & Heure</h3>
          <p className="text-gray-900">Dimanche 21 Juin 2026</p>
          <p className="text-gray-700">21:00 - 02:00</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📍 Lieu</h3>
          <p className="text-gray-900">Île de Cayo Perico</p>
          <p className="text-gray-700">Cayo festival</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Activités</h3>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Concerts et DJ sets</li>
            <li>• Compétitions et jeux</li>
            <li>• Zones VIP exclusives</li>
            <li>• Animations spéciales</li>
          </ul>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">👥 Participants</h3>
          <p className="text-gray-900">Événement ouvert à tous</p>
          <p className="text-gray-700 text-sm">Rejoignez-nous sur le serveur Discord</p>
          <a href="https://discord.gg/skyfa" target="_blank" className="text-gray-700 text-sm">https://discord.gg/skyfa</a>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-400/30">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Info</h3>
          <p className="text-gray-900 text-sm">
            Utilisez la carte interactive pour trouver les différents emplacements des entreprises et stands.
          </p>
        </div>
      </div>
    </div>
  );
}
