<template>
  <div class="a-map">
    <div class="a-map__map" ref="amap"></div>
    <div class="a-map__marker" ref="marker">
      <div class="a-map__marker__item" v-for="item of currentCluster" :key="item.id">
        <p class="marker__title">{{ item.id }}</p>
        <p class="marker__content">{{ item.title }}</p>
      </div>
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
      infoWindow: null,
      currentCluster: []
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
          points.push({id: point.id, title: point.origin, lnglat: [point.location.lng, point.location.lat]})
        } else {
          console.log(point.id, point.origin)
        }
      })

      if (this.cluster) {
        this.cluster.setMap(null);
      }
      this.cluster = new this.AMap.MarkerCluster(this.map, points, {gridSize: 60});
      this.cluster.on('click', ({clusterData, lnglat}) => {
        const currentCluster = []
        clusterData.forEach(item => {
          const {id, title} = item;
          currentCluster.push({id, title})
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
        plugins: ['AMap.MarkerCluster', 'AMap.AutoComplete']
      }).then((AMap) => {
        this.AMap = AMap
        this.map = new AMap.Map(container, {
          viewMode: '2D',
          zoom: 10,
          center: [118.144541, 39.696604]
        })

        this.map.on('rightclick', ({lnglat}) => {
          console.log(lnglat)
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
    searchPoint(point) {
      const autoOptions = {
        city: '唐山市'
      }
      const autoComplete = new this.AMap.AutoComplete(autoOptions);
      return new Promise((resolve, reject) => {
        autoComplete.search(point.name, (status, result) => {
          if (result.info === 'OK') {
            const {district, name, location} = result.tips[0]
            const pos = {
              id: point.id, origin: point.name,
              district, name, location: {
                lng: location.lng,
                lat: location.lat
              }
            }
            resolve(pos)
          } else {
            reject('err')
          }
        })
      })
    },
    setCenter({location}) {
      this.map.setZoomAndCenter(17, [location.lng, location.lat], true)
    }
  },
}
</script>

<style scoped lang="scss">
.a-map, .a-map__map {
  width: 100%;
  height: 100%;
}

.a-map__marker {
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

</style>
