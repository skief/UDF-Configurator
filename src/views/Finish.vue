<template>
  <b-container>
    <div class="text-center">
      <h2>Configurator Finish</h2>
      <div>
        <b-button @click="downloadConfig()">config.h</b-button>
      </div>
      <div>
        <b-button @click="downloadAdvConfig()">advConfig.h</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import {mapState} from "vuex";
import { render } from 'ejs'

export default {
  components: {

  },
  computed: {
    ...mapState(["template"])
  },
  methods: {
    downloadFile(filename, responseType, accept) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filename, true);
        xhr.responseType = responseType;
        if (accept) {
          xhr.setRequestHeader('Accept', accept);
        }
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(`${xhr.status} ${xhr.statusText}`);
          }
        };
        xhr.onerror = () => reject('Network error');
        xhr.send(null);
      });
    },

    async compileFile(filename, template) {
      const fileContent = await this.downloadFile(filename, 'text');
      return render(fileContent, {template: template});
    },

    async getAdvConfig(){
      let ejsFile = "templates/adv-config.ejs";
      return this.compileFile(ejsFile, this.template)
    },

    async getConfig(){
      let ejsFile = "templates/config.ejs";
      return this.compileFile(ejsFile, this.template);
    },

    download(content, filename){
      let uriContent = URL.createObjectURL(new Blob([content], {type : 'text/plain'}));
      let link = document.createElement('a');
      link.setAttribute('href', uriContent);
      link.setAttribute('download', filename);
      let event = new MouseEvent('click');
      link.dispatchEvent(event);
    },

    async downloadConfig(){
      this.getConfig().then(content => this.download(content, 'config.h'));

    },

    async downloadAdvConfig(){
      this.getAdvConfig().then(content => this.download(content, 'adv-config.h'));
    }
  },
  data(){
    return {advConfig: "", config: ""};
  }
}
</script>

<style scoped>

</style>