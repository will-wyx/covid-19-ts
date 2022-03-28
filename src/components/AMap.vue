<template>
  <div class="a-map">
    <div class="a-map__map" ref="amap"></div>
    <div class="a-map__marker" ref="marker">
      <div class="a-map__marker__item" v-for="(item, i) of currentCluster" :key="i"
           @click="handleMarkerItemClick(item)"
      >
        <p class="marker__title">{{ item.id }}</p>
        <p class="marker__content">{{ item.title }}</p>
      </div>
    </div>
    <div class="a-map__complete">
      <el-select
          class="complete__control"
          v-model="address"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="searchAddress"
          :loading="loading"
          size="mini"
          @change="handleCompleteChange"
      >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: "AMap",
  data() {
    return {
      map: null,
      cluster: null,
      AMap: null,
      geocoder: null,
      autoComplete: null,
      infoWindow: null,
      currentCluster: [],
      address: null,
      loading: false,
      options: []
    }
  },
  props: {
    points: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    this.initMap()
  },
  watch: {
    points(value) {
      const points = []
      value.forEach(point => {
        if (point.location) {
          points.push({ id: point.id, title: point.origin, lnglat: [point.location.lng, point.location.lat] })
        } else {
          console.log(point.id, point.origin)
        }
      })

      if (this.cluster) {
        this.cluster.setMap(null);
      }
      this.cluster = new this.AMap.MarkerCluster(this.map, points, { gridSize: 60 });
      this.cluster.on('click', ({ clusterData, lnglat }) => {
        const currentCluster = []
        clusterData.forEach(item => {
          const { id, title } = item;
          currentCluster.push({ id: id.slice(0, 5), title })
        })
        this.currentCluster = currentCluster
        this.infoWindow.open(this.map, lnglat)
        this.$emit('click', currentCluster)
      })
      this.map.setFitView(null, true)
      this.infoWindow.close()
    }
  },
  methods: {
    initMap() {
      const container = this.$refs.amap
      AMapLoader.load({
        key: 'd786ac93724ce3d6658748d66cf5be5b',
        version: '2.0',
        plugins: ['AMap.MarkerCluster', 'AMap.Geocoder', 'AMap.AutoComplete']
      }).then((AMap) => {
        this.AMap = AMap
        const options = {
          city: '唐山市'
        }
        this.geocoder = new this.AMap.Geocoder(options)
        this.autoComplete = new this.AMap.AutoComplete(options)

        this.map = new AMap.Map(container, {
          viewMode: '2D',
          zoom: 10,
          center: [118.144541, 39.696604]
        })

        this.map.on('rightclick', ({ lnglat }) => {
          this.geocoder.getAddress(lnglat, (status, result) => {
            const { regeocode: { formattedAddress } } = result
            this.geocoder.getLocation(formattedAddress, (s, r) => {
              const [{ location: { lng, lat } }] = r.geocodes
              console.log(
                  formattedAddress,
                  { lng: lnglat.lng, lat: lnglat.lat },
                  JSON.stringify({ location: { lng, lat } })
              )
            })
          })
        })

        const marker = this.$refs.marker

        this.infoWindow = new AMap.InfoWindow({
          anchor: 'top-left',
          content: marker
        })
      }).catch(e => {
        console.log(e)
      })
    },
    searchAddress(query) {
      if (query !== '') {
        this.loading = true
        this.autoComplete.search(query, (status, result) => {
          if (result) {
            this.options = result.tips.map(({ id, district, name, location }) => {
              return { value: id, label: `${district}${name}`, location }
            })
            this.loading = false
          }
        })
      } else {
        this.options = [];
      }
    },
    setCenter({ location }) {
      this.map.setZoomAndCenter(17, [location.lng, location.lat], true)
    },
    handleMarkerItemClick(item) {
      this.$emit('marker-item-click', item.id)
    },
    handleCompleteChange(value) {
      const item = this.options.find(e => {
        return e.value === value
      })
      const { location: { lng, lat } } = item
      console.log(JSON.stringify({ lng, lat }))
      this.setCenter(item)
    }
  },
}
</script>

<style scoped lang="scss">
.a-map {
  position: relative;
  width: 100%;
  height: 100%;

  &__map {
    width: 100%;
    height: 100%;
  }

  &__marker {
    &__item {
      padding-bottom: 3px;

      p {
        margin: 0;
        font-size: 14px;
        color: #333;
      }

      .marker__title {

      }

      .marker__content {
        font-size: 13px;
        color: #888;
      }
    }
  }

  .a-map__complete {
    position: absolute;
    width: 15rem;
    height: 2rem;
    top: .5rem;
    left: .5rem;

    .complete__control {
      width: 100%;
    }
  }
}

</style>
