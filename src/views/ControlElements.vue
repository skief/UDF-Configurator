<template>
  <b-container>
    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">Control Elements</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addControlElement()">+</b-button>
          <b-button size="sm" variant="danger" @click="removeControlElement(-1)">-</b-button>
        </b-button-group>
      </template>

      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Input</b-th>
          <b-th>Mute</b-th>
          <b-th>Outputs</b-th>
          <b-th></b-th>
        </b-thead>

        <b-tbody>
          <b-tr v-for="(controlElement, index) in controlElements" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getAllInputs()" :value="controlElement.input" size="sm"
                        @change="updateControlElementInput({id: index, input: $event})"></b-select>
            </b-td>
            <b-td>
              <b-select :options="getAllMutes()" :value="controlElement.mute" size="sm"
                        @change="updateControlElementMute({id: index, mute: $event})"></b-select>
            </b-td>
            <b-td>
              <b-table-simple striped hover class="mb-0">
                <b-thead>
                  <b-th>#</b-th>
                  <b-th>Output</b-th>
                  <b-th>
                    <b-button-group class="float-right">
                      <b-button size="sm" variant="success" @click="addControlElementOutput(index)">+</b-button>
                      <b-button size="sm" variant="danger" @click="removeControlElementOutput({id: index, outId: -1})">-</b-button>
                    </b-button-group>
                  </b-th>
                </b-thead>

                <b-tbody>
                  <b-tr v-for="(out, outId) in controlElement.outputs" :key="outId">
                    <b-th>{{ outId }}</b-th>
                    <b-th>
                      <b-select :options="getAllOutputs()" :value="out" size="sm"
                                @change="updateControlElementOutput({id: index, outId: outId, newOut: $event})"></b-select>
                    </b-th>
                    <b-th><b-button-group class="float-right">
                      <b-button size="sm" variant="danger" @click="removeControlElementOutput({id: index, outId: outId})">-</b-button>
                    </b-button-group></b-th>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeControlElement(index)">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>
  </b-container>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {mapMultiRowFields} from "vuex-map-fields";

export default {
  components: {

  },
  computed: {
    ...mapState(["template"]),
    ...mapMultiRowFields(["template.controlElements"]),


  },
  methods: {
    ...mapMutations([
        "addControlElement",
        "removeControlElement",
        "updateControlElementInput",
        "updateControlElementMute",
        "addControlElementOutput",
        "removeControlElementOutput",
        "updateControlElementOutput"
    ]),

    getAllInputs(){
      let inputs = [];

      for (let potentiometer of this.template.potentiometers){
        inputs.push({value: potentiometer, text: "Potentiometer @ " + potentiometer.pin});
      }
      for (let sw of this.template.switches){
        inputs.push({value: sw, text: "Switch @ " + sw.pin});
      }
      for (let encoder of this.template.encoders){
        inputs.push({value: encoder, text: "Encoder @ (" + encoder.pin[0] + "," + encoder.pin[1] + ")"});
      }

      return inputs;
    },

    getAllMutes(){
      let mutes = [];

      mutes.push({value: null, text: "None"});

      for (let sw of this.template.switches){
        mutes.push({value: sw, text: "Switch @ " + sw.pin});
      }

      return mutes;
    },

    getAllOutputs(){
      let outputs = [];
      outputs.push({value: null, text: "None"});

      for (let led of this.template.leds){
        outputs.push({value: led, text: "Led @ " + led.pin});
      }
      for (let pwm of this.template.pwmLeds){
        outputs.push({value: pwm, text: "PWM Led @ " + pwm.pin});
      }
      for (let rgb of this.template.rgbLeds){
        outputs.push({value: rgb, text: "RGB Led @ (" + rgb.pin[0] + "," + rgb.pin[1] + "," + rgb.pin[2] + ")"});
      }

      return outputs;
    }
  }
}
</script>

<style scoped>

</style>