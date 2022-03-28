<template>
  <div id="app" class="app">
    <peoples-tree
        class="app__tree"
        ref="tree"
        :peoples="peoples"
        :expanded="expanded"
        :loading="loading"
        :max-index.sync="maxIndex"
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
        <el-tag class="app__top__item" v-for="pos of topPositions" :key="pos.rid" size="mini">{{
            pos.name
          }}[{{ pos.count }}]
        </el-tag>
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
      allPeoples: [],
      peoples: [],
      points: [],
      AMap: null,
      autoComplete: null,
      loading: false,
      expanded: ['Q', 'W'],
      maxIndex: 0,
      options: {
        areas: [],
        dates: []
      },
      areas: [],
      dates: [],
      positions: [],
      top: 20
    }
  },
  computed: {
    topPositions() {
      return this.positions.slice(0, this.top)
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

      const options = {
        city: '唐山市'
      }
      this.autoComplete = new this.AMap.AutoComplete(options)
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
            this.positions = data.positions
            this.maxIndex = this.positions.reduce((a, b) => {
              return a.rid > b.rid ? a.rid : b.rid
            })
            const peoples = data.peoples.map(people => {
              const peopleType = people.id.slice(0, 1)
              let area = this.options.areas.find(a => a.value === people.area)
              if (!area) {
                area = { value: people.area, label: people.area, checked: true, countQ: 0, countW: 0 }
                area[`count${peopleType}`] = 1
                this.options.areas.push(area)
              } else {
                area[`count${peopleType}`]++
              }
              area.label = `${area.value} [${area.countQ}+${area.countW}]`

              let date = this.options.dates.find(d => d.value === people.date)
              if (!date) {
                date = { value: people.date, label: people.date.slice(5), checked: true, countQ: 0, countW: 0 }
                date[`count${peopleType}`] = 1
                this.options.dates.push(date)
              } else {
                date[`count${peopleType}`]++
              }
              date.label = `${date.value} [${date.countQ}+${date.countW}]`

              const track = people.track.map((pos, index) => {
                let item
                if (pos.rid) {
                  const position = this.positions.find(p => p.rid === pos.rid)
                  if (position.count) {
                    position.count++
                  } else {
                    position.count = 1
                  }
                  item = { ...pos, ...position }
                } else {
                  item = { ...pos }
                  if (pos.accurate !== 0)
                    promises.push(this.searchPoint(item, people))
                }
                item.id = `${people.id}-${index}`
                return item
              })
              return { ...people, track }
            })

            this.areas = this.options.areas.map(a => a.value)
            this.dates = this.options.dates.map(d => d.value)

            Promise.all(promises)
                .then(resList => {
                  this.searchCallback(resList, peoples)
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
      const ids = data.map(item => item.id.slice(0, 5))
      this.expanded = ids
    },
    filterPeoples() {
      this.peoples = this.allPeoples.filter(people => {
        const { date, area } = people
        const inDate = this.dates.some(d => d === date)
        const inArea = this.areas.some(a => a === area)
        return inDate && inArea
      })
    },
    searchCallback(resList, peoples) {
      const refs = []
      const poss = []
      resList.forEach(({ data, pos, people }) => {
        data.district = pos.district
        data.name = pos.name
        data.location = pos.location
        data.accurate = pos.accurate

        if (pos.rid) {
          refs.push(
              [
                people.id,
                JSON.stringify({ rid: pos.rid, accurate: 1, origin: data.origin }),
                data.name
              ]
          )

          if (pos.accurate === -1) {
            poss.push({ rid: pos.rid, district: pos.district, name: pos.name, location: pos.location })
          }
        }
      })

      console.table(refs)
      console.log(poss)
      this.allPeoples = peoples
      this.peoples = peoples
      this.loading = false
      this.positions.sort((a, b) => b.count > a.count ? 1 : -1)
    },
    searchPoint(data, people) {
      return new Promise((resolve, reject) => {
        this.autoComplete.search(data.origin, (status, result) => {
          if (result) {
            let pos = {
              accurate: 0
            }
            if (result.info === 'OK') {
              const { district, name, location } = result.tips[0]
              pos = {
                district, name, location: {
                  lng: location.lng,
                  lat: location.lat,
                },
                accurate: 1
              }

              // 检查位置集中有没有对应的定位数据
              const refPos = this.positions.find(({ location: { lng, lat } }) => {
                return lng === pos.location.lng && lat === pos.location.lat
              })

              if (refPos) {
                pos.rid = refPos.rid
                if (refPos.count)
                  refPos.count++
                else
                  refPos.count = 0
              } else {
                pos.rid = ++this.maxIndex
                pos.accurate = -1
                this.positions.push({
                  ...pos,
                  count: 1
                })
              }
            }
            resolve({ data, pos, people })
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

  &__top__item {
    margin-right: 4px;
  }
}
</style>
