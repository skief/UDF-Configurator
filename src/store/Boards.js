
import Template from "./Template.js";

export default {
    getBoards: () => [
        {
            name: "uno",
            hasPullUp: true,
            hasPullDown: false,
            supportsDeej: true,
            supportsMidi: false,
            pins: ["A0", "A1", "A2", "A3", "A4", "A5", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
            analogPins: ["A0", "A1", "A2", "A3", "A4", "A5"],
            pwmPins: ["3", "5", "6", "9", "10", "11"]
        },
        {
            name: "leonardo",
            hasPullUp: true,
            hasPullDown: false,
            supportsDeej: true,
            supportsMidi: true,
            pins: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
            analogPins: ["A0", "A1", "A2", "A3", "A4", "A5"],
            pwmPins: ["3", "5", "6", "9", "10", "11", "13"]
        },
        {
            name: "promicro",
            hasPullUp: true,
            hasPullDown: false,
            supportsDeej: true,
            supportsMidi: true,
            pins: ["A0", "A1", "A2", "A3", "A6", "A7", "A8", "A9", "A10", "2", "3", "4", "5", "6", "7", "8", "9",
                "10", "14", "15", "16", "18", "19", "20", "21"],
            analogPins: ["A0", "A1", "A2", "A3", "A6", "A7", "A8", "A9", "A10"],
            pwmPins: ["3", "5", "6", "9", "10"]
        },
        {
            name: "stm32f103",
            hasPullUp: true,
            hasPullDown: true,
            supportsDeej: true,
            supportsMidi: true,
            pins: ["PA0", "PA1", "PA2", "PA3", "PA4", "PA5", "PA6", "PA7", "PA8", "PA9", "PA10", "PA11", "PA12", "PA15",
                "PB0", "PB1", "PB3", "PB4", "PB5", "PB6", "PB7", "PB8", "PB9", "PB10", "PB11", "PB12", "PB13", "PB14",
                "PB15"],
            analogPins: ["PA0", "PA1", "PA2", "PA3", "PA4", "PA5", "PA6", "PA7", "PB0", "PB1"],
            // Todo not sure if the T1Cx pins work -> probably not
            pwmPins: ["PA0", "PA1", "PA2", "PA3", "PA6", "PA7", "PA8", "PA9", "PA10", "PA11", "PB0", "PB1", "PB3",
                "PB4", "PB5", "PB6", "PB7", "PB8", "PB9"]
        }
    ],

    getBoard(boardType){
        const boards = this.getBoards();
        for (let i = 0; i < boards.length; i++){
            if (boards[i].name === boardType){
                return boards[i];
            }
        }
        throw "Invalid Board";
    }
}
