<template>
  <el-tree node-key="id" show-checkbox :data="treeData" :props="defaultProps" class="peoples-tree" v-loading="loading"
           @check="handleCheck"
           @node-click="handleClick"
  >
     <span :class="{invalid: node.level === 3 && !data.location}" slot-scope="{ node, data }">
       {{ data.label }}
     </span>
  </el-tree>
</template>

<script>
export default {
  name: "PeoplesTree",
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'label',
        children: 'children'
      }
    }
  },
  props: {
    peoples: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    treeData() {
      const qData = [], wData = []

      this.peoples.forEach(people => {
        const c = people.id.slice(0, 1), no = people.id.slice(1);
        let list;
        if (c === 'Q') {
          list = qData
        } else {
          list = wData
        }

        const children = people.track.map((e, i) => {
          let result
          if (e instanceof Object) {
            result = { id: `${people.id}-${i}`, label: e.name, ...e }
          } else {
            result = { id: `${people.id}-${i}`, label: e, name: e }
          }
          return result
        })

        list.push({
          id: people.id,
          no: +no,
          label: `${no} ${people.area}`,
          children
        })
      })

      qData.sort((a, b) => a.no - b.no)
      wData.sort((a, b) => a.no - b.no)

      return [
        { id: 'q', label: '确诊', children: qData },
        { id: 'w', label: '无症状', children: wData },
      ]
    }
  },
  methods: {
    handleCheck(e, { checkedNodes }) {
      const nodes = checkedNodes.filter(node => !node.children)
      this.$emit('change', nodes)
    },
    handleClick(data, node) {
      console.log(data, node)
    }
  },
}
</script>

<style scoped lang="scss">
.peoples-tree {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .invalid {
    color: red
  }
}
</style>
