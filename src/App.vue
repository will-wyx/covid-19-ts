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
        <el-select
            v-model="areas"
            multiple
            placeholder="请选择"
            size="mini"
            class="app__filter__item"
            @change="filterPeoples"
        >
          <el-option
              class="app__option"
              v-for="item in options.areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
            <span class="app__option__label">{{ item.label }}</span>
            <span class="app__option__count">{{ item.countQ }}+{{ item.countW }}</span>
          </el-option>
        </el-select>
        <el-select
            v-model="dates"
            multiple
            placeholder="请选择"
            size="mini"
            class="app__filter__item"
            @change="filterPeoples"
        >
          <el-option
              class="app__option"
              v-for="item in options.dates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
            <span class="app__option__label">{{ item.label }}</span>
            <span class="app__option__count">{{ item.countQ }}+{{ item.countW }}</span>
          </el-option>
        </el-select>
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
  components: {PeoplesTree, AMap},
  data() {
    return {
      allPeoples: [],
      peoples: [],
      points: [],
      AMap: null,
      loading: false,
      expanded: ['Q', 'W'],
      maxIndex: 0,
      options: {
        areas: [],
        dates: []
      },
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
          .then(({data}) => {
            const promises = []
            this.maxIndex = data.positions.reduce((a, b) => {
              return a.rid > b.rid ? a.rid : b.rid
            })
            const peoples = data.peoples.map(people => {
              const peopleType = people.id.slice(0, 1)
              let area = this.options.areas.find(a => a.value === people.area)
              if (!area) {
                area = {value: people.area, label: people.area, checked: true, countQ: 0, countW: 0}
                area[`count${peopleType}`] = 1
                this.options.areas.push(area)
              } else {
                area[`count${peopleType}`]++
              }
              area.label = `${area.value} [${area.countQ}+${area.countW}]`

              let date = this.options.dates.find(d => d.value === people.date)
              if (!date) {
                date = {value: people.date, label: people.date.slice(5), checked: true, countQ: 0, countW: 0}
                date[`count${peopleType}`] = 1
                this.options.dates.push(date)
              } else {
                date[`count${peopleType}`]++
              }
              date.label = `${date.value} [${date.countQ}+${date.countW}]`

              const track = people.track.map((pos, index) => {
                let item
                if (pos.rid) {
                  item = {...pos, ...data.positions.find(p => p.rid === pos.rid)}
                } else {
                  item = {...pos}
                  if (pos.accurate !== 0)
                    promises.push(this.searchPoint(item))
                }
                item.id = `${people.id}-${index}`
                return item
              })
              return {...people, track}
            })

            this.areas = this.options.areas.map(a => a.value)
            this.dates = this.options.dates.map(d => d.value)

            Promise.all(promises)
                .then(resList => {
                  resList.forEach(({data, pos}) => {
                    data.district = pos.district
                    data.name = pos.name
                    data.location = pos.location
                    data.accurate = pos.accurate
                  })
                  this.allPeoples = peoples
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
    filterPeoples() {
      this.peoples = this.allPeoples.filter(people => {
        const {date, area} = people
        const inDate = this.dates.some(d => d === date)
        const inArea = this.areas.some(a => a === area)
        return inDate && inArea
      })
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
                },
                accurate: 1
              }
            } else {
              pos = {
                accurate: 0
              }
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

  &__filter__item {
    width: 100%;
  }

  &__option {
    font-size: 13px;

    &__label {
      margin-right: 1rem;
    }

    &__count {
      color: #8492a6;
    }
  }
}
</style>
