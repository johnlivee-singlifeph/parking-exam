import readline from 'readline';
import { ENTRY_POINTS, Parking } from './parking';
const parking = new Parking();

console.log ( "JL Parking system created..." );
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



let prompt = 'Select action [ p - park, u - unpark, m - map, r - reset, h - history, x - exit ]:'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt
})

rl.prompt()


rl.on('line', (line) => {
  switch (line.trim()) {
    case 'x':
      rl.close()
      break
    case 'p':

      rl.question('Vehicle size [ 0-S, 1-M, 2-L ]: ',  (vehicle_size) => {
          rl.question(`Entrance Point [ 0-A, 1-B, 2-C ] `, (entry_point) => {
              parking.park(Number(vehicle_size), Number(entry_point))
              parking.drawMap();
              rl.prompt()
          })
      })

      break

    case 'r':
      parking.reset();
      parking.drawMap();
      break
    case 'm':
      parking.drawMap()
      break

    case 'h':
      parking.history();
      break;
    default:
      break;
  }
  rl.prompt();

}).on('close', () => {

  console.log('Have a great day!');
  process.exit(0);

});

rl.on("close", function () {
  console.log("\nThank you! We are pleased to serve you.")
  process.exit(0)
})