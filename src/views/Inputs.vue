<template>
  <b-container>
    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">Potentiometers</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addInput('potentiometer')">+</b-button>
          <b-button size="sm" variant="danger" @click="removeInput({id: -1, type: 'potentiometer'})">-</b-button>
        </b-button-group>
      </template>
      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Pin</b-th>
          <b-th>Filter</b-th>
          <b-th>Filter Parameter</b-th>
          <b-th></b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(input, index) in potentiometers" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getAnalogPins()" :value="input.pin" size="sm"
                        @change="updateInputPin({id: index, type: 'potentiometer', newPin: $event, pinNumber: 0})"></b-select>
            </b-td>
            <b-td>
              <b-select :value="input.denoise" :options="getDenoise('potentiometer')" size="sm"
                        @change="updateInputDenoise({id: index, type: 'potentiometer', denoise: $event})"></b-select>
            </b-td>
            <b-td>
              <b-input-group v-if="input.denoise === 'Low Pass'" append="Hz" size="sm">
                <b-form-input :value="input.denoiseParam" size="sm"
                              @change="updateInputDenoiseParam({id: index, type: 'potentiometer', denoiseParam: $event})"
                              type="number" step="any" min="0" required></b-form-input>
              </b-input-group>
              <b-form-input v-if="input.denoise === 'Averaging'" :value="input.denoiseParam" size="sm"
                            @change="updateInputDenoiseParam({id: index, type: 'potentiometer', denoiseParam: $event})"
                            type="number" step="any" min="0" required></b-form-input>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeInput({id: index, type: 'potentiometer'})">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>

    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">Switches</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addInput('switch')">+</b-button>
          <b-button size="sm" variant="danger" @click="removeInput({id: -1, type: 'switch'})">-</b-button>
        </b-button-group>
      </template>
      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Pin</b-th>
          <b-th>Type</b-th>
          <b-th>Filter</b-th>
          <b-th>Filter Parameter</b-th>
          <b-th></b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(input, index) in switches" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getPins()" :value="input.pin" size="sm"
                        @change="updateInputPin({id: index, type: 'switch', newPin: $event, pinNumber: 0})"></b-select>
            </b-td>
            <b-td></b-td>
            <b-td>
              <b-select :value="input.denoise" :options="getDenoise('switch')" size="sm"
                        @change="updateInputDenoise({id: index, type: 'switch', denoise: $event})"></b-select>
            </b-td>
            <b-td>
              <b-form-input v-if="input.denoise === 'Debounce'" :value="input.denoiseParam" size="sm"
                            @change="updateInputDenoiseParam({id: index, type: 'switch', denoiseParam: $event})"
                            type="number" step="any" min="0" required></b-form-input>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeInput({id: index, type: 'switch'})">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>

    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">Encoders</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addInput('encoder')">+</b-button>
          <b-button size="sm" variant="danger" @click="removeInput({id: -1, type: 'encoder'})">-</b-button>
        </b-button-group>
      </template>
      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Pin 1</b-th>
          <b-th>Pin 2</b-th>
          <b-th></b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(input, index) in encoders" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getPins()" :value="input.pin[0]" size="sm"
                        @change="updateInputPin({id: index, type: 'encoder', newPin: $event, pinNumber: 0})"></b-select>
            </b-td>
            <b-td>
              <b-select :options="getPins()" :value="input.pin[1]" size="sm"
                        @change="updateInputPin({id: index, type: 'encoder', newPin: $event, pinNumber: 1})"></b-select>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeInput({id: index, type: 'encoder'})">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>
    <!--<b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">Inputs</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addInput()">+</b-button>
          <b-button size="sm" variant="danger" @click="removeInput(-1)">-</b-button>
        </b-button-group>
      </template>
      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Type</b-th>
          <b-th>Pin</b-th>
          <b-th>Filter</b-th>
          <b-th>Filter Parameters</b-th>
          <b-th></b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(input, index) in inputs" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select v-model="input.type" size="sm" :options="getInputs()"
                        @change="changeInputType({id: index, newType: $event})"></b-select>
            </b-td>
            <b-td>
              <b-select v-if="input.type==='Potentiometer'" :value="template.inputs[index].pin" :options="getAnalogPins()"
                        @change="updateInputPin({id: index, newPin: $event})" size="sm"></b-select>
              <b-select v-if="input.type==='Switch' || input.type==='Encoder'" :options="getPins()"
                        :value="template.inputs[index].pin" @change="updateInputPin({id: index, newPin: $event})" size="sm"></b-select>
              <b-select v-if="input.type==='Encoder'" :options="getPins()"
                        :value="template.inputs[index].pin1" @change="updateInputPin1({id: index, newPin: $event})" size="sm"></b-select>
            </b-td>
            <b-td>
              <b-select v-if="input.type !== 'Encoder'" :value="template.inputs[index].denoise" :options="getDenoise(input.type)" size="sm"
                @change="updateInputDenoise({id: index, denoise: $event})"></b-select>
            </b-td>
            <b-td>
              <b-input-group v-if="input.denoise === 'Low Pass' && input.type !== 'Encoder'" append="Hz">
                <b-form-input :value="template.inputs[index].denoiseParam"
                              @change="updateInputDenoiseParam({id: index, denoiseParam: $event})"
                              type="number" step="any" min="0" required></b-form-input>
              </b-input-group>
              <b-input-group v-if="input.denoise === 'Debounce' && input.type !== 'Encoder'" append="ms">
                <b-form-input :value="template.inputs[index].denoiseParam"
                              @change="updateInputDenoiseParam({id: index, denoiseParam: $event})"
                              type="number" step="any" min="0" required></b-form-input>
              </b-input-group>
              <b-form-input v-if="input.denoise !== 'Low Pass' && input.denoise !== 'Debounce' && input.denoise !== 'None' && input.type !== 'Encoder'"
                            :value="template.inputs[index].denoiseParam"
                            @change="updateInputDenoiseParam({id: index, denoiseParam: $event})"
                            type="number" step="any" min="0" required></b-form-input>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeInput(index)">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

    </b-card> -->
  </b-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {mapMultiRowFields} from "vuex-map-fields";

export default {
  components: {

  },
  computed: {
    ...mapState(['template']),
    ...mapGetters([]),
    ...mapMultiRowFields([
        'template.potentiometers',
        'template.switches',
        'template.encoders'
    ])
  },
  methods: {
    ...mapMutations([
        "addInput",
        "removeInput",
        "updateInputPin",
        "updateInputDenoise",
        "updateInputDenoiseParam"
    ]),

    getDenoise(type){
      switch (type){
        case "potentiometer":
          return ["Low Pass", "Averaging", "None"];
        case "switch":
          return ["Debounce", "None"]
        case "encoder":
          return ["None"];
      }
    },

    getSwitchTypes(){
      return ["Momentary", "Latching"];
    },

    getPins(){
      return this.template.board.pins;
    },

    getAnalogPins(){
      return this.template.board.analogPins;
    }
  }
}
</script>

<style scoped>

</style>