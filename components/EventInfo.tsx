'use client';

export default function EventInfo() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        🎉 Informations Événement
      </h2>
      
      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">📅 Date & Heure</h3>
          <p className="text-white">Dimanche 21 Juin 2026</p>
          <p className="text-white/80">21:00 - 02:00</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">📍 Lieu</h3>
          <p className="text-white">Île de Cayo Perico</p>
          <p className="text-white/80">Cayo festival</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">🎯 Activités</h3>
          <ul className="text-white/80 space-y-1 text-sm">
            <li>• Concerts et DJ sets</li>
            <li>• Compétitions et jeux</li>
            <li>• Zones VIP exclusives</li>
            <li>• Animations spéciales</li>
          </ul>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">👥 Participants</h3>
          <p className="text-white">Événement ouvert à tous</p>
          <p className="text-white/80 text-sm">Rejoignez-nous sur le serveur Discord</p>
          <a href="https://discord.gg/skyfa" target="_blank" className="text-white/80 text-sm">https://discord.gg/skyfa</a>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
          <h3 className="text-lg font-semibold text-purple-200 mb-2">💡 Info</h3>
          <p className="text-white/90 text-sm">
            Utilisez la carte interactive pour trouver les différents emplacements des entreprises et stands.
          </p>
        </div>
      </div>
    </div>
  );
}
