-- Insert sample products
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Huile Essentielle de Lavande', 'Huile essentielle pure de lavande bio, idéale pour la relaxation et le sommeil réparateur. 100% naturelle et certifiée biologique.', 24.99, 'Huiles Essentielles', 50, '/placeholder.svg?height=400&width=400'),
('Tisane Détox Bio', 'Mélange de plantes biologiques pour une détoxification naturelle. Contient du thé vert, du pissenlit et de la menthe poivrée.', 15.99, 'Tisanes', 100, '/placeholder.svg?height=400&width=400'),
('Complément Vitamine D3', 'Vitamine D3 naturelle issue de lichen, parfaite pour renforcer le système immunitaire. Dosage optimal de 2000 UI.', 19.99, 'Compléments', 75, '/placeholder.svg?height=400&width=400'),
('Crème Hydratante Naturelle', 'Crème visage bio à base d''aloe vera et d''huile de jojoba. Hydrate en profondeur sans laisser de film gras.', 32.99, 'Cosmétiques', 40, '/placeholder.svg?height=400&width=400'),
('Gélules de Curcuma Bio', 'Curcuma bio concentré avec pipérine pour une meilleure absorption. Anti-inflammatoire naturel puissant.', 22.99, 'Compléments', 60, '/placeholder.svg?height=400&width=400'),
('Huile de Massage Relaxante', 'Synergie d''huiles essentielles pour massage relaxant. Parfaite pour soulager les tensions musculaires.', 28.99, 'Huiles Essentielles', 35, '/placeholder.svg?height=400&width=400'),
('Infusion Sommeil Paisible', 'Mélange de camomille, valériane et passiflore pour favoriser un sommeil naturel et réparateur.', 14.99, 'Tisanes', 80, '/placeholder.svg?height=400&width=400'),
('Sérum Anti-Âge Naturel', 'Sérum concentré en acide hyaluronique et vitamine C naturelle. Réduit visiblement les rides et ridules.', 45.99, 'Cosmétiques', 25, '/placeholder.svg?height=400&width=400');

-- Insert sample testimonials
INSERT INTO testimonials (author_name, content, rating, is_featured) VALUES
('Marie Dubois', 'Les produits NaturaVie ont transformé ma routine bien-être. L''huile de lavande m''aide à mieux dormir et la tisane détox est délicieuse !', 5, true),
('Jean Martin', 'Excellent service et produits de qualité. Je recommande particulièrement le complément de vitamine D3, très efficace pendant l''hiver.', 5, true),
('Sophie Laurent', 'Enfin des cosmétiques naturels qui fonctionnent vraiment ! Ma peau n''a jamais été aussi belle depuis que j''utilise la crème hydratante.', 5, false),
('Pierre Rousseau', 'Très satisfait de mes achats. Les produits sont authentiques et les conseils personnalisés sont précieux.', 4, false);
