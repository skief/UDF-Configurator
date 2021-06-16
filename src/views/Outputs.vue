<template>
  <b-container>
    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">Leds</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addOutput('led')">+</b-button>
          <b-button size="sm" variant="danger" @click="removeOutput({id: -1, type: 'led'})">-</b-button>
        </b-button-group>
      </template>

      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Pin</b-th>
          <b-th></b-th>
        </b-thead>

        <b-tbody>
          <b-tr v-for="(output, index) in leds" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getPins()" :value="output.pin" size="sm"
                        @change="updateOutputPin({id: index, type: 'led', newPin: $event, i: 0})"></b-select>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeOutput({id: index, type: 'led'})">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

    </b-card>

    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">PWM-Leds</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addOutput('pwm')">+</b-button>
          <b-button size="sm" variant="danger" @click="removeOutput({id: -1, type: 'pwm'})">-</b-button>
        </b-button-group>
      </template>

      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>Pin</b-th>
          <b-th></b-th>
        </b-thead>

        <b-tbody>
          <b-tr v-for="(output, index) in pwmLeds" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getPwmPins()" :value="output.pin" size="sm"
                        @change="updateOutputPin({id: index, type: 'pwm', newPin: $event, i: 0})"></b-select>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeOutput({id: index, type: 'pwm'})">-</b-button>
              </b-button-group>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>

    <b-card no-body class="mt-3">
      <template #header>
        <span class="mt-2">RGB-Leds</span>
        <b-button-group class="float-right">
          <b-button size="sm" variant="success" @click="addOutput('rgb')">+</b-button>
          <b-button size="sm" variant="danger" @click="removeOutput({id: -1, type: 'rgb'})">-</b-button>
        </b-button-group>
      </template>

      <b-table-simple striped hover class="mb-0">
        <b-thead>
          <b-th>#</b-th>
          <b-th>R-Pin</b-th>
          <b-th>G-Pin</b-th>
          <b-th>B-Pin</b-th>
          <b-th></b-th>
        </b-thead>

        <b-tbody>
          <b-tr v-for="(output, index) in rgbLeds" :key="index">
            <b-td>{{ index }}</b-td>
            <b-td>
              <b-select :options="getPwmPins()" :value="output.pin[0]"
                        @change="updateOutputPin({id: index, type: 'rgb', newPin: $event, i: 0})" size="sm"></b-select>
            </b-td>
            <b-td>
              <b-select :options="getPwmPins()" :value="output.pin[1]"
                        @change="updateOutputPin({id: index, type: 'rgb', newPin: $event, i: 1})" size="sm"></b-select>
            </b-td>
            <b-td>
              <b-select :options="getPwmPins()" :value="output.pin[2]"
                        @change="updateOutputPin({id: index, type: 'rgb', newPin: $event, i: 2})" size="sm"></b-select>
            </b-td>
            <b-td>
              <b-button-group class="float-right">
                <b-button size="sm" variant="danger" @click="removeOutput({id: index, type: 'rgb'})">-</b-button>
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
    ...mapState(['template']),
    ...mapMultiRowFields([
        'template.leds',
        'template.pwmLeds',
        'template.rgbLeds'
    ])
  },
  methods: {
    ...mapMutations([
        "addOutput",
        "removeOutput",
        "updateOutputPin"
    ]),

    getPins(){
      return this.template.board.pins;
    },

    getPwmPins(){
      return this.template.board.pwmPins;
    }
  }
}
</script>

<style scoped>

</style>