
export const RATE_24H = 5000;
export const FLAT_RATE = 40;
export const MAX_FLAT_HOURS = 3;
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
    flat_rate: number;
    rate_24h: number;
    max_flat_hours: number;
}

interface ParkingSlotDistance {
    x: number;
    y: number;
}


interface VehicleOptions {
    id: number;
    entry_point: number;
    entry_date: Date | string;
    exit_date?: Date | string;
    exit: boolean;
    vehicle_size: number;
    amount?: number;
    consumed_hours?: number;
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
const ENTRY_POINTS_DESCRIPTION = ['A','B','C'];

/**
 * 0 = small
 * 1 = medium
 * 2 = large
 */
const TYPE_DESCRIPTION = ['S','M','L'];
const SLOT_EXCEEDING_HOURS = [20, 60, 100];
const VEHICLE_DRAWING = ['🚗 ',  '🚙 ', '🚌 '];

class DEFAULT_SLOTS {
    id: number;
    type: number;
    type_description: string;
    distance: ParkingSlotDistance[] = [];
    exceeding_hour_rate: number;
    flat_rate: number = FLAT_RATE;
    rate_24h: number = RATE_24H;
    exit: boolean = false;
    max_flat_hours: number = MAX_FLAT_HOURS;

    constructor(type: number, counter: number) {
        this.id = counter;
        this.type = type;
        this.type_description = TYPE_DESCRIPTION[type];
        this.exceeding_hour_rate = SLOT_EXCEEDING_HOURS[type];
    }
}

class Vehicle {
    options: VehicleOptions = {
        id: 0,
        vehicle_size: -1,
        amount: 0,
        entry_date: '',
        exit_date: '',
        entry_point: 0,
        consumed_hours: 0,
        exit: false,
    }

    location: ParkingSlotData;

    constructor(options: any = {}) {
        this.options.id = Math.floor(Date.now() / 1000)
        this.options = Object.assign({}, this.options, options);
        this.options.entry_date = new Date();
        
        if (options.slot) this.location = options.slot;
    }

    compute() {
        if (this.location) {
            /**
             * ADD FLAT RATE
             */
            this.options.amount = this.location.flat_rate;

            const today = new Date().getTime();
            const entry_date = new Date(this.options.entry_date).getTime();
            console.log('test', this.options.entry_date)

            /**
             * COMPUTE ALL DIFF IN HOURS
             */
            const diff = Math.abs(entry_date - today) / 36e5;
            console.log('test1', diff);
            this.options.consumed_hours = Math.round(diff);

            /**
             * DETECT 24HOURS
             * amount = 5000 * detect_24hrs (2) = 10000;
             */
            let detect_24hours = this.options.consumed_hours / 24;
            if (detect_24hours >= 1) {
                detect_24hours = Math.trunc(detect_24hours);
                this.options.amount += this.location.rate_24h * detect_24hours;
                /**
                 * SUBTRACT THE FLAT RATE SINCE ALREADY EXCEEDED THE 24hours
                 */
                this.options.amount = this.options.amount - FLAT_RATE;
            } else detect_24hours = 0;

            /**
             * CHECK IF FLAT RATE HAS ALREADY PASSED
             * 49 > 3 = true
             */
            if (this.options.consumed_hours > this.location.max_flat_hours) {
                /**
                 * REMOVE 24hours and get exceeding hours
                 * 49.4 - 48 = 1.4
                 * 1.4 - 3 = -2.4
                 * 
                 * 
                 * 59.2 - 48 = 11.2
                 * 11.2 - 3 = 8.2
                 * 
                 * IF THERE IS NO 24HOURS
                 * THEN REMOVE the flat hour rate
                 */
                const exceeding_hours = Math.round(this.options.consumed_hours - (detect_24hours * 24) - (detect_24hours > 0 ? 0 : this.location.max_flat_hours));
                if (exceeding_hours > 0) this.options.amount += this.location.exceeding_hour_rate * exceeding_hours;
            }
            
        }
    }

    get() {
        return this.options;
    }
}

export class Parking {
    private MAX_SLOTS_PER_ENTRY = 3;
   
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
                let vehicle = '   ';
                if (slot.vehicle) {
                    vehicle = VEHICLE_DRAWING[slot.vehicle.options.vehicle_size];
                }

                if (i === 0) {
strings.push(`
------
${slot.type_description}  ${vehicle}  <${key}>`);
                }
                else {
strings.push(`
------
${slot.type_description}  ${vehicle} `);
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

    park(vehicle_size: number, entry_point: ENTRY_POINTS): Vehicle {
        /**
         * CREATE VEHICLE
         */
        const vehicle = new Vehicle({
            vehicle_size,
            entry_point,
        });

        this.checkSlot(vehicle);

        return vehicle;
    }

    unpark(vehicle_id: number): Vehicle | undefined {
        const flattenSlots = this.flattenSlots();
        const index = flattenSlots.findIndex((item: ParkingSlotData) => {
            return item.vehicle && item.vehicle.options.id === vehicle_id;
        })
        if (index !== -1) {
            const vehicle = flattenSlots[index].vehicle;
            if (vehicle) {
                vehicle.options.exit = true;
                vehicle.options.exit_date = new Date();
                console.log(' VEHICLE UNPARKED ');
                console.log(' VEHICLE CHARGED: ', 'P ' + vehicle.options.amount);
                this.updateSlot(vehicle.location);
                return vehicle;
            }
        }

        console.error('🚫 VEHICLE NOT FOUND 🚫');
    }

    flattenSlots(): ParkingSlotData[] {
        const slot: any = Object.keys(this.SLOTS).map((key, index) => {
            return this.SLOTS[key];
        });
       return [].concat.apply([],slot);
    }

    checkSlot(vehicle: Vehicle): void {
        /**
         * FLATTEN SLOTS
         */
        const flattened = this.flattenSlots();
       
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
            return !slot.vehicle && vehicle.options.vehicle_size  <= slot.type;
        })
        .map((mapped: ParkingSlotData) => {
            return mapped;
        })
        .sort((a, b) => {
            return b.type - a.type;
        })
        .sort((a, b) => {
            /**
             * TEMPORARY SOLUTION TO AVOID MUTATION USING map method
             */
            const a_index = a.distance.findIndex((distance: ParkingSlotDistance) => distance.x === vehicle.options.entry_point);
            const b_index = a.distance.findIndex((distance: ParkingSlotDistance) => distance.x === vehicle.options.entry_point);
            if (a_index !== -1 && b_index !== -1) return a.distance[a_index].y - b.distance[b_index].y;
            
            return -1;
        });
        // console.log('filtered', filtered_slots);
        
        const chosen_slot = filtered_slots.shift();
        // console.log('chosen_flot', chosen_slot);
        if(chosen_slot) {
            /**
             * REGISTER ASSIGNED SLOT TO VEHICLE
             */
            vehicle.location = chosen_slot;

            /**
             * REGISTER VEHIVLE TO ASSIGNED SLOT
             */
            chosen_slot.vehicle = vehicle;
            this.updateSlot(chosen_slot);
        }
        else console.error('🚫 FULL PARKING 🚫');
    }

    updateSlot(chosen_slot: ParkingSlotData): void {
        for (let key in this.SLOTS) {
            const current_slot = this.SLOTS[key];
            const index = current_slot.findIndex((slot: ParkingSlotData) => slot.id === chosen_slot.id);
            if (index !== -1) {
                if (chosen_slot.vehicle) {
                    chosen_slot.vehicle.compute();
                    if (!chosen_slot.vehicle.options.exit) {
                        this.SLOTS[key][index].vehicle = chosen_slot.vehicle;
                        return console.log(VEHICLE_DRAWING[chosen_slot.vehicle?.options.vehicle_size ?? 0], `ID: ${chosen_slot.vehicle?.options.id}`);
                    }
                    else this.SLOTS[key][index].vehicle = undefined;
                }
            }
        }

       
    }

    reset(): void {
        for (let key in this.SLOTS) {
            if (this.SLOTS[key].length) {
                for (let i = 0 ; i < this.SLOTS[key].length; i++) {
                    this.SLOTS[key][i].vehicle = undefined;
                }
            }
        }
    }

    history(): void {
        const flattened = this.flattenSlots();

        const filtered_slots = flattened.filter((slot: ParkingSlotData) => {
            return slot.vehicle;
        });

        const table_data: any = [];
        if (filtered_slots.length) {
            filtered_slots.forEach((item: ParkingSlotData) => {
                item.vehicle?.compute();
                table_data.push(
                    {
                        'ID': item.vehicle?.options.id,
                        'Type': TYPE_DESCRIPTION[item.vehicle?.options?.vehicle_size ?? 0],
                        'Entry Point': ENTRY_POINTS_DESCRIPTION[item.vehicle?.options.entry_point ?? 0],
                        'Location': item.vehicle?.location.id,
                        'Date': new Date(),
                        'Entry Point Date': item.vehicle?.options?.entry_date ?? '',
                        'Exit Date': item.vehicle?.options?.exit ? item.vehicle?.options?.entry_date ?? '' : '--',
                        'Consumed Hours': item.vehicle?.options.consumed_hours ?? 0,
                        'Amount': item.vehicle?.options.amount,
                    });
            })
        }
        console.table(table_data);
    }
}


