"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parking_1 = require("./parking");
/**
* FLAT RATE: 40
* EXCEED: 20, 60, 100
* 24H = 5000

* LOCATION: S = 0, M = 1, L = 2
* SIZE: S = 0, M = 1, L = 2
*/
const parking = new parking_1.Parking();
parking.createSlots();
test('SMALL CARS - SP FLAT RATE - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 0);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(0);
}));
test('SMALL CARS - SP EXCEED 1 HOUR - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 0);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(60);
    expect(location).toBe(0);
}));
test('SMALL CARS - SP EXCEED 24 + 1 HOURS - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 0);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5020);
    expect(location).toBe(0);
}));
test('SMALL CARS - MP FLAT RATE - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 1);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(1);
}));
test('SMALL CARS - MP EXCEED 1 HOUR - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
}));
test('SMALL CARS - MP EXCEED 24 + 1 HOURS - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5060);
    expect(location).toBe(1);
}));
test('SMALL CARS - LP FLAT RATE - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 2);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
}));
test('SMALL CARS - LP EXCEED 1 HOUR - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 2);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
}));
test('SMALL CARS - LP EXCEED 24 + 1 HOURS - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(0, 2);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
}));
test('MEDIUM CARS - MP FLAT RATE - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 0);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - MP EXCEED 24 + 1 HOURS - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 0);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5060);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - MP EXCEED 1 HOUR - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 0);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - MP FLAT RATE - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 1);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - MP EXCEED 1 HOUR - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - MP EXCEED 24 + 1 HOURS - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5060);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - LP FLAT RATE - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 2);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
}));
test('MEDIUM CARS - LP EXCEED 1 HOUR - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(100);
    expect(location).toBe(1);
}));
test('MEDIUM CARS - LP EXCEED 24 + 1 HOURS - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(1, 2);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP FLAT RATE - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 0);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP EXCEED 1 HOUR - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP EXCEED 24 + 1 HOURS - ENTRY A', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 0);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP FLAT RATE - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 1);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP EXCEED 1 HOUR - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP EXCEED 24 + 1 HOURS - ENTRY B', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP FLAT RATE - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 2);
    parking.unpark(vehicle.options.id);
    vehicle.compute();
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(40);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP EXCEED 1 HOUR - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 1);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - (parking_1.MAX_FLAT_HOURS + 1));
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(140);
    expect(location).toBe(2);
}));
test('LARGE CARS - LP EXCEED 24 + 1 HOURS - ENTRY C', () => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = parking.park(2, 2);
    const date = new Date(vehicle.options.entry_date);
    date.setHours(date.getHours() - 24 - 1);
    vehicle.options.entry_date = date;
    vehicle.compute();
    parking.unpark(vehicle.options.id);
    const amount = vehicle.options.amount;
    const location = vehicle.location.type;
    expect(amount).toBe(5100);
    expect(location).toBe(2);
}));
