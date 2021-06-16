import Boards from "./Boards.js";

export default {
    getDefaultTemplate() {
        return {
            board: Boards.getBoard('uno'),
            protocol: 'Deej',

            potentiometers: [],
            switches: [],
            encoders: [],

            leds: [],
            pwmLeds: [],
            rgbLeds: [],

            controlElements: [],

            deej: {baud: 9600, publishFreq: 100},
            midi: {minChange: 1},
            updateFreq: 1000
        }
    }
}