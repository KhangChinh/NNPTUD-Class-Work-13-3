let categoriesData = [
    {
        "id": 7,
        "name": "Clothes",
        "slug": "clothes",
        "image": "https://i.imgur.com/QkIa5tT.jpeg",
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    },
    {
        "id": 8,
        "name": "Electronics",
        "slug": "electronics",
        "image": "https://i.imgur.com/ZANVnHE.jpeg",
        "creationAt": "2026-02-05T16:51:35.000Z",
        "updatedAt": "2026-02-05T16:51:35.000Z",
        "isDeleted": false
    },
    {
        "id": 9,
        "name": "Furniture",
        "slug": "furniture",
        "image": "https://i.imgur.com/Qphac99.jpeg",
        "creationAt": "2026-02-05T16:51:36.000Z",
        "updatedAt": "2026-02-05T16:51:36.000Z",
        "isDeleted": false
    },
    {
        "id": 10,
        "name": "Shoes",
        "slug": "shoes",
        "image": "https://i.imgur.com/qNOjJje.jpeg",
        "creationAt": "2026-02-05T16:51:36.000Z",
        "updatedAt": "2026-02-05T16:51:36.000Z",
        "isDeleted": false
    },
    {
        "id": 11,
        "name": "Miscellaneous",
        "slug": "miscellaneous",
        "image": "https://i.imgur.com/BG8J0Fj.jpg",
        "creationAt": "2026-02-05T16:51:37.000Z",
        "updatedAt": "2026-02-05T16:51:37.000Z",
        "isDeleted": false
    },
    {
        "id": 13,
        "name": "gargantilla",
        "slug": "gargantilla",
        "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/gargantilla.jpg?alt=media&token=6bbf8234-5112-4ca8-b130-5e49ed1f3140",
        "creationAt": "2026-02-05T21:09:36.000Z",
        "updatedAt": "2026-02-05T21:09:36.000Z",
        "isDeleted": false
    },
    {
        "id": 15,
        "name": "category_B",
        "slug": "category-b",
        "image": "https://pravatar.cc/",
        "creationAt": "2026-02-05T22:04:27.000Z",
        "updatedAt": "2026-02-05T22:04:27.000Z",
        "isDeleted": false
    },
    {
        "id": 16,
        "name": "string",
        "slug": "string",
        "image": "https://pravatar.cc/",
        "creationAt": "2026-02-05T22:04:28.000Z",
        "updatedAt": "2026-02-05T22:04:28.000Z",
        "isDeleted": false
    },
    {
        "id": 17,
        "name": "Anillos",
        "slug": "anillos",
        "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/Anillos.jpg?alt=media&token=b7de8064-d4eb-4680-a4e2-ad917838c6c8",
        "creationAt": "2026-02-06T02:40:20.000Z",
        "updatedAt": "2026-02-06T02:40:20.000Z",
        "isDeleted": false
    },
    {
        "id": 18,
        "name": "Testing Category",
        "slug": "testing-category",
        "image": "https://placeimg.com/640/480/any",
        "creationAt": "2026-02-06T06:04:54.000Z",
        "updatedAt": "2026-02-06T06:04:54.000Z",
        "isDeleted": false
    }
];

let productsData = [
    {
        "id": 1,
        "title": "Laptop",
        "slug": "laptop",
        "price": 1200,
        "description": "High performance laptop",
        "category": { "id": 8, "name": "Electronics" },
        "images": ["https://i.imgur.com/laptop.jpg"],
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    },
    {
        "id": 2,
        "title": "T-Shirt",
        "slug": "t-shirt",
        "price": 25,
        "description": "Cotton T-shirt",
        "category": { "id": 7, "name": "Clothes" },
        "images": ["https://i.imgur.com/tshirt.jpg"],
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    },
    {
        "id": 3,
        "title": "Sofa",
        "slug": "sofa",
        "price": 800,
        "description": "Comfortable sofa",
        "category": { "id": 9, "name": "Furniture" },
        "images": ["https://i.imgur.com/sofa.jpg"],
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    },
    {
        "id": 4,
        "title": "Sneakers",
        "slug": "sneakers",
        "price": 120,
        "description": "Running sneakers",
        "category": { "id": 10, "name": "Shoes" },
        "images": ["https://i.imgur.com/sneakers.jpg"],
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    },
    {
        "id": 5,
        "title": "Ring",
        "slug": "ring",
        "price": 200,
        "description": "Gold ring",
        "category": { "id": 17, "name": "Anillos" },
        "images": ["https://i.imgur.com/ring.jpg"],
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    },
    {
        "id": 6,
        "title": "Smartphone",
        "slug": "smartphone",
        "price": 800,
        "description": "Latest smartphone",
        "category": { "id": 8, "name": "Electronics" },
        "images": ["https://i.imgur.com/phone.jpg"],
        "creationAt": "2026-02-05T16:51:34.000Z",
        "updatedAt": "2026-02-05T16:51:34.000Z",
        "isDeleted": false
    }
];

let rolesData = [
    {
        "id": 1,
        "name": "Admin",
        "description": "Administrator role",
        "isDeleted": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "id": 2,
        "name": "User",
        "description": "Standard user role",
        "isDeleted": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
];

let userData = [
    {
        "id": 1,
        "username": "admin",
        "password": "password123",
        "email": "admin@example.com",
        "fullName": "System Admin",
        "avatarUrl": "https://i.sstatic.net/l60Hf.png",
        "status": true,
        "role": 1,
        "loginCount": 0,
        "isDeleted": false,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
];

module.exports = {
    data: productsData,
    categories: categoriesData,
    roles: rolesData,
    users: userData
}
