import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField} from "vuex-map-fields";

import Boards from "./Boards.js";
import Template from "./Template.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        template: Template.getDefaultTemplate()
    },
    getters: {
        getField
    },
    actions: {

    },
    mutations: {
        updateField,

        setBoard(state, board){
            state.template.board = Boards.getBoard(board);
            console.log(state.template.board.name);
        },

        setMeasureFreq(state, freq){
            state.template.updateFreq = freq;
            console.log(freq);
        },

        setProtocol(state, protocol){
            state.template.protocol = protocol;
            console.log(state.template.protocol);
        },

        setDeejBaud(state, baud){
            state.template.deej.baud = baud;
            console.log(baud);
        },

        setDeejFreq(state, freq){
            state.template.deej.publishFreq = freq;
            console.log(freq);
        },

        addInput(state, type){
            console.log("add input");
            if (type === "potentiometer"){
                state.template.potentiometers.push({pin: state.template.board.analogPins[0], denoise: "Low Pass", denoiseParam: 3.0})
            } else if (type === "switch"){
                state.template.switches.push({pin: state.template.board.pins[0], denoise: 'Debounce', denoiseParam: 20});
            } else if (type === "encoder"){
                state.template.encoders.push({pin: [state.template.board.pins[0], state.template.board.pins[1]]});
            }
        },

        removeInput(state, {id, type}){
            console.log("remove input", id);
            if (type === "potentiometer"){
                if (id === -1){
                    state.template.potentiometers.pop();
                } else {
                    state.template.potentiometers.splice(id, 1);
                }
            } else if (type === "switch"){
                if (id === -1){
                    state.template.switches.pop();
                } else {
                    state.template.switches.splice(id, 1);
                }
            } else if (type === "encoder"){
                if (id === -1){
                    state.template.encoders.pop();
                } else {
                    state.template.encoders.splice(id, 1);
                }
            }
        },

        updateInputPin(state, {id, type, newPin, pinNumber}){
            console.log("change input pin", newPin, id);
            if (type === "potentiometer"){
                state.template.potentiometers[id].pin = newPin;
            } else if (type === "switch"){
                state.template.switches[id].pin = newPin;
            } else if (type === "encoder"){
                state.template.encoders[id].pin[pinNumber] = newPin;
            }
        },

        updateInputDenoise(state, {id, type, denoise}){
            console.log(id, denoise);
            if (type === "potentiometer"){
                state.template.potentiometers[id].denoise = denoise;
                if (denoise === "Low Pass"){
                    state.template.potentiometers[id].denoiseParam = 3;
                } else if (denoise === "Averaging"){
                    state.template.potentiometers[id].denoiseParam = 10;
                }
            } else if (type === "switch"){
                state.template.switches[id].denoise = denoise;
                if (denoise === "Debounce"){
                    state.template.switches[id].denoiseParam = 20;
                }
            }
        },

        updateInputDenoiseParam(state, {id, type, denoiseParam}){
            console.log(id, denoiseParam);
            if (type === "potentiometer"){
                state.template.potentiometers[id].denoiseParam = denoiseParam;
            } else if (type === "switch"){
                state.template.switches[id].denoiseParam = denoiseParam;
            }
        },

        addOutput(state, type){
            console.log("add output");
            if (type === "led"){
                state.template.leds.push({pin: state.template.board.pins[0]});
            } else if (type === "pwm"){
                state.template.pwmLeds.push({pin: state.template.board.pwmPins[0]});
            } else if (type === "rgb"){
                state.template.rgbLeds.push({pin: [state.template.board.pwmPins[0], state.template.board.pwmPins[1],
                    state.template.board.pwmPins[2]]});
            }
        },

        removeOutput(state, {id, type}){
            console.log("remove output", id);
            if (type === "led"){
                if (id === -1){
                    state.template.leds.pop();
                } else {
                    state.template.leds.splice(id, 1);
                }
            } else if (type === "pwm"){
                if (id === -1){
                    state.template.pwmLeds.pop();
                } else {
                    state.template.pwmLeds.splice(id, 1);
                }
            } else if (type === "rgb"){
                if (id === -1){
                    state.template.rgbLeds.pop();
                } else {
                    state.template.rgbLeds.splice(id, 1);
                }
            }
        },

        updateOutputPin(state, {id, type, newPin, i}){
            if (type === "led"){
                state.template.leds[id].pin = newPin;
            } else if (type === "pwm"){
                state.template.pwmLeds[id].pin = newPin;
            } else if (type === "rgb"){
                state.template.rgbLeds[id].pin[i] = newPin;
            }
        },

        addControlElement(state){
            const allInputs = state.template.potentiometers.concat(state.template.switches.concat(state.template.encoders));
            state.template.controlElements.push({input: allInputs[0], mute: null, outputs: []});
        },

        removeControlElement(state, id){
            if (id === -1){
                state.template.controlElements.pop();
            } else {
                state.template.controlElements.splice(id, 1);
            }
        },

        updateControlElementInput(state, {id, input}){
            state.template.controlElements[id].input = input;
            console.log(input);
        },

        updateControlElementMute(state, {id, mute}){
            state.template.controlElements[id].mute = mute;
        },

        addControlElementOutput(state, id){
            state.template.controlElements[id].outputs.push(null);
        },

        removeControlElementOutput(state, {id, outId}){
            if (outId === -1){
                state.template.controlElements[id].outputs.pop();
            } else {
                state.template.controlElements[id].outputs.splice(outId, 1);
            }
        },

        updateControlElementOutput(state, {id, outId, newOut}){
            state.template.controlElements[id].outputs[outId] = newOut;
        }
    }
})
