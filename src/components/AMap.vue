<template>
  <div class="a-map" ref="amap"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: "AMap",
  data() {
    return {
      map: null,
      cluster: null,
      AMap: null
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
          points.push({ id: point.id, lnglat: [point.location.lng, point.location.lat] })
        } else {
          console.log(point.id, point.name)
        }
      })

      if (this.cluster) {
        this.cluster.setMap(null);
      }
      this.cluster = new this.AMap.MarkerCluster(this.map, points, { gridSize: 60 });
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
            const { district, name, location } = result.tips[0]
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
    updateCluster() {
      if (this.cluster) {
        this.cluster.setMap(null);
      }
      this.cluster = new this.AMap.MarkerCluster(this.map, [
        { lnglat: ['118.107244', '39.651315'] },
      ], { gridSize: 60 });
    }
  },
}
</script>

<style scoped>
.a-map {
  width: 100%;
  height: 100%;
}
</style>
