<template>
  <div id="app" class="app">
    <peoples-tree
        class="app__tree"
        :peoples="peoples"
        :expanded="expanded"
        :loading="loading"
        @change="handleChange"
        @click="handleNodeClick"
    />
    <a-map class="app__map" :points="points" ref="map" @click="handleMarkerClick"/>
  </div>
</template>

<script>

import AMap from "@/components/AMap";
import PeoplesTree from "@/components/PeoplesTree";
import request from "@/utils/request";
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: 'App',
  components: {PeoplesTree, AMap},
  data() {
    return {
      peoples: [],
      points: [],
      AMap: null,
      loading: false,
      expanded: []
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
          .then(({data}) => {
            const promises = []
            const peoples = data.peoples.map(people => {
              const track = people.track.map((pos, index) => {
                let item = {}
                if (typeof (pos) === 'number') {
                  item = {...data.positions.find(p => p.id === pos)}
                } else if (typeof (pos) === 'string') {
                  item = {origin: pos, accurate: 1}
                  promises.push(this.searchPoint(item))
                } else if (typeof (pos) === 'object') {
                  item = {...pos}
                }
                item.id = `${people.id}-${index}`
                return item
              })
              return {...people, track}
            })

            Promise.all(promises)
                .then(resList => {
                  resList.forEach(({data, pos}) => {
                    data.district = pos.district
                    data.name = pos.name
                    data.location = pos.location
                  })
                  this.peoples = peoples
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
    handleMarkerClick(data) {
      this.expanded = [data.id.slice(0, 5)]
    },
    searchPoint(data) {
      const autoOptions = {
        city: '唐山市'
      }
      return new Promise((resolve, reject) => {
        const autoComplete = new this.AMap.AutoComplete(autoOptions);
        autoComplete.search(data.origin, (status, result) => {
          if (result) {
            let pos
            if (result.info === 'OK') {
              const {district, name, location} = result.tips[0]
              pos = {
                district, name, location: {
                  lng: location.lng,
                  lat: location.lat,
                }
              }
            } else {
              pos = {}
            }
            resolve({data, pos})
          } else {
            reject({status, result, origin: data.origin})
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
