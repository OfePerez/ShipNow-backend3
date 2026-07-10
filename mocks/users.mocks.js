const { USER_ROLES}= require('../src/constants');

const mockUsers= [
    {
        first_name: 'Ana',
        last_name: 'Gomez',
        email: 'ana.gomez@shipnow.com',
        role: USER_ROLES.USER,
    },
    {
        first_name: 'Luis',
        last_name: 'Perez',
        email: 'luis.perez@shipnow.com',
        role: USER_ROLES.USER,
    },
    {
        first_name: 'Marta',
        last_name: 'Lopez',
        email: 'marta.lopez@shipnow.com',
        role: USER_ROLES.ADMIN,
    },
    {
        first_name: 'Carlos',
        last_name: 'Ramirez',
        email: 'carlos.ramirez@shipnow.com',
        role: USER_ROLES.COURIER,
    },
    {
        first_name: 'Sofía',
        last_name: 'Fernandez',
        email: 'sofia.fernandez@shipnow.com',
        role: USER_ROLES.COURIER,
    },
]

module.exports= mockUsers;