<template>
  <div id="app" class="app">
    <peoples-tree class="app__tree" :peoples="peoples" @change="handleChange" :loading="loading"
                  @click="handleNodeClick"/>
    <a-map class="app__map" :points="points" ref="map"/>
  </div>
</template>

<script>

import AMap from "@/components/AMap";
import PeoplesTree from "@/components/PeoplesTree";
import request from "@/utils/request";
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: 'App',
  components: { PeoplesTree, AMap },
  data() {
    return {
      peoples: [],
      points: [],
      AMap: null,
      loading: false
    }
  },
  created() {
    AMapLoader.load({
      key: 'd786ac93724ce3d6658748d66cf5be5b',
      version: '2.0',
      plugins: ['AMap.AutoComplete']
    }).then((AMap) => {
      this.AMap = AMap
      this.loadData()
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    loadData() {
      this.loading = true
      request.get('data/data.json')
          .then(({ data }) => {
            const promises = []
            const { peoples, positions } = data
            peoples.forEach(people => {
              people.track = people.track.map((pos, i) => {
                if (typeof (pos) === 'number') {
                  return positions.find(p => p.id === pos)
                }
                if (!pos.location) {
                  promises.push(this.searchPoint(people, i, pos))
                }
                return pos
              })
            })

            Promise.all(promises)
                .then(resList => {
                  resList.forEach(({ people, index, pos }) => {
                    people.track[index] = pos
                  })
                  this.peoples = data.peoples
                  this.loading = false
                })
                .catch(err => {
                  console.log('err', err)
                })
          })
    },
    handleChange(data) {
      this.points = data
    },
    handleNodeClick(data) {
      const json = JSON.stringify({
        district: data.district,
        name: data.name,
        origin: data.origin,
        location: data.location,
        accurate: 2
      })
      console.log(json)
      this.$refs.map.setCenter(data)
    },
    searchPoint(people, index, keywords) {
      const autoOptions = {
        city: '唐山市'
      }
      return new Promise((resolve, reject) => {
        const autoComplete = new this.AMap.AutoComplete(autoOptions);
        autoComplete.search(keywords, (status, result) => {
          if (result) {
            let pos
            if (result.info === 'OK') {
              const { district, name, location } = result.tips[0]
              pos = {
                origin: keywords,
                district, name, location: {
                  lng: location.lng,
                  lat: location.lat,
                },
                accurate: 1
              }
            } else {
              pos = {
                origin: keywords,
                name: keywords
              }
            }
            resolve({ people, index, pos })
          } else {
            reject({ status, result, keywords })
          }
        })
      })
    },
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
