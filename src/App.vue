<template>
  <div id="app" class="app">
    <peoples-tree class="app__tree" :peoples="peoples" @change="handleChange"/>
    <a-map class="app__map" :points="points"/>
  </div>
</template>

<script>

import AMap from "@/components/AMap";
import PeoplesTree from "@/components/PeoplesTree";
import request from "@/utils/request";

export default {
  name: 'App',
  components: { PeoplesTree, AMap },
  data() {
    return {
      peoples: [],
      points: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      request.get('data/data.json')
          .then(({ data }) => {
            this.peoples = data.peoples
          })
    },
    handleChange(data) {
      this.points = data
    }
  },
}
</script>

<style lang="scss">
html, body, .app {
  margin: 0;
  width: 100%;
  height: 100%;
}

.app {
  display: flex;

  &__tree {
    width: 23rem;
    padding: .5rem;
  }

  &__map {
    flex: 1;
    overflow: hidden;
  }
}
</style>
