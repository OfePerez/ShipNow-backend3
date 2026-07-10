const {DELIVERY_STATUS}= require('../src/constants');

const mocksDeliveries= [
    {
        status: DELIVERY_STATUS.ASSIGNED,
        assignedAt: new Date('2026-07-09')
    },
    {
        status: DELIVERY_STATUS.IN_TRANSIT,
        assignedAt: new Date('2026-07-08')
    },
    {
        status: DELIVERY_STATUS.DELIVERED,
        assignedAt: new Date('2026-07-07')
    },
];

module.exports= mocksDeliveries;