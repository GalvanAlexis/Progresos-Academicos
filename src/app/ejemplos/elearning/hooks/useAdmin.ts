'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Paso {
  numero: number;
  texto: string;
  imagen?: string;
}

export interface Leccion {
  id: string;
  titulo: string;
  ingredientes: string[];
  utensilios: string[];
  pasos: Paso[];
  tips: string[];
  imagen: string;
  completada: boolean;
}

export interface Pregunta {
  texto: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export interface Quiz {
  preguntas: Pregunta[];
  completado: boolean;
  puntaje: number;
}

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  dificultad: 1 | 2 | 3;
  duracion: number;
  imagen: string;
  lecciones: Leccion[];
  quiz: Quiz;
}

export interface Badge {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  obtenido: boolean;
}

export interface CursoProgreso {
  leccionesCompletadas: number;
  quizCompletado: boolean;
  certificadoObtenido: boolean;
}

export interface AdminState {
  alumnoNombre: string;
  alumnoAvatar: string;
  cursos: Curso[];
  badges: Badge[];
  progreso: Record<string, CursoProgreso>;
  adminAutenticado: boolean;
}

function cursosDefault(): Curso[] {
  return [
    {
      id: 'pizza',
      titulo: 'Pizza Casera',
      descripcion: 'Aprende a hacer pizza desde cero: masa, salsa, ingredientes y coccion perfecta.',
      dificultad: 2,
      duracion: 4,
      imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      lecciones: [
        {
          id: 'pizza-1',
          titulo: 'La Masa Perfecta',
          ingredientes: ['500g de harina 000', '300ml de agua tibia', '10g de levadura fresca', '2 cdas de aceite de oliva', '1 cdita de sal'],
          utensilios: ['Bowl grande', 'Cuchara de madera', 'Film transparente', 'Mesada enharinada'],
          pasos: [
            { numero: 1, texto: 'Mezcla la harina con la sal en un bowl grande.' },
            { numero: 2, texto: 'Disolve la levadura en el agua tibia y dejala reposar 5 minutos.' },
            { numero: 3, texto: 'Hace un hueco en la harina, volca la mezcla de levadura y el aceite.' },
            { numero: 4, texto: 'Amasa con las manos durante 10 minutos hasta que quede elastica.' },
            { numero: 5, texto: 'Tapa con film y deja levar 1 hora hasta que duplique su tamaño.', imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
          ],
          tips: ['El agua debe estar tibia, no caliente, sino matas la levadura.', 'Si la masa se pega, agrega un poco mas de harina.', 'Amasar es como hacer ejercicio: a mas esfuerzo, mejor resultado.'],
          imagen: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&q=80',
          completada: false,
        },
        {
          id: 'pizza-2',
          titulo: 'El Arte del Horno',
          ingredientes: ['Masa leudada', 'Harina extra para estirar'],
          utensilios: ['Rollo de amasar', 'Placa de horno', 'Papel manteca', 'Horno'],
          pasos: [
            { numero: 1, texto: 'Precalenta el horno a 220°C (lo mas caliente posible).' },
            { numero: 2, texto: 'Estira la masa con el rollo hasta que quede finita.' },
            { numero: 3, texto: 'Colocala en una placa con papel manteca.' },
            { numero: 4, texto: 'Hornea la base sola 5 minutos antes de agregar ingredientes.' },
          ],
          tips: ['El horno bien caliente es el secreto de una pizza crocante.', 'Si no tenes rollo, usa una botella de vidrio limpia.', 'Papel manteca evita que se pegue y facilita la limpieza.'],
          imagen: 'https://images.unsplash.com/photo-1566843972143-a8b3b9c减压?w=800&q=80',
          completada: false,
        },
        {
          id: 'pizza-3',
          titulo: 'Ingredientes y Toppings',
          ingredientes: ['Salsa de tomate', 'Muzarella fresca', 'Albahaca fresca', 'Aceite de oliva', 'Sal y pimienta'],
          utensilios: ['Cuchillo', 'Cuchara para salsa', 'Tabla de cortar'],
          pasos: [
            { numero: 1, texto: 'Distribui la salsa de tomate uniformemente sobre la masa.' },
            { numero: 2, texto: 'Corta la muzarella en cubos y distribui sobre la salsa.' },
            { numero: 3, texto: 'Agrega las hojas de albahaca fresca.' },
            { numero: 4, texto: 'Un chorrito de aceite de oliva por encima.' },
          ],
          tips: ['No pongas demasiada salsa o la masa quedara humeda.', 'La muzarella fresca da mejor resultado que la rallada.', 'La albahaca se pone al final para que no se queme en el horno.'],
          imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
          completada: false,
        },
        {
          id: 'pizza-4',
          titulo: 'Armado y Presentacion',
          ingredientes: ['Pizza armada', 'Hojas de albahaca fresca', 'Aceite de oliva'],
          utensilios: ['Cortapizza', 'Tabla de madera para servir'],
          pasos: [
            { numero: 1, texto: 'Hornea la pizza 12-15 minutos hasta que el borde esté dorado.' },
            { numero: 2, texto: 'Saca la pizza del horno con cuidado (guante de horno!).' },
            { numero: 3, texto: 'Agrega albahaca fresca y un chorrito de aceite de oliva.' },
            { numero: 4, texto: 'Corta con cortapizza y servi en tabla de madera.' },
          ],
          tips: ['Usa siempre guante de horno, el metal esta muy caliente.', 'Deja reposar 2 minutos antes de cortar.', 'Una pizza casera siempre se ve mejor en tabla de madera.'],
          imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
          completada: false,
        },
      ],
      quiz: {
        preguntas: [
          { texto: 'Cual es la temperatura ideal del horno para pizza casera?', opciones: ['180°C', '220°C', '150°C', '250°C'], correcta: 1, explicacion: 'El horno bien caliente (220°C) da el punto perfecto de coccion.' },
          { texto: 'Que ingrediente NO puede faltar en la masa de pizza?', opciones: ['Harina', 'Azucar', 'Levadura', 'Agua'], correcta: 1, explicacion: 'El azucar no es necesario en la masa de pizza clasica.' },
          { texto: 'Para que sirve el papel manteca en la pizza?', opciones: ['Dar sabor', 'Evitar que se pegue', 'Hacerla mas crocante', 'Decorar'], correcta: 1, explicacion: 'El papel manteca evita que la masa se pegue a la placa.' },
        ],
        completado: false,
        puntaje: 0,
      },
    },
    {
      id: 'galletitas',
      titulo: 'Galletitas Decoradas',
      descripcion: 'Galletitas de manteca con glaseado de colores. Ideales para cumpleaños y meriendas.',
      dificultad: 1,
      duracion: 3,
      imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      lecciones: [
        {
          id: 'gal-1',
          titulo: 'Masa Basica de Galletas',
          ingredientes: ['250g de manteca', '200g de azucar', '1 huevo', '400g de harina', '1 cdita de esencia de vainilla'],
          utensilios: ['Bowl', 'Batidor manual', 'Rollo de amasar', 'Cortantes de galletas'],
          pasos: [
            { numero: 1, texto: 'Bate la manteca pomada con el azucar hasta que esté cremosa.' },
            { numero: 2, texto: 'Agrega el huevo y la esencia de vainilla, mezcla bien.' },
            { numero: 3, texto: 'Incorpora la harina de a poco hasta formar una masa suave.' },
            { numero: 4, texto: 'Envuelve en film y llevala a la heladera 30 minutos.' },
          ],
          tips: ['La manteca debe estar a temperatura ambiente, no derretida.', 'No amases demasiado o las galletas saldran duras.', 'Heladera es clave para que no se peguen al cortar.'],
          imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
          completada: false,
        },
        {
          id: 'gal-2',
          titulo: 'Cortando Formas',
          ingredientes: ['Masa fría', 'Harina extra'],
          utensilios: ['Rollo de amasar', 'Cortantes de galletas', 'Placa de horno', 'Papel manteca'],
          pasos: [
            { numero: 1, texto: 'Estira la masa con el rollo hasta 1cm de espesor.' },
            { numero: 2, texto: 'Elegi los cortantes que mas te gusten (estrella, corazon, circulo).' },
            { numero: 3, texto: 'Coloca las galletas en la placa con papel manteca, separadas.' },
            { numero: 4, texto: 'Hornea a 180°C por 12 minutos o hasta bordes dorados.' },
          ],
          tips: ['Podes usar la boca de un vaso si no tenes cortantes.', 'No estires la masa muy fina o se rompera.', 'Deja espacio entre galletas porque crecen un poco en el horno.'],
          imagen: 'https://images.unsplash.com/photo-1543332164- 6e6c6b?w=800&q=80',
          completada: false,
        },
        {
          id: 'gal-3',
          titulo: 'Decoracion con Glaseado',
          ingredientes: ['200g de azucar impalpable', '2 cdas de leche', 'Colorantes vegetales', 'Granas de colores'],
          utensilios: ['Bowl chico', 'Cuchara', 'Manga pastelera o bolsita'],
          pasos: [
            { numero: 1, texto: 'Mezcla el azucar impalpable con la leche hasta obtener una pasta espesa.' },
            { numero: 2, texto: 'Separa en bowls chicos y agrega una gota de colorante a cada uno.' },
            { numero: 3, texto: 'Coloca cada glaseado en una manga pastelera (o bolsita con un piquete chico).' },
            { numero: 4, texto: 'Decora las galletas, agrega granas y deja secar 30 minutos.' },
          ],
          tips: ['El glaseado muy liquido se escurre, muy espeso no sale. Busca punto medio.', 'Usa poca cantidad de colorante, con una gota alcanza.', 'Podes hacer diseños de animales, flores o letras.'],
          imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
          completada: false,
        },
      ],
      quiz: {
        preguntas: [
          { texto: 'Por que es importante enfriar la masa de galletas antes de cortar?', opciones: ['Para que sepan mejor', 'Para que no se peguen al cortar', 'Para que crezcan mas', 'Para que sean mas dulces'], correcta: 1, explicacion: 'La masa fría se maneja mejor y no se pega a los cortantes.' },
          { texto: 'Que es la manteca pomada?', opciones: ['Manteca derretida', 'Manteca a temperatura ambiente y blanda', 'Manteca con azucar', 'Manteca congelada'], correcta: 1, explicacion: 'Manteca pomada es blanda pero no derretida, ideal para batir.' },
          { texto: 'Cuantos minutos se hornean las galletas aproximadamente?', opciones: ['5 minutos', '12 minutos', '25 minutos', '40 minutos'], correcta: 1, explicacion: '12 minutos a 180°C es el punto justo para galletas de manteca.' },
        ],
        completado: false,
        puntaje: 0,
      },
    },
    {
      id: 'ensaladas',
      titulo: 'Ensaladas Creativas',
      descripcion: 'Ensaladas coloridas y divertidas que hasta los mas chicos van a querer comer.',
      dificultad: 1,
      duracion: 3,
      imagen: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
      lecciones: [
        {
          id: 'ens-1',
          titulo: 'Bases y Verduras',
          ingredientes: ['Lechuga criolla', 'Tomate', 'Zanahoria', 'Pepino', 'Morron rojo'],
          utensilios: ['Tabla de cortar', 'Cuchillo de sierra', 'Bowl grande', 'Escurridor de verduras'],
          pasos: [
            { numero: 1, texto: 'Lava todas las verduras con agua fría.' },
            { numero: 2, texto: 'Corta la lechuga en trozos con las manos (no con cuchillo).' },
            { numero: 3, texto: 'Corta el tomate en cubos, el pepino en rodajas.' },
            { numero: 4, texto: 'Ralla la zanahoria y corta el morron en tiras finas.' },
          ],
          tips: ['Lavar las verduras es el paso mas importante para evitar bacterias.', 'Cortar la lechuga con las manos evita que se oxide y se ponga marron.', 'Cuanto mas colores tenga tu ensalada, mas vitaminas tiene.'],
          imagen: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
          completada: false,
        },
        {
          id: 'ens-2',
          titulo: 'Aderezos Caseros',
          ingredientes: ['Aceite de oliva', 'Jugo de limon', 'Mostaza', 'Miel', 'Sal y pimienta'],
          utensilios: ['Pote con tapa', 'Cuchara'],
          pasos: [
            { numero: 1, texto: 'Pone 3 cucharadas de aceite de oliva en el pote.' },
            { numero: 2, texto: 'Agrega 1 cucharada de jugo de limon.' },
            { numero: 3, texto: 'Una cucharadita de mostaza y otra de miel.' },
            { numero: 4, texto: 'Tapa y agita fuerte hasta que se mezcle todo.' },
          ],
          tips: ['Agitar en un pote con tapa es mas divertido y efectivo que batir.', 'Proba distintas combinaciones: naranja en vez de limon, yogur en vez de mostaza.', 'El aderezo casero siempre es mas sano que el comprado.'],
          imagen: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
          completada: false,
        },
        {
          id: 'ens-3',
          titulo: 'Presentacion Divertida',
          ingredientes: ['Base de verduras', 'Aderezo', 'Toppings: semillas, pasas, nueces'],
          utensilios: ['Bowl', 'Cuchara'],
          pasos: [
            { numero: 1, texto: 'Mezcla todas las verduras en el bowl.' },
            { numero: 2, texto: 'Agrega el aderezo y mezcla bien.' },
            { numero: 3, texto: 'Decora con semillas, pasas o nueces arriba.' },
            { numero: 4, texto: 'Podes hacer formas divertidas: una carita, un sol, un animal.' },
          ],
          tips: ['Las semillas de sesamo y girasol aportan color y textura.', 'Para los mas chicos, corta las verduras en formas de estrellas o corazones.', 'Una ensalada colorida se ve mas apetitosa.'],
          imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
          completada: false,
        },
      ],
      quiz: {
        preguntas: [
          { texto: 'Por que se recomienda cortar la lechuga con las manos?', opciones: ['Es mas rapido', 'Para que no se oxide', 'Porque es mas seguro', 'Para que quede mas crocante'], correcta: 1, explicacion: 'El metal del cuchillo oxida la lechuga, las manos no.' },
          { texto: 'Cual es la base de un aderezo clasico?', opciones: ['Aceite y vinagre', 'Crema y azucar', 'Agua y sal', 'Huevo y harina'], correcta: 0, explicacion: 'Aceite y acidos (vinagre o limon) son la base de todo aderezo.' },
          { texto: 'Que beneficio tiene una ensalada de muchos colores?', opciones: ['Se ve mas linda', 'Tiene mas vitaminas', 'Es mas barata', 'Rinde mas'], correcta: 1, explicacion: 'Distintos colores = distintos nutrientes y vitaminas.' },
        ],
        completado: false,
        puntaje: 0,
      },
    },
    {
      id: 'hamburguesas',
      titulo: 'Hamburguesas Saludables',
      descripcion: 'Hamburguesas caseras con ingredientes frescos y nutritivas. Mas ricas que las compradas!',
      dificultad: 2,
      duracion: 4,
      imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      lecciones: [
        {
          id: 'ham-1',
          titulo: 'Medallones Caseros',
          ingredientes: ['500g de carne picada', '1 huevo', '2 cdas de pan rallado', '1 cebolla chica', 'Sal y pimienta', 'Ajo en polvo'],
          utensilios: ['Bowl', 'Plato', 'Sarten antiadherente', 'Espatula'],
          pasos: [
            { numero: 1, texto: 'Pica la cebolla bien chiquita.' },
            { numero: 2, texto: 'Mezcla la carne picada con el huevo, pan rallado, cebolla y condimentos.' },
            { numero: 3, texto: 'Forma medallones con las manos.' },
            { numero: 4, texto: 'Cocinalos en la sarten 4 minutos de cada lado.' },
          ],
          tips: ['Humedece tus manos con agua para que la carne no se pegue.', 'No aplastes los medallones mientras se cocinan para que queden jugosos.', 'Podes agregar zanahoria rallada para mas nutrientes.'],
          imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
          completada: false,
        },
        {
          id: 'ham-2',
          titulo: 'Pan y Acompanantes',
          ingredientes: ['Pan de hamburguesa', 'Lechuga', 'Tomate', 'Cebolla morada', 'Queso cheddar'],
          utensilios: ['Cuchillo', 'Tabla de cortar'],
          pasos: [
            { numero: 1, texto: 'Tuesta los panes en la sarten o tostadora.' },
            { numero: 2, texto: 'Lava y corta la lechuga y el tomate en rodajas.' },
            { numero: 3, texto: 'Corta la cebolla morada en aros finos.' },
            { numero: 4, texto: 'Prepara los ingredientes en estaciones para armar.' },
          ],
          tips: ['Tostar el pan evita que se humedezca con los jugos de la carne.', 'Cebolla morada es mas suave que la blanca, ideal para hamburguesas.', 'Podes agregar pepinos en vinagre para un toque agridulce.'],
          imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
          completada: false,
        },
        {
          id: 'ham-3',
          titulo: 'Salsas Saludables',
          ingredientes: ['Yogur natural', 'Mostaza', 'Miel', 'Jugo de limon', 'Perejil fresco'],
          utensilios: ['Bowl chico', 'Cuchara'],
          pasos: [
            { numero: 1, texto: 'Pone 4 cucharadas de yogur natural en el bowl.' },
            { numero: 2, texto: 'Agrega 1 cucharada de mostaza y 1 de miel.' },
            { numero: 3, texto: 'Exprime medio limon y mezcla todo.' },
            { numero: 4, texto: 'Agrega perejil picado y mezcla de nuevo.' },
          ],
          tips: ['Esta salsa es mucho mas sana que el ketchup o mayonesa comprados.', 'Podes variar las hierbas: cilantro, ciboulette o albahaca.', 'Guarda la salsa en un pote hermetico hasta 3 dias.'],
          imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
          completada: false,
        },
        {
          id: 'ham-4',
          titulo: 'Armado Final',
          ingredientes: ['Medallon cocido', 'Pan tostado', 'Lechuga', 'Tomate', 'Cebolla', 'Queso', 'Salsa'],
          utensilios: ['Plato', 'Servilletas'],
          pasos: [
            { numero: 1, texto: 'Coloca la base del pan en el plato.' },
            { numero: 2, texto: 'Unta la salsa en ambos panes.' },
            { numero: 3, texto: 'Apila: lechuga, medallon con queso, tomate, cebolla.' },
            { numero: 4, texto: 'Tapa con el pan superior y... a disfrutar!' },
          ],
          tips: ['Pone el queso sobre el medallon caliente para que se derrita.', 'No le pongas demasiados ingredientes o no podras abrir la boca.', 'Acompania con papas al horno o batatas fritas.'],
          imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
          completada: false,
        },
      ],
      quiz: {
        preguntas: [
          { texto: 'Por que es importante humedecerse las manos al formar medallones?', opciones: ['Para que la carne no se pegue', 'Para darle mas sabor', 'Para que se cocinen mas rapido', 'Para que queden mas grandes'], correcta: 0, explicacion: 'Las manos humedas evitan que la carne cruda se pegue.' },
          { texto: 'Cual es una alternativa saludable al ketchup?', opciones: ['Mayonesa', 'Salsa de yogur', 'Mostaza sola', 'Barbacoa'], correcta: 1, explicacion: 'La salsa de yogur casera tiene menos azucar y es mas nutritiva.' },
          { texto: 'Cuantos minutos se cocina cada lado del medallon?', opciones: ['2 minutos', '4 minutos', '8 minutos', '10 minutos'], correcta: 1, explicacion: '4 minutos por lado es el punto justo para una hamburguesa jugosa.' },
        ],
        completado: false,
        puntaje: 0,
      },
    },
    {
      id: 'tortas',
      titulo: 'Tortas y Cumpleanos',
      descripcion: 'Tortas de varios pisos con rellenos, cremas y decoracion espectacular.',
      dificultad: 3,
      duracion: 5,
      imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      lecciones: [
        {
          id: 'tor-1',
          titulo: 'Bizcochuelo Esponjoso',
          ingredientes: ['6 huevos', '200g de azucar', '200g de harina leudante', '1 cdita de esencia de vainilla', 'Ralladura de 1 limon'],
          utensilios: ['Batidora electrica', 'Bowl grande', 'Molde para torta', 'Tamiz'],
          pasos: [
            { numero: 1, texto: 'Bate los huevos con el azucar hasta que tripliquen su volumen.' },
            { numero: 2, texto: 'Agrega la esencia de vainilla y la ralladura de limon.' },
            { numero: 3, texto: 'Tamiza la harina y agregala de a poco con movimientos envolventes.' },
            { numero: 4, texto: 'Vierte en el molde enmantecado y hornea 35 minutos a 180°C.' },
          ],
          tips: ['Los huevos deben estar a temperatura ambiente para que monten mejor.', 'Los movimientos envolventes evitan que la preparacion se baje.', 'No abras el horno durante los primeros 25 minutos o se baja.'],
          imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
          completada: false,
        },
        {
          id: 'tor-2',
          titulo: 'Rellenos y Cremas',
          ingredientes: ['500ml de crema de leche', '100g de azucar impalpable', '200g de dulce de leche', 'Esencia de vainilla'],
          utensilios: ['Batidora', 'Bowl', 'Manga pastelera'],
          pasos: [
            { numero: 1, texto: 'Bate la crema de leche con el azucar impalpable hasta que esté firme.' },
            { numero: 2, texto: 'Separa la mitad de la crema y mezclala con el dulce de leche.' },
            { numero: 3, texto: 'Corta el bizcochuelo en tres capas horizontales.' },
            { numero: 4, texto: 'Rellena cada capa alternando crema dulce y crema comun.' },
          ],
          tips: ['La crema debe estar bien fría para que monte mejor.', 'Usa un hilo dental para cortar el bizcochuelo en capas parejas.', 'No escatimes en relleno, es la parte mas rica.'],
          imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
          completada: false,
        },
        {
          id: 'tor-3',
          titulo: 'Cobertura Perfecta',
          ingredientes: ['500g de pasta americana', 'Azucar impalpable para estirar', 'Colorante', 'Agua'],
          utensilios: ['Rollo de amasar', 'Alisador de tortas', 'Cortante', 'Pincel'],
          pasos: [
            { numero: 1, texto: 'Amasa la pasta americana hasta que esté flexible.' },
            { numero: 2, texto: 'Estirala sobre una superficie con azucar impalpable.' },
            { numero: 3, texto: 'Cubre la torta con la pasta estirada y alisa con el alisador.' },
            { numero: 4, texto: 'Corta el excedente con el cortante.' },
          ],
          tips: ['La pasta americana se seca rapido, mantenla tapada con film.', 'Si se rompe, humedece los bordes con agua y une.', 'El alisador da un acabado profesional.'],
          imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
          completada: false,
        },
        {
          id: 'tor-4',
          titulo: 'Decoracion Basica',
          ingredientes: ['Pasta americana de colores', 'Pegamento comestible', 'Perlas comestibles', 'Cintas'],
          utensilios: ['Cortantes de letras', 'Pinzas', 'Pincel fino'],
          pasos: [
            { numero: 1, texto: 'Estira pasta americana de colores y corta formas decorativas.' },
            { numero: 2, texto: 'Pega las figuras en la torta con pegamento comestible.' },
            { numero: 3, texto: 'Agrega perlas comestibles alrededor de la base.' },
            { numero: 4, texto: 'Coloca una cinta decorativa alrededor de la torta.' },
          ],
          tips: ['Las flores de pasta americana se hacen con cortantes especiales.', 'Las perlas doradas y plateadas dan un toque elegante.', 'La cinta no solo decora, tambien cubre imperfecciones del borde.'],
          imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
          completada: false,
        },
        {
          id: 'tor-5',
          titulo: 'Mensajes y Detalles',
          ingredientes: ['Pasta americana blanca', 'Colorante negro comestible'],
          utensilios: ['Cortante de letras', 'Pincel fino', 'Regla'],
          pasos: [
            { numero: 1, texto: 'Estira pasta americana blanca finita.' },
            { numero: 2, texto: 'Corta las letras del mensaje que quieras escribir.' },
            { numero: 3, texto: 'Coloca el mensaje en la parte superior de la torta.' },
            { numero: 4, texto: 'Agrega detalles finales: estrellas, puntos, lineas decorativas.' },
          ],
          tips: ['Planifica el mensaje antes de cortar las letras.', 'Los mensajes cortos quedan mejor: "Feliz Cumple" o "Te quiero".', 'Las letras se pegan con un poquito de agua.'],
          imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
          completada: false,
        },
      ],
      quiz: {
        preguntas: [
          { texto: 'Por que no se debe abrir el horno al hornear un bizcochuelo?', opciones: ['Porque se enfria el horno', 'Porque la preparacion se baja', 'Porque se quema', 'Porque tarda mas'], correcta: 1, explicacion: 'El cambio brusco de temperatura hace que el bizcochuelo se baje.' },
          { texto: 'Que herramienta se puede usar para cortar el bizcochuelo en capas parejas?', opciones: ['Cuchillo', 'Hilo dental', 'Tijera', 'Cortapizza'], correcta: 1, explicacion: 'El hilo dental tenso corta capas parejas sin migajas.' },
          { texto: 'Que es la pasta americana?', opciones: ['Un tipo de crema', 'Una masa para cubrir tortas', 'Un relleno liquido', 'Una fruta'], correcta: 1, explicacion: 'La pasta americana es una masa elastica que se usa para cubrir y decorar tortas.' },
        ],
        completado: false,
        puntaje: 0,
      },
    },
  ];
}

function badgesDefault(): Badge[] {
  return [
    { id: 'primera-leccion', nombre: 'Primera Leccion', icono: '⭐', descripcion: 'Completaste tu primera leccion', obtenido: false },
    { id: 'curso-completo', nombre: 'Curso Completo', icono: '🏆', descripcion: 'Completaste un curso entero', obtenido: false },
    { id: 'aprobado-10', nombre: 'Excelencia', icono: '🎯', descripcion: 'Sacaste 10 en un quiz', obtenido: false },
    { id: 'coleccionista', nombre: 'Coleccionista', icono: '🎖️', descripcion: 'Completaste 3 cursos', obtenido: false },
    { id: 'chef-principiante', nombre: 'Chef Principiante', icono: '👨‍🍳', descripcion: 'Completaste tu primer curso de nivel 1', obtenido: false },
    { id: 'chef-intermedio', nombre: 'Chef Intermedio', icono: '👩‍🍳', descripcion: 'Completaste un curso de nivel 2', obtenido: false },
    { id: 'chef-avanzado', nombre: 'Chef Avanzado', icono: '🧑‍🍳', descripcion: 'Completaste un curso de nivel 3', obtenido: false },
  ];
}

function progresoDefault(): Record<string, CursoProgreso> {
  const ids = ['pizza', 'galletitas', 'ensaladas', 'hamburguesas', 'tortas'];
  const map: Record<string, CursoProgreso> = {};
  ids.forEach((id) => {
    map[id] = { leccionesCompletadas: 0, quizCompletado: false, certificadoObtenido: false };
  });
  return map;
}

const STORAGE_KEY = 'sabor-admin';

function stateDefault(): AdminState {
  return {
    alumnoNombre: 'Chef',
    alumnoAvatar: 'cat',
    cursos: cursosDefault(),
    badges: badgesDefault(),
    progreso: progresoDefault(),
    adminAutenticado: false,
  };
}

function loadState(): AdminState {
  if (typeof window === 'undefined') return stateDefault();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return stateDefault();
    const parsed = JSON.parse(raw);
    return {
      ...stateDefault(),
      ...parsed,
      cursos: parsed.cursos || cursosDefault(),
      badges: parsed.badges || badgesDefault(),
      progreso: { ...progresoDefault(), ...parsed.progreso },
    };
  } catch {
    return stateDefault();
  }
}

function saveState(state: AdminState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded, silencio */ }
}

export function useAdmin() {
  const [state, setState] = useState<AdminState>(stateDefault);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'home' | 'curso' | 'leccion' | 'quiz' | 'certificado'>('home');
  const [cursoActivo, setCursoActivo] = useState<string | null>(null);
  const [leccionActiva, setLeccionActiva] = useState<string | null>(null);

  useEffect(() => {
    const s = loadState();
    setState(s);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveState(state);
  }, [state, loaded]);

  const update = useCallback((partial: Partial<AdminState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const marcarLeccionCompletada = useCallback((cursoId: string, leccionId: string) => {
    setState((prev) => {
      const cursos = prev.cursos.map((c) =>
        c.id === cursoId
          ? { ...c, lecciones: c.lecciones.map((l) => (l.id === leccionId ? { ...l, completada: true } : l)) }
          : c
      );
      const curso = cursos.find((c) => c.id === cursoId);
      const completadas = curso?.lecciones.filter((l) => l.completada).length || 0;
      const progreso = {
        ...prev.progreso,
        [cursoId]: {
          ...prev.progreso[cursoId],
          leccionesCompletadas: completadas,
        },
      };
      const badges = completadas >= 1
        ? prev.badges.map((b) => b.id === 'primera-leccion' ? { ...b, obtenido: true } : b)
        : prev.badges;
      return { ...prev, cursos, progreso, badges };
    });
  }, []);

  const marcarQuizCompletado = useCallback((cursoId: string, puntaje: number) => {
    setState((prev) => {
      const cursos = prev.cursos.map((c) =>
        c.id === cursoId ? { ...c, quiz: { ...c.quiz, completado: true, puntaje } } : c
      );
      const progreso = {
        ...prev.progreso,
        [cursoId]: { ...prev.progreso[cursoId], quizCompletado: true, certificadoObtenido: true },
      };
      const badges = prev.badges.map((b) => {
        if (b.id === 'curso-completo') return { ...b, obtenido: true };
        if (puntaje >= 3 && b.id === 'aprobado-10') return { ...b, obtenido: true };
        const curso = cursos.find((c) => c.id === cursoId);
        const nvl = curso?.dificultad;
        if (nvl === 1 && b.id === 'chef-principiante') return { ...b, obtenido: true };
        if (nvl === 2 && b.id === 'chef-intermedio') return { ...b, obtenido: true };
        if (nvl === 3 && b.id === 'chef-avanzado') return { ...b, obtenido: true };
        return b;
      });
      const totalCompletados = Object.values(progreso).filter((p) => p.quizCompletado).length;
      const badgesFinal = badges.map((b) => {
        if (totalCompletados >= 3 && b.id === 'coleccionista') return { ...b, obtenido: true };
        return b;
      });
      return { ...prev, cursos, progreso, badges: badgesFinal };
    });
  }, []);

  const actualizarPerfil = useCallback((nombre: string, avatar: string) => {
    setState((prev) => ({ ...prev, alumnoNombre: nombre, alumnoAvatar: avatar }));
  }, []);

  const reset = useCallback(() => {
    setState(stateDefault());
  }, []);

  const abrirCurso = useCallback((cursoId: string) => {
    setCursoActivo(cursoId);
    setView('curso');
  }, []);

  const abrirLeccion = useCallback((leccionId: string) => {
    setLeccionActiva(leccionId);
    setView('leccion');
  }, []);

  const cerrarCurso = useCallback(() => {
    setCursoActivo(null);
    setLeccionActiva(null);
    setView('home');
  }, []);

  const iniciarQuiz = useCallback(() => {
    setView('quiz');
  }, []);

  const cerrarQuiz = useCallback(() => {
    setView('curso');
  }, []);

  const abrirCertificado = useCallback(() => {
    setView('certificado');
  }, []);

  const cerrarCertificado = useCallback(() => {
    setView('curso');
  }, []);

  const cursoActual = state.cursos.find((c) => c.id === cursoActivo) || null;
  const leccionActual = cursoActual?.lecciones.find((l) => l.id === leccionActiva) || null;
  const progresoCursoActual = cursoActivo ? state.progreso[cursoActivo] || { leccionesCompletadas: 0, quizCompletado: false, certificadoObtenido: false } : null;

  const nivel = Math.min(10, Math.max(1, Math.floor(
    Object.values(state.progreso).filter((p) => p.quizCompletado).length * 2 + 1
  )));

  const cursosCompletados = Object.values(state.progreso).filter((p) => p.quizCompletado).length;

  return {
    ...state,
    update,
    marcarLeccionCompletada,
    marcarQuizCompletado,
    actualizarPerfil,
    reset,
    view,
    cursoActivo,
    leccionActiva,
    cursoActual,
    leccionActual,
    progresoCursoActual,
    abrirCurso,
    abrirLeccion,
    cerrarCurso,
    iniciarQuiz,
    cerrarQuiz,
    abrirCertificado,
    cerrarCertificado,
    setView,
    nivel,
    cursosCompletados,
  };
}
