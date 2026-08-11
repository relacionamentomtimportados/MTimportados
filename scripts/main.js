/* ==========================================================================
   ARÔME DE CAPELIN - UNIFIED SINGLE PAGE APPLICATION (SPA) ROUTER & CORE
   Catalog with Perfumes, Roupas, Fármacos & Top 5 Weekly Ranking
   ========================================================================== */

const INITIAL_PRODUCTS_DATA = [
  {
    "id": "1000",
    "title": "Lattafa Asad EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 263,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 34,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "#1 TOP 5",
    "top5Rank": 1,
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 13,
    "sku": "PER-1000",
    "description": "Descrição genérica para Lattafa Asad EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1001",
    "title": "Lattafa Khamrah EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 439,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 114,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "#2 TOP 5",
    "top5Rank": 2,
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 11,
    "sku": "PER-1001",
    "description": "Descrição genérica para Lattafa Khamrah EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1002",
    "title": "Armaf Club de Nuit Intense EDP 100ml",
    "brand": "Armaf",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 252,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 43,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "#3 TOP 5",
    "top5Rank": 3,
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 49,
    "sku": "PER-1002",
    "description": "Descrição genérica para Armaf Club de Nuit Intense EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1003",
    "title": "Afnan Supremacy Silver EDP 100ml",
    "brand": "Afnan",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 285,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 48,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "#4 TOP 5",
    "top5Rank": 4,
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 44,
    "sku": "PER-1003",
    "description": "Descrição genérica para Afnan Supremacy Silver EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1004",
    "title": "Al Haramain L'Aventure EDP 100ml",
    "brand": "Al",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 361,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 64,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "#5 TOP 5",
    "top5Rank": 5,
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 25,
    "sku": "PER-1004",
    "description": "Descrição genérica para Al Haramain L'Aventure EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1005",
    "title": "Lattafa Fakhar EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 340,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 105,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 43,
    "sku": "PER-1005",
    "description": "Descrição genérica para Lattafa Fakhar EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1006",
    "title": "Rasasi Hawas EDP 100ml",
    "brand": "Rasasi",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 336,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 70,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 10,
    "sku": "PER-1006",
    "description": "Descrição genérica para Rasasi Hawas EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1007",
    "title": "Swiss Arabian Shaghaf Oud EDP 100ml",
    "brand": "Swiss",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 352,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 108,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 13,
    "sku": "PER-1007",
    "description": "Descrição genérica para Swiss Arabian Shaghaf Oud EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1008",
    "title": "Lattafa Bade'e Al Oud EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 424,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 87,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 29,
    "sku": "PER-1008",
    "description": "Descrição genérica para Lattafa Bade'e Al Oud EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1009",
    "title": "Maison Alhambra Kismet EDP 100ml",
    "brand": "Maison",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 385,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 59,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 10,
    "sku": "PER-1009",
    "description": "Descrição genérica para Maison Alhambra Kismet EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1010",
    "title": "Lattafa Nebras EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 252,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 55,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 21,
    "sku": "PER-1010",
    "description": "Descrição genérica para Lattafa Nebras EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1011",
    "title": "Lattafa Qaa'ed EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 372,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 64,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 33,
    "sku": "PER-1011",
    "description": "Descrição genérica para Lattafa Qaa'ed EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1012",
    "title": "Armaf Tres Nuit EDP 100ml",
    "brand": "Armaf",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 383,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 85,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 41,
    "sku": "PER-1012",
    "description": "Descrição genérica para Armaf Tres Nuit EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1013",
    "title": "Afnan 9pm EDP 100ml",
    "brand": "Afnan",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 423,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 15,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 27,
    "sku": "PER-1013",
    "description": "Descrição genérica para Afnan 9pm EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1014",
    "title": "Lattafa Yara EDP 100ml",
    "brand": "Lattafa",
    "categorySlug": "perfumes-arabes",
    "categoryName": "Perfumes Árabes",
    "department": "perfumes-arabes",
    "price": 365,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 68,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 15,
    "sku": "PER-1014",
    "description": "Descrição genérica para Lattafa Yara EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1015",
    "title": "Dior Sauvage EDP 100ml",
    "brand": "Dior",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 1284,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 84,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 22,
    "sku": "PER-1015",
    "description": "Descrição genérica para Dior Sauvage EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1016",
    "title": "Bleu de Chanel EDP 100ml",
    "brand": "Bleu",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 755,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 31,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 49,
    "sku": "PER-1016",
    "description": "Descrição genérica para Bleu de Chanel EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1017",
    "title": "Paco Rabanne 1 Million EDP 100ml",
    "brand": "Paco",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 1271,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 100,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 26,
    "sku": "PER-1017",
    "description": "Descrição genérica para Paco Rabanne 1 Million EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1018",
    "title": "Versace Eros EDP 100ml",
    "brand": "Versace",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 864,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 102,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 44,
    "sku": "PER-1018",
    "description": "Descrição genérica para Versace Eros EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1019",
    "title": "Giorgio Armani Acqua Di Giò EDP 100ml",
    "brand": "Giorgio",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 1162,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 89,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 14,
    "sku": "PER-1019",
    "description": "Descrição genérica para Giorgio Armani Acqua Di Giò EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1020",
    "title": "YSL Y EDP EDP 100ml",
    "brand": "YSL",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 1255,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 51,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 42,
    "sku": "PER-1020",
    "description": "Descrição genérica para YSL Y EDP EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1021",
    "title": "Tom Ford Black Orchid EDP 100ml",
    "brand": "Tom",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 504,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 27,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 27,
    "sku": "PER-1021",
    "description": "Descrição genérica para Tom Ford Black Orchid EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1022",
    "title": "Creed Aventus EDP 100ml",
    "brand": "Creed",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 648,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 63,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 33,
    "sku": "PER-1022",
    "description": "Descrição genérica para Creed Aventus EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1023",
    "title": "Jean Paul Gaultier Le Male EDP 100ml",
    "brand": "Jean",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 980,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 85,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 17,
    "sku": "PER-1023",
    "description": "Descrição genérica para Jean Paul Gaultier Le Male EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1024",
    "title": "Carolina Herrera Bad Boy EDP 100ml",
    "brand": "Carolina",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 711,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 18,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 11,
    "sku": "PER-1024",
    "description": "Descrição genérica para Carolina Herrera Bad Boy EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1025",
    "title": "Dolce & Gabbana Light Blue EDP 100ml",
    "brand": "Dolce",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 1196,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 48,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 17,
    "sku": "PER-1025",
    "description": "Descrição genérica para Dolce & Gabbana Light Blue EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1026",
    "title": "Prada L'Homme EDP 100ml",
    "brand": "Prada",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 953,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 101,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 24,
    "sku": "PER-1026",
    "description": "Descrição genérica para Prada L'Homme EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1027",
    "title": "Bvlgari Man In Black EDP 100ml",
    "brand": "Bvlgari",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 862,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 95,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 30,
    "sku": "PER-1027",
    "description": "Descrição genérica para Bvlgari Man In Black EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1028",
    "title": "Hermès Terre d'Hermès EDP 100ml",
    "brand": "Hermès",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 718,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 54,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 37,
    "sku": "PER-1028",
    "description": "Descrição genérica para Hermès Terre d'Hermès EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1029",
    "title": "Givenchy Gentleman EDP 100ml",
    "brand": "Givenchy",
    "categorySlug": "perfumes-importados",
    "categoryName": "Perfumes Importados",
    "department": "perfumes-importados",
    "price": 1061,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 78,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 35,
    "sku": "PER-1029",
    "description": "Descrição genérica para Givenchy Gentleman EDP 100ml. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1030",
    "title": "Caneta Ozempic 1mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1227,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 94,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 35,
    "sku": "EMA-1030",
    "description": "Descrição genérica para Caneta Ozempic 1mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1031",
    "title": "Caneta Ozempic 0.5mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1737,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 82,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 25,
    "sku": "EMA-1031",
    "description": "Descrição genérica para Caneta Ozempic 0.5mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1032",
    "title": "Caneta Ozempic 0.25mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1812,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 83,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 46,
    "sku": "EMA-1032",
    "description": "Descrição genérica para Caneta Ozempic 0.25mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1033",
    "title": "Caneta Wegovy 2.4mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 868,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 103,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 31,
    "sku": "EMA-1033",
    "description": "Descrição genérica para Caneta Wegovy 2.4mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1034",
    "title": "Caneta Wegovy 1.7mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1147,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 40,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 27,
    "sku": "EMA-1034",
    "description": "Descrição genérica para Caneta Wegovy 1.7mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1035",
    "title": "Caneta Saxenda 3mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1966,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 15,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 43,
    "sku": "EMA-1035",
    "description": "Descrição genérica para Caneta Saxenda 3mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1036",
    "title": "Caneta Mounjaro 5mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 843,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 22,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 46,
    "sku": "EMA-1036",
    "description": "Descrição genérica para Caneta Mounjaro 5mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1037",
    "title": "Caneta Mounjaro 10mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 822,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 43,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 38,
    "sku": "EMA-1037",
    "description": "Descrição genérica para Caneta Mounjaro 10mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1038",
    "title": "Caneta Rybelsus 3mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1835,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 86,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 31,
    "sku": "EMA-1038",
    "description": "Descrição genérica para Caneta Rybelsus 3mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1039",
    "title": "Caneta Rybelsus 7mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 2093,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 99,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 45,
    "sku": "EMA-1039",
    "description": "Descrição genérica para Caneta Rybelsus 7mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1040",
    "title": "Caneta Rybelsus 14mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1286,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 70,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 20,
    "sku": "EMA-1040",
    "description": "Descrição genérica para Caneta Rybelsus 14mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1041",
    "title": "Caneta Trulicity 1.5mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1265,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 69,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 37,
    "sku": "EMA-1041",
    "description": "Descrição genérica para Caneta Trulicity 1.5mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1042",
    "title": "Caneta Victoza 6mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 2230,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 68,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 42,
    "sku": "EMA-1042",
    "description": "Descrição genérica para Caneta Victoza 6mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1043",
    "title": "Caneta Orlistate 120mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 1033,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 48,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 37,
    "sku": "EMA-1043",
    "description": "Descrição genérica para Caneta Orlistate 120mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1044",
    "title": "Caneta Sibutramina 15mg",
    "brand": "Farmacêutica",
    "categorySlug": "emagrecedores",
    "categoryName": "Emagrecedores",
    "department": "emagrecedores",
    "price": 851,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 31,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 45,
    "sku": "EMA-1044",
    "description": "Descrição genérica para Caneta Sibutramina 15mg. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1045",
    "title": "Rolex Submariner",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 8131,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 72,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 39,
    "sku": "EXC-1045",
    "description": "Descrição genérica para Rolex Submariner. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1046",
    "title": "Bolsa Chanel Classic Flap",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 14223,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 44,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 41,
    "sku": "EXC-1046",
    "description": "Descrição genérica para Bolsa Chanel Classic Flap. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1047",
    "title": "Tênis Nike Air Jordan 1 Chicago",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 12759,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 53,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 45,
    "sku": "EXC-1047",
    "description": "Descrição genérica para Tênis Nike Air Jordan 1 Chicago. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1048",
    "title": "Pulseira Cartier Love",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 14219,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 91,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 32,
    "sku": "EXC-1048",
    "description": "Descrição genérica para Pulseira Cartier Love. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1049",
    "title": "Óculos Louis Vuitton Millionaires",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 15090,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 86,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 14,
    "sku": "EXC-1049",
    "description": "Descrição genérica para Óculos Louis Vuitton Millionaires. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1050",
    "title": "Bolsa Hermès Birkin 30",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 11366,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 56,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 10,
    "sku": "EXC-1050",
    "description": "Descrição genérica para Bolsa Hermès Birkin 30. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1051",
    "title": "Tênis Yeezy Boost 350",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 3742,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 47,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 29,
    "sku": "EXC-1051",
    "description": "Descrição genérica para Tênis Yeezy Boost 350. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1052",
    "title": "Cinto Gucci GG",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 11599,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 30,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 42,
    "sku": "EXC-1052",
    "description": "Descrição genérica para Cinto Gucci GG. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1053",
    "title": "Mala Rimowa Classic",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 14044,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 47,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 27,
    "sku": "EXC-1053",
    "description": "Descrição genérica para Mala Rimowa Classic. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1054",
    "title": "Relógio Patek Philippe Nautilus",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 13393,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 55,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 49,
    "sku": "EXC-1054",
    "description": "Descrição genérica para Relógio Patek Philippe Nautilus. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1055",
    "title": "Jaqueta Supreme x The North Face",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 16957,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 29,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 11,
    "sku": "EXC-1055",
    "description": "Descrição genérica para Jaqueta Supreme x The North Face. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1056",
    "title": "Bolsa Prada Cleo",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 10727,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 86,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 22,
    "sku": "EXC-1056",
    "description": "Descrição genérica para Bolsa Prada Cleo. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1057",
    "title": "Tênis Travis Scott x Jordan 1",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 10330,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 83,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 20,
    "sku": "EXC-1057",
    "description": "Descrição genérica para Tênis Travis Scott x Jordan 1. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1058",
    "title": "Moletom Balenciaga",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 2850,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 81,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 27,
    "sku": "EXC-1058",
    "description": "Descrição genérica para Moletom Balenciaga. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  },
  {
    "id": "1059",
    "title": "Tênis Off-White x Nike Dunk",
    "brand": "Luxo",
    "categorySlug": "exclusivos",
    "categoryName": "Exclusivos",
    "department": "exclusivos",
    "price": 10951,
    "pixDiscount": 8,
    "installments": 8,
    "rating": 5,
    "reviewsCount": 37,
    "image": "assets/products/placeholder.svg",
    "gallery": [
      "assets/products/placeholder.svg"
    ],
    "badge": "",
    "variants": [
      "Padrão"
    ],
    "inStock": true,
    "stockQuantity": 13,
    "sku": "EXC-1059",
    "description": "Descrição genérica para Tênis Off-White x Nike Dunk. Produto premium importado de altíssima qualidade.",
    "specs": {
      "specType": "default",
      "info": "Produto importado"
    }
  }
];

window.PRODUCTS_DATA = [];

async function fetchCatalogData() {
  if (window.supabaseClient) {
    try {
      const { data, error } = await window.supabaseClient.from('products').select('*');
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.error("Error fetching from Supabase:", e);
    }
  }
  return INITIAL_PRODUCTS_DATA;
}
// SPA View Switcher Router
function navigateTo(viewName, params = {}) {
  const views = document.querySelectorAll('.view-section');
  views.forEach(v => v.classList.remove('active'));

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Active nav highlights
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.parentElement.classList.remove('active'));

  runViewLoaders(viewName, params);

  let hashStr = `#${viewName}`;
  if (params.cat) hashStr += `?cat=${params.cat}`;
  if (params.id) hashStr += `?id=${params.id}`;
  history.pushState(null, null, hashStr);
}

function runViewLoaders(viewName, params) {
  if (viewName === 'category' && params.cat) {
    if (window.categoryManager) {
      window.categoryManager.loadCategory(params.cat);
    }
  } else if (viewName === 'product' && params.id) {
    if (window.productManager) {
      window.productManager.loadProduct(params.id);
    }
  } else if (viewName === 'admin') {
    if (window.adminManager) {
      window.adminManager.renderAdminProductsTable();
    }
  }
}

window.navigateTo = navigateTo;

function createProductCardHTML(p, showRank = false) {
  const pixPrice = p.price * (1 - (p.pixDiscount || 8) / 100);
  const installmentVal = p.price / (p.installments || 8);
  const rankHtml = showRank && p.top5Rank ? `<div class="top5-ranking-badge">#${p.top5Rank}</div>` : '';
  const firstVariant = (p.variants && p.variants.length > 0) ? p.variants[0] : "Padrão";

  return `
    <div class="product-card">
      ${rankHtml}
      <div class="product-image-container" onclick="window.navigateTo('product', {id: '${p.id}'})" style="cursor:pointer;">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="product-info-container">
        <div class="product-brand">${p.brand || ''}</div>
        <h3 class="product-title" onclick="window.navigateTo('product', {id: '${p.id}'})" style="cursor:pointer;">${p.title}</h3>
        <div class="product-stars">★★★★★ <span>(${p.reviewsCount || 10})</span></div>
        <div class="product-price-block">
          <div class="price-old">R$ ${(p.price * 1.15).toFixed(2).replace('.', ',')}</div>
          <div class="price-pix">R$ ${pixPrice.toFixed(2).replace('.', ',')}</div>
          <div class="price-pix-label">à vista no PIX (-${p.pixDiscount || 8}%)</div>
        </div>
        <button class="btn-buy-card" onclick="window.cartManager.addItem({id:'${p.id}', name:'${p.title.replace(/'/g, "\\'")}', price:${p.price}, pixPrice:${pixPrice}, pixDiscountPercent:${p.pixDiscount || 8}, image:'${p.image}'}, 1, '${firstVariant}')">
          🛒 Comprar
        </button>
      </div>
    </div>
  `;
}

// Render All Homepage Vitrines
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function scrollCarousel(containerId, direction) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Dynamically calculate width of one card + gap (28px)
  const firstCard = container.querySelector('.product-card');
  const scrollAmount = firstCard ? (firstCard.offsetWidth + 28) * direction : 308 * direction;

  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

window.scrollCarousel = scrollCarousel;

// Turns a horizontally-scrolling product row into a seamless infinite loop:
// the real cards are tripled (a copy before + the real set + a copy after),
// the viewport starts on the real (middle) copy, and once a scroll settles
// inside either clone copy we silently jump back into the equivalent spot in
// the real copy — so the carousel appears to cycle forever in both directions.
function setupInfiniteCarousel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const originalCards = Array.from(container.children).filter(el => !el.classList.contains('carousel-clone'));
  if (originalCards.length === 0) return;

  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('carousel-clone');
    container.insertBefore(clone, container.firstChild);
  });
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('carousel-clone');
    container.appendChild(clone);
  });

  silentScrollTo(container, container.scrollWidth / 3);

  if (!container.dataset.infiniteScrollBound) {
    container.dataset.infiniteScrollBound = 'true';
    let settleTimer = null;
    container.addEventListener('scroll', () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const span = container.scrollWidth / 3;
        if (span <= 0) return;
        if (container.scrollLeft < span - 2) {
          silentScrollTo(container, container.scrollLeft + span);
        } else if (container.scrollLeft > span * 2 + 2) {
          silentScrollTo(container, container.scrollLeft - span);
        }
      }, 120);
    });
  }
}

// scroll-snap-type fights an instant scroll (it can snap back to the nearest
// snap point), so the snap behavior is switched off for the instant we
// reposition and restored right after.
function silentScrollTo(container, left) {
  const prevSnap = container.style.scrollSnapType;
  container.style.scrollSnapType = 'none';
  container.scrollTo({ left, behavior: 'instant' });
  requestAnimationFrame(() => {
    container.style.scrollSnapType = prevSnap || '';
  });
}

window.setupInfiniteCarousel = setupInfiniteCarousel;

function renderHomepageVitrines() {
  const data = window.PRODUCTS_DATA;

  // 1. TOP 5 (Keep static / sorted by rank)
  const top5Grid = document.getElementById('top5-products-grid');
  if (top5Grid) {
    const top5List = data.filter(p => p.top5Rank && p.top5Rank >= 1 && p.top5Rank <= 5).sort((a, b) => a.top5Rank - b.top5Rank);
    top5Grid.innerHTML = top5List.length > 0 ? top5List.map(p => createProductCardHTML(p, true)).join('') : '<div style="grid-column:1/-1; text-align:center;">Nenhum produto em destaque.</div>';
  }

  // 2. Perfumes Árabes (Shuffled, All items)
  const arabesGrid = document.getElementById('arabes-products-grid');
  if (arabesGrid) {
    const arabesList = shuffleArray(data.filter(p => p.categorySlug === 'perfumes-arabes'));
    arabesGrid.innerHTML = arabesList.length > 0 ? arabesList.map(p => createProductCardHTML(p, false)).join('') : '<div style="grid-column:1/-1; text-align:center;">Sem produtos nesta categoria.</div>';
    if (arabesList.length > 0) setupInfiniteCarousel('arabes-products-grid');
  }

  // 3. Perfumes Importados (Shuffled, All items)
  const impGrid = document.getElementById('importados-products-grid');
  if (impGrid) {
    const impList = shuffleArray(data.filter(p => p.categorySlug === 'perfumes-importados'));
    impGrid.innerHTML = impList.length > 0 ? impList.map(p => createProductCardHTML(p, false)).join('') : '<div style="grid-column:1/-1; text-align:center;">Sem produtos nesta categoria.</div>';
    if (impList.length > 0) setupInfiniteCarousel('importados-products-grid');
  }

  // 4. Emagrecedores (Shuffled, All items)
  const emagGrid = document.getElementById('emagrecedores-products-grid');
  if (emagGrid) {
    const emagList = shuffleArray(data.filter(p => p.categorySlug === 'emagrecedores'));
    emagGrid.innerHTML = emagList.length > 0 ? emagList.map(p => createProductCardHTML(p, false)).join('') : '<div style="grid-column:1/-1; text-align:center;">Sem produtos nesta categoria.</div>';
    if (emagList.length > 0) setupInfiniteCarousel('emagrecedores-products-grid');
  }

  // 5. Exclusivos (Shuffled, All items)
  const excGrid = document.getElementById('exclusivos-products-grid');
  if (excGrid) {
    const excList = shuffleArray(data.filter(p => p.categorySlug === 'exclusivos'));
    excGrid.innerHTML = excList.length > 0 ? excList.map(p => createProductCardHTML(p, false)).join('') : '<div style="grid-column:1/-1; text-align:center;">Sem produtos nesta categoria.</div>';
    if (excList.length > 0) setupInfiniteCarousel('exclusivos-products-grid');
  }
}

window.renderHomepageVitrines = renderHomepageVitrines;
window.createProductCardHTML = createProductCardHTML;
window.setupInfiniteCarousel = setupInfiniteCarousel;

  // Global Site Initialization
  document.addEventListener('DOMContentLoaded', async () => {
    window.PRODUCTS_DATA = await fetchCatalogData();
    
    initSearchAutocomplete();
    initCookieBanner();
    initStickyHeader();
    if (typeof renderHomepageVitrines === 'function') {
      renderHomepageVitrines();
    }
    initHashRouter();
  });

function initHashRouter() {
  const hash = window.location.hash || '#home';
  if (hash.startsWith('#category')) {
    const params = new URLSearchParams(hash.split('?')[1] || '');
    navigateTo('category', { cat: params.get('cat') || 'perfumes-arabes' });
  } else if (hash.startsWith('#product')) {
    const params = new URLSearchParams(hash.split('?')[1] || '');
    navigateTo('product', { id: params.get('id') || '1807' });
  } else if (hash.startsWith('#about')) {
    navigateTo('about');
  } else if (hash.startsWith('#admin')) {
    navigateTo('admin');
  } else {
    navigateTo('home');
  }
}

function initSearchAutocomplete() {
  const searchInput = document.getElementById('site-search-input');
  const resultsContainer = document.getElementById('search-results-dropdown');
  if (!searchInput || !resultsContainer) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      resultsContainer.classList.remove('active');
      return;
    }

    const matches = window.PRODUCTS_DATA.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 16px; font-size: 0.85rem; color: var(--color-text-muted); text-align: center;">
          Nenhum produto encontrado para "${query}"
        </div>
      `;
    } else {
      let html = '';
      matches.slice(0, 5).forEach(p => {
        const pixPrice = p.price * (1 - p.pixDiscount / 100);
        html += `
          <div class="search-result-item" onclick="window.navigateTo('product', {id: '${p.id}'}); document.getElementById('search-results-dropdown').classList.remove('active');">
            <img src="${p.image}" alt="${p.title}" class="search-result-thumb">
            <div class="search-result-info">
              <div class="search-result-title">${p.title}</div>
              <div class="search-result-price">R$ ${pixPrice.toFixed(2).replace('.', ',')} <span style="font-size:0.7rem; color:var(--color-green-pix); font-weight:normal;">no PIX (-${p.pixDiscount}%)</span></div>
            </div>
          </div>
        `;
      });
      resultsContainer.innerHTML = html;
    }

    resultsContainer.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      resultsContainer.classList.remove('active');
    }
  });
}

function initCookieBanner() {
  const accepted = localStorage.getItem('arome_cookies_accepted');
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  if (accepted) {
    banner.style.display = 'none';
  } else {
    banner.style.display = 'flex';
  }

  const btnAccept = document.getElementById('btn-accept-cookies');
  if (btnAccept) {
    btnAccept.addEventListener('click', () => {
      localStorage.setItem('arome_cookies_accepted', 'true');
      banner.style.display = 'none';
    });
  }
}

function openPrivacyModal(tabName = 'security') {
  const modal = document.getElementById('privacy-security-modal');
  if (modal) {
    modal.classList.add('active');
    const tabBtn = document.querySelector(`.privacy-tab-btn[onclick*="${tabName}"]`);
    switchPrivacyTab(tabName, tabBtn);
  }
}

function closePrivacyModal() {
  const modal = document.getElementById('privacy-security-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function switchPrivacyTab(tabName, btnEl) {
  document.querySelectorAll('.ptab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.privacy-tab-btn').forEach(el => el.classList.remove('active'));
  
  const target = document.getElementById(`ptab-${tabName}`);
  if (target) target.style.display = 'block';
  if (btnEl) btnEl.classList.add('active');
}

window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.switchPrivacyTab = switchPrivacyTab;

function initStickyHeader() {
  const header = document.querySelector('header.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}
