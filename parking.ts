import { constants } from "buffer";

interface ParkingSlots {
    [key: string]: ParkingSlotData[];
}

interface ParkingSlotData {
    id: number;
    type: number;
    type_description: string;
    distance: ParkingSlotDistance[];
    exceeding_hour_rate: number;
    vehicle?: Vehicle | undefined;
}

interface ParkingSlotDistance {
    x: number;
    y: number;
}


interface VehicleOptions {
    id: number;
    entry_point: number;
    entry_date: Date | string;
    vehicle_size: number;
    amount?: number;
}


/**
 * 0 = A
 * 1 = B
 * 2 = C
 */
export enum ENTRY_POINTS {
    A = 0,
    B = 1,
    C = 2,
}

/**
 * 0 = small
 * 1 = medium
 * 2 = large
 */
const TYPE_DESCRIPTION = ['S','M','L'];
class DEFAULT_SLOTS {
    id: number;
    type: number;
    type_description: string;
    distance: ParkingSlotDistance[] = [];
    exceeding_hour_rate: number = 60;

    constructor(type: number, counter: number) {
        this.id = counter;
        this.type = type;
        this.type_description = TYPE_DESCRIPTION[type];
    }
}

class Vehicle {
    options: VehicleOptions = {
        id: 0,
        vehicle_size: -1,
        amount: 0,
        entry_date: '',
        entry_point: 0,
    }
    constructor(options: any = {}) {
        this.options.id = Math.floor(Date.now() / 1000)
        this.options = Object.assign({}, this.options, options);
    }
}

export class Parking {
    private MAX_SLOTS_PER_ENTRY = 3;
    private RATE_24H = 5000;
    private FLAT_RATE = 40;
   
    /**
     * DEFAULT PARKING SLOTS PLACEHOLDER
     */
    private SLOTS: ParkingSlots = {
        'A': [],
        'B': [],
        'C': [],
    }


    createSlots() {
        /**
         * FIRST TYPE TO INIT WILL BE SMALL
         */
        let current_type = 0;
        let counter = 0;
        for (const key in this.SLOTS) {
            const current_slot = this.SLOTS[key];

            if (current_slot.length < this.MAX_SLOTS_PER_ENTRY) {
                for (let j = 1; j <= this.MAX_SLOTS_PER_ENTRY; j++) {
                    counter ++;
                    const slot = new DEFAULT_SLOTS(current_type, counter);
                    this.SLOTS[key].push(slot);
                }
            }

            current_type ++;
        }
        this.drawMap();
        this.registerPosition();
    }

    drawMap() {
        let strings: string[] = [];
        for (const key in this.SLOTS) {
            const current_slot = this.SLOTS[key];
            
            for (let i = 0; i < current_slot.length; i++) {
                const slot = current_slot[i];
                if (i === 0) {
strings.push(`
------
${slot.type_description}  ${slot.vehicle ? '🚗' : ''}  <${key}>`);
                }
                else {
strings.push(`
------
${slot.type_description}  ${slot.vehicle ? '🚗' : ''} `);
                }
            }
        }
strings.push(`
------`);

        console.log(strings.join(''));
    }

    registerPosition() {
        let current_count = 0;
        for (let current_key in this.SLOTS) {
            
            /**
             * SET DEFAULT ENTRY POINT DISTANCE
             */
            for (let i = 0; i < this.SLOTS[current_key].length; i++) {
                const isEntry = (i === 0);
                /**
                 * SET OTHER ENTRY POINT DISTANCE
                 */
                for (let j = 0; j < this.MAX_SLOTS_PER_ENTRY; j++) {
                    //A
                    // i j       y              cc
                    // 0 0 * 3 = 0              0 * 3 = 0
                    // 0 1 * 3 = 3              0 * 3 = 0
                    // 0 2 * 3 = 6              0 * 3 = 0

                    // 1 0 * 3 = -1      
                    // 1 1 * 3 = 3 - 1 = 2      0 * 3 = 0
                    // 1 2 * 3 = 6 - 1 = 5      0 * 3 = 0

                    // 2 0 * 3 = -2             0 * 3 = 0
                    // 2 1 * 3 = 3 -2 = 1       0 * 3 = 0
                    // 2 2 * 3 = 6 - 2 = 4      0 * 3 = 0

                    // (j * MAX_SLOT) - i = y   (current_count * MAX_LENGTH) - y

                    //B
                    //  0 0 * 3 = 0             1 * 3 = 3 - 0 = 3
                    //  0 1 * 3 = 3             1 * 3 = 3 - 3 = 0
                    //  0 2 * 3 = 6             1 * 3 = 3 - 6 = 3

                    //  1 0 * 3 = -1            1 * 3 = 3 -(-1) = 4
                    //  1 1 * 3 = 3 - 1 = 2     1 * 3 = 3 - 2 = 1
                    //  1 2 * 3 = 6 - 1 = 5     1 * 3 = 3 - 5 = 2

                    //  2 0 * 3 = -2            1 * 3 = 3 - (-2) = 5
                    //  2 1 * 3 = 3 - 2 = 1     1 * 3 = 3 - 1 = 2
                    //  2 2 * 3 = 6 - 2 = 4     1 * 3 = 3 - 4 = -1


                    //C
                    //  0 0 * 3 = 0             2 * 3 = 6 - 0 = 6
                    //  0 1 * 3 = 3             2 * 3 = 6 - 3 = 3
                    //  0 2 * 3 = 6             2 * 3 = 6 - 6 = 0

                    //  1 0 * 3 = -1            2 * 3 = 6 -(-1) = 7
                    //  1 1 * 3 = 3 - 1 = 2     2 * 3 = 6 - 2 = 4
                    //  1 2 * 3 = 6 - 1 = 5     2 * 3 = 6 - 5 = 1

                    //  2 0 * 3 = -2            2 * 3 = 6 - (-2) = 8
                    //  2 1 * 3 = 3 - 2 = 1     2 * 3 = 6 - 1 = 5
                    //  2 2 * 3 = 6 - 2 = 4     2 * 3 = 6 - 4 = 2

                    let computed = (current_count * this.MAX_SLOTS_PER_ENTRY) - ((j * this.MAX_SLOTS_PER_ENTRY) - i);
                    /** PREVENT NEGATIVE NUMBERS */
                    if (computed < 0) computed = computed * -1;
                    this.SLOTS[current_key][i].distance.push({
                        x: j,
                        y: /**ENTRY TRAP */
                            (current_count === j && isEntry 
                            ? 0 
                            : computed
                            ),
                    })
                }
            }
            
            current_count ++;
        }
    }

    park(vehicle_size: number, entry_point: ENTRY_POINTS): void {
        /**
         * CREATE VEHICLE
         */
        const vehicle = new Vehicle({
            vehicle_size,
            entry_point,
        });

        this.checkSlot(vehicle);
    }

    checkSlot(vehicle: Vehicle): void {
        /**
         * CONST FLATTEN SLOTS
         */
        const slot: any = Object.keys(this.SLOTS).map((key, index) => {
            return this.SLOTS[key];
        });
        const flattened = [].concat.apply([],slot);
       
        /**
         * FILTER
         * 1. Allowed vehicle size and not occupied
         * 2. Entry point
         * 
         * MAP
         * 1. Return only entry point distance (y)
         * 
         * SORT 
         * 1. Sort by parking type
         * 2. Sort by distance from entry point
         */
        const filtered_slots = flattened.filter((slot: ParkingSlotData) => {
            return !slot.vehicle && vehicle.options.vehicle_size  <= slot.type && slot.distance.filter((distance: ParkingSlotDistance) => distance.x === vehicle.options.entry_point).length;
        }).map((mapped: ParkingSlotData) => {
            mapped.distance = mapped.distance.filter((distance: ParkingSlotDistance) => distance.x === vehicle.options.entry_point);
            return mapped;
        }).sort((a, b) => {
            return a.type - b.type;
        }).sort((a,b) => {
            return a.distance[0].y -b.distance[0].y;
        });
        console.log(filtered_slots);
        
        const chosen_slot = filtered_slots.shift();
        if(chosen_slot) {
            chosen_slot.vehicle = vehicle;
            this.updateSlot(chosen_slot);
        }
        else console.error('No parking slot found');
    }

    updateSlot(chosen_slot: ParkingSlotData): void {
        for (let key in this.SLOTS) {
            const current_slot = this.SLOTS[key];
            const index = current_slot.findIndex((slot: ParkingSlotData) => slot.id === chosen_slot.id);
            if (index !== -1) this.SLOTS[key][index] = chosen_slot;
        }

        // this.drawMap();
    }
}


