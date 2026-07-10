const {ORDER_STATUS, ORDER_PRIORITY}= require('../src/constants');

const mockOrders= [
    {
        customerName: 'Ana Gomez',
        address: 'Av. Corrientes 1234, CABA',
        weight: 2,
        cost: 20,
        status: ORDER_STATUS.PENDING,
        priority: ORDER_PRIORITY.NORMAL,
        items:[
            {
                name: 'Zapatillas urbanas',
                quantity: 1,
                price: 45000,
            },
        ],
    },
    {
        customerName: 'Luis Perez',
        address: 'Av. Santa Fe 2450, CABA',
        weight: 5,
        cost: 50,
        status: ORDER_STATUS.IN_TRANSIT,
        priority: ORDER_PRIORITY.HIGH,
        items:[
            {
                name: 'Campera impermeable',
                quantity: 1,
                price: 72000,
            },
            {
                name: 'Medias deportivas',
                quantity:2,
                price:6000,
            },
        ],
    },
    {
        customerName: 'Ana Gomez',
        address: 'Calle Mitre 875, Avellaneda',
        weight: 1,
        cost: 10,
        status: ORDER_STATUS.DELIVERED,
        priority: ORDER_PRIORITY.NORMAL,
        items:[
            {
                name: 'Libro de JavaScript',
                quantity: 1,
                price: 28000,
            },
        ],
    },
];

module.exports= mockOrders;