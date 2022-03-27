<template>
  <div id="app" class="app">
    <peoples-tree
        class="app__tree"
        ref="tree"
        :peoples="peoples"
        :expanded="expanded"
        :loading="loading"
        :max-index="maxIndex"
        @change="handleChange"
        @click="handleNodeClick"
    />
    <div class="app__main">
      <div class="app__filter">
        <el-checkbox
            v-for="(area, i) of areas"
            :key="i"
            v-model="area.checked"
            @change="handleAreaChange"
        >{{ area.label }} ({{ area.countQ }}+{{ area.countW }})
        </el-checkbox>
        <el-checkbox
            v-for="(date, i) of dates"
            :key="i"
            v-model="date.checked"
        >{{ date.label }} ({{ date.countQ }}+{{ date.countW }})
        </el-checkbox>
      </div>
      <a-map class="app__map" :points="points" ref="map" @click="handleMarkerClick"/>
    </div>
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
      loading: false,
      expanded: [],
      maxIndex: 0,
      areas: [],
      dates: []
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
            this.maxIndex = data.positions.reduce((a, b) => {
              return a.rid > b.rid ? a.rid : b.rid
            })
            const peoples = data.peoples.map(people => {
              let area = this.areas.find(a => a.label === people.area)
              if (!area) {
                area = { label: people.area, checked: false }
                area.countQ = 1
                area.countW = 1
                this.areas.push(area)
              } else {
                area.countQ++
                area.countW++
              }

              let date = this.dates.find(d => d.label === people.date)
              if (!date) {
                date = { label: people.date, checked: false}
                date.countQ = 1
                date.countW = 1
                this.dates.push(date)
              } else {
                date.countQ++
                date.countW++
              }

              const track = people.track.map((pos, index) => {
                let item
                if (pos.rid) {
                  item = { ...pos, ...data.positions.find(p => p.rid === pos.rid) }
                } else {
                  item = { ...pos }
                  if (pos.accurate !== 0)
                    promises.push(this.searchPoint(item))
                }
                item.id = `${people.id}-${index}`
                return item
              })
              return { ...people, track }
            })

            Promise.all(promises)
                .then(resList => {
                  resList.forEach(({ data, pos }) => {
                    data.district = pos.district
                    data.name = pos.name
                    data.location = pos.location
                    data.accurate = pos.accurate
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
      this.$refs.map.setCenter(data)
    },
    handleMarkerClick(data) {
      this.expanded = [data.id.slice(0, 5)]
    },
    handleAreaChange() {
      let areas = []
      this.areas.forEach(area => {
        if (area.checked) {
          areas.push(area.label)
        }
      })
      this.$refs.tree.checkAreas(areas)
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
              const { district, name, location } = result.tips[0]
              pos = {
                district, name, location: {
                  lng: location.lng,
                  lat: location.lat,
                },
                accurate: 1
              }
            } else {
              pos = {
                accurate: 0
              }
            }
            resolve({ data, pos })
          } else {
            reject({ status, result, origin: data.origin })
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
  $app: &;

  &__tree {
    width: 20%;
    padding: .5rem;
    background-color: #efefef;
  }

  &__main {
    flex: 1;
    overflow: hidden;

    #{$app + '__filter'} {
      padding: 2px 4px;
      display: flex;
      flex-wrap: wrap;
    }

    #{$app + '__map'} {
      flex: 1;
      overflow: hidden;
    }
  }

}
</style>
