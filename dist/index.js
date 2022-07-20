"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rl = void 0;
const readline_1 = __importDefault(require("readline"));
const parking_1 = require("./parking");
const parking = new parking_1.Parking();
console.log("JL Parking system created...");
// console.log( `
// PARKING MAP\n
//                 A       B       C      
// ------
// S       <A>   (0,0)   (1,3)   (2,6)
// ------  
// S             (0,1)   (1,2)   (2,5)
// ------
// S             (0,2)   (1,1)   (2,4)
// ------
// M       <B>   (0,3)   (1,0)   (2,3)
// ------
// M             (0,4)   (1,1)   (2,2)
// ------
// M             (0,5)   (1,2)   (2,1)
// ------
// L       <C>   (0,6)   (1,3)   (2,0)
// ------
// L             (0,7)   (1,4)   (2,1)
// ------
// L             (0,8)   (1,5)   (2,2)
// ------
// `);
parking.createSlots();
// parking.park(0, ENTRY_POINTS.A);
let prompt = 'Select action [ p - park, u - unpark, m - map, r - reset, h - history, x - exit ]:';
exports.rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt
});
exports.rl.prompt();
exports.rl.on('line', (line) => {
    switch (line.trim()) {
        case 'x':
            exports.rl.close();
            break;
        case 'p':
            exports.rl.question('Vehicle size [ 0-S, 1-M, 2-L ]: ', (vehicle_size) => {
                exports.rl.question(`Entrance Point [ 0-A, 1-B, 2-C ] `, (entry_point) => {
                    parking.park(Number(vehicle_size), Number(entry_point));
                    parking.drawMap();
                    exports.rl.prompt();
                });
            });
            break;
        case 'u':
            exports.rl.question('Vehicle ID you want to unpark: ', (id) => {
                parking.unpark(Number(id));
            });
            break;
        case 'r':
            parking.reset();
            parking.drawMap();
            break;
        case 'm':
            parking.drawMap();
            break;
        case 'h':
            parking.history();
            break;
        default:
            break;
    }
    exports.rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});
exports.rl.on("close", function () {
    console.log("\nThank you! We are pleased to serve you.");
    process.exit(0);
});
