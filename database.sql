-- Créer la base de données
CREATE DATABASE IF NOT EXISTS cayo_perico;
USE cayo_perico;

-- Créer la table locations
CREATE TABLE IF NOT EXISTS locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('entreprise', 'stand', 'zone', 'zone arrivée') NOT NULL,
  x DECIMAL(5, 2) NOT NULL,
  y DECIMAL(5, 2) NOT NULL,
  description TEXT NOT NULL,
  color VARCHAR(7) NOT NULL,
  emoji VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_type ON locations(type);
CREATE INDEX idx_created_at ON locations(created_at);
