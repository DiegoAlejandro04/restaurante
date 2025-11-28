-- Insertar categorías
INSERT INTO categories (name, description, image_url) VALUES
('Entradas', 'Deliciosas entradas para comenzar', '/placeholder.svg?height=200&width=300'),
('Platos Fuertes', 'Nuestros platillos principales', '/placeholder.svg?height=200&width=300'),
('Pastas', 'Pastas artesanales italianas', '/placeholder.svg?height=200&width=300'),
('Ensaladas', 'Ensaladas frescas y saludables', '/placeholder.svg?height=200&width=300'),
('Postres', 'Dulces tentaciones', '/placeholder.svg?height=200&width=300'),
('Bebidas', 'Refrescos y bebidas', '/placeholder.svg?height=200&width=300');

-- Insertar productos
INSERT INTO products (category_id, name, description, price, image_url, featured) VALUES
-- Entradas
(1, 'Nachos Supremos', 'Totopos con queso fundido, guacamole, pico de gallo y crema', 12.99, '/placeholder.svg?height=300&width=400', true),
(1, 'Alitas BBQ', '8 alitas de pollo bañadas en salsa BBQ casera', 14.99, '/placeholder.svg?height=300&width=400', true),
(1, 'Sopa del Día', 'Pregunta por nuestra sopa especial del día', 8.99, '/placeholder.svg?height=300&width=400', false),

-- Platos Fuertes
(2, 'Filete de Res', 'Corte premium de 300g con papas y vegetales', 32.99, '/placeholder.svg?height=300&width=400', true),
(2, 'Pollo a la Parrilla', 'Pechuga de pollo marinada con hierbas finas', 18.99, '/placeholder.svg?height=300&width=400', false),
(2, 'Costillas BBQ', 'Rack completo de costillas con salsa BBQ', 28.99, '/placeholder.svg?height=300&width=400', true),
(2, 'Salmón al Horno', 'Filete de salmón con salsa de limón y alcaparras', 26.99, '/placeholder.svg?height=300&width=400', false),

-- Pastas
(3, 'Spaghetti Carbonara', 'Pasta con tocino, huevo y queso parmesano', 16.99, '/placeholder.svg?height=300&width=400', true),
(3, 'Fettuccine Alfredo', 'Pasta en cremosa salsa de queso', 15.99, '/placeholder.svg?height=300&width=400', false),
(3, 'Lasaña Clásica', 'Capas de pasta con carne y queso gratinado', 18.99, '/placeholder.svg?height=300&width=400', false),

-- Ensaladas
(4, 'Ensalada César', 'Lechuga romana, crutones, parmesano y aderezo césar', 12.99, '/placeholder.svg?height=300&width=400', false),
(4, 'Ensalada Mediterránea', 'Mix de verdes, aceitunas, queso feta y vinagreta', 14.99, '/placeholder.svg?height=300&width=400', false),

-- Postres
(5, 'Brownie con Helado', 'Brownie tibio de chocolate con helado de vainilla', 9.99, '/placeholder.svg?height=300&width=400', true),
(5, 'Cheesecake', 'Tarta de queso con frutos rojos', 8.99, '/placeholder.svg?height=300&width=400', false),
(5, 'Flan Casero', 'Flan de vainilla con caramelo', 7.99, '/placeholder.svg?height=300&width=400', false),

-- Bebidas
(6, 'Limonada Natural', 'Limonada recién exprimida', 4.99, '/placeholder.svg?height=300&width=400', false),
(6, 'Refresco', 'Coca-Cola, Sprite, Fanta', 3.99, '/placeholder.svg?height=300&width=400', false),
(6, 'Agua Mineral', 'Agua con o sin gas', 2.99, '/placeholder.svg?height=300&width=400', false),
(6, 'Café Americano', 'Café de grano recién preparado', 3.99, '/placeholder.svg?height=300&width=400', false);

-- Insertar mesas
INSERT INTO tables (table_number, capacity) VALUES
('Mesa 1', 2),
('Mesa 2', 4),
('Mesa 3', 4),
('Mesa 4', 6),
('Mesa 5', 6),
('Mesa 6', 8),
('Barra 1', 2),
('Barra 2', 2),
('Terraza 1', 4),
('Terraza 2', 4);
