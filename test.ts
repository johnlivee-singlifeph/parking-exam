import { FLAT_RATE, MAX_FLAT_HOURS, Parking } from './parking';
/**
* FLAT RATE: 40
* EXCEED: 20, 60, 100
* 24H = 5000

* LOCATION: S = 0, M = 1, L = 2
* SIZE: S = 0, M = 1, L = 2
*/
const parking = new Parking();
parking.createSlots();

test('SMALL CARS - SP FLAT RATE - ENTRY A', async () => {
    const vehicle = parking.park(0, 0);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(0);
});
test('SMALL CARS - SP EXCEED 1 HOUR - ENTRY A', async () => {
    const vehicle = parking.park(0, 0);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(60);
    expect(location).toBe(0);
});
test('SMALL CARS - SP EXCEED 24 + 1 HOURS - ENTRY A', async () => {
    const vehicle = parking.park(0, 0);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5020);
    expect(location).toBe(0);
});
test('SMALL CARS - MP FLAT RATE - ENTRY B', async () => {
    const vehicle = parking.park(0, 1);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(1);
});
test('SMALL CARS - MP EXCEED 1 HOUR - ENTRY B', async () => {
    const vehicle = parking.park(0, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
});
test('SMALL CARS - MP EXCEED 24 + 1 HOURS - ENTRY B', async () => {
    const vehicle = parking.park(0, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5060);
    expect(location).toBe(1);
});
test('SMALL CARS - LP FLAT RATE - ENTRY C', async () => {
    const vehicle = parking.park(0, 2);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
});
test('SMALL CARS - LP EXCEED 1 HOUR - ENTRY C', async () => {
    const vehicle = parking.park(0, 2);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
});
test('SMALL CARS - LP EXCEED 24 + 1 HOURS - ENTRY C', async () => {
    const vehicle = parking.park(0, 2);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
});


test('MEDIUM CARS - MP FLAT RATE - ENTRY A', async () => {
    const vehicle = parking.park(1, 0);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(1);
});
test('MEDIUM CARS - MP EXCEED 24 + 1 HOURS - ENTRY A', async () => {
    const vehicle = parking.park(1, 0);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5060);
    expect(location).toBe(1);
});
test('MEDIUM CARS - MP EXCEED 1 HOUR - ENTRY A', async () => {
    const vehicle = parking.park(1, 0);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
});
test('MEDIUM CARS - MP FLAT RATE - ENTRY B', async () => {
    const vehicle = parking.park(1, 1);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(1);
});
test('MEDIUM CARS - MP EXCEED 1 HOUR - ENTRY B', async () => {
    const vehicle = parking.park(1, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
});
test('MEDIUM CARS - MP EXCEED 24 + 1 HOURS - ENTRY B', async () => {
    const vehicle = parking.park(1, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5060);
    expect(location).toBe(1);
});
test('MEDIUM CARS - LP FLAT RATE - ENTRY C', async () => {
    const vehicle = parking.park(1, 2);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
});
test('MEDIUM CARS - LP EXCEED 1 HOUR - ENTRY C', async () => {
    const vehicle = parking.park(1, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
});
test('MEDIUM CARS - LP EXCEED 24 + 1 HOURS - ENTRY C', async () => {
    const vehicle = parking.park(1, 2);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
});


test('LARGE CARS - LP FLAT RATE - ENTRY A', async () => {
    const vehicle = parking.park(2, 0);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
});
test('LARGE CARS - LP EXCEED 1 HOUR - ENTRY A', async () => {
    const vehicle = parking.park(2, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
});
test('LARGE CARS - LP EXCEED 24 + 1 HOURS - ENTRY A', async () => {
    const vehicle = parking.park(2, 0);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
});
test('LARGE CARS - LP FLAT RATE - ENTRY B', async () => {
    const vehicle = parking.park(2, 1);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
});
test('LARGE CARS - LP EXCEED 1 HOUR - ENTRY B', async () => {
    const vehicle = parking.park(2, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
});
test('LARGE CARS - LP EXCEED 24 + 1 HOURS - ENTRY B', async () => {
    const vehicle = parking.park(2, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
});
test('LARGE CARS - LP FLAT RATE - ENTRY C', async () => {
    const vehicle = parking.park(2, 2);    
    parking.unpark(vehicle.options.id);
   
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
});
test('LARGE CARS - LP EXCEED 1 HOUR - ENTRY C', async () => {
    const vehicle = parking.park(2, 1);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - (MAX_FLAT_HOURS + 1) );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
});
test('LARGE CARS - LP EXCEED 24 + 1 HOURS - ENTRY C', async () => {
    const vehicle = parking.park(2, 2);    
    const date = new Date(vehicle.options.entry_date);
    date.setHours( date.getHours() - 24 - 1 );
    vehicle.options.entry_date = date;
    vehicle.compute();

    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
});
