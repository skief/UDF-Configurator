<template>
  <b-container>
    <b-card title="General">
      <b-form-row>
        <b-col>
          <b-form-group label="Board">
            <b-select size="sm" @change="setBoard($event)" :value="template.board.name">
              <option value="uno">Arduino Uno</option>
              <option value="promicro">Pro Micro</option>
              <option value="leonardo">Arduino Leonardo</option>
              <option value="stm32f103">stm32f103</option>
            </b-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Measure Frequency">
            <b-input-group append="Hz">
              <b-form-input @change="setMeasureFreq($event)" :value="template.updateFreq" type="number" step="any" min="1" required></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-card>

    <b-card title="Protocol">
      <b-tabs v-model="protocolIndex" card pills>
        <b-tab title="Deej" :disabled="deejDisabled">
          <b-form-row>
            <b-col>
              <b-form-group label="Baudrate">
                <b-select @change="setDeejBaud($event)" :value="template.deej.baud">
                  <option value="300">300</option>
                  <option value="600">600</option>
                  <option value="1200">1200</option>
                  <option value="2400">2400</option>
                  <option value="4800">4800</option>
                  <option value="9600">9600</option>
                  <option value="14400">14400</option>
                  <option value="19200">19200</option>
                  <option value="28800">28800</option>
                  <option value="38400">38400</option>
                  <option value="56000">56000</option>
                  <option value="57600">57600</option>
                  <option value="115200">115200</option>
                  <option value="128000">128000</option>
                  <option value="256000">256000</option>
                </b-select>

              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Publish Frequency">
                <b-input-group append="Hz">
                  <b-form-input @change="setDeejFreq($event)" :value="template.deej.publishFreq" type="number" step="any" min="1" required></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";
import { mapFields } from "vuex-map-fields";

const protocols = ["Deej", "MIDI"]

export default {
  components: {

  },
  computed: {
    ...mapState(['template']),
    ...mapFields({}),

    protocolIndex: {
      get() { return protocols.indexOf(this.template.protocol); },
      set(value) { this.setProtocol(protocols[value]); }
    },

    deejDisabled: {
      get() { return !this.template.board.supportsDeej; }
    },
    midiDisabled: {
      get() { return !this.template.board.supportsMidi; }
    }
  },
  methods: {
    ...mapMutations([
      "setBoard",
      "setMeasureFreq",
      "setProtocol",
      "setDeejBaud",
      "setDeejFreq",
      "setMidiMinChange"
    ])
  }
}
</script>

<style scoped>

</style>