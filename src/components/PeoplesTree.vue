<template>
  <el-tree
      node-key="id"
      ref="tree"
      :default-expanded-keys="expanded"
      show-checkbox
      :data="treeData"
      :props="defaultProps"
      class="peoples-tree"
      v-loading="loading"
      @check="handleCheck"
      @node-click="handleClick"
      @node-contextmenu="handleContextmenu"
  >
     <span
         slot-scope="{ node, data }"
         class="peoples-tree__label"
         :class="{
       accurate0: node.level === 3 && !data.accurate,
       accurate1: node.level === 3 && data.accurate===1,
       accurate2: node.level === 3 && data.accurate===2,
     }">
       {{ data.label }}
      <span v-if="data.date" class="peoples-tree__date">{{ data.date }}</span>
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
    },
    expanded: {
      type: Array,
      default: () => {
        return []
      }
    },
    maxIndex: {
      type: Number,
      default: 0
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

        const children = people.track.map((e) => {
          return { label: e.origin || e.name, ...e }
        })

        list.push({
          id: people.id,
          no: +no,
          label: `${no} ${people.area} (${children.length})`,
          date: people.date,
          children
        })
      })

      qData.sort((a, b) => a.no - b.no)
      wData.sort((a, b) => a.no - b.no)

      return [
        { id: 'Q', label: `确诊 [${qData.length}]`, children: qData },
        { id: 'W', label: `无症状 [${wData.length}]`, children: wData },
      ]
    }
  },
  methods: {
    handleCheck(e, { checkedNodes }) {
      const nodes = checkedNodes.filter(node => !node.children)
      this.$emit('change', nodes)
    },
    handleClick(data) {
      if (data.location) {
        this.$emit('click', data)
      }
    },
    handleContextmenu(e, data) {
      if (data.location) {
        const rid = this.maxIndex + 1
        this.$emit('update:maxIndex', rid)
        const json = JSON.stringify({
          rid,
          district: data.district,
          name: data.name,
          location: data.location
        })
        console.log(json)
      }
    },
    checkAreas(areas) {
      const keys = []
      this.peoples.forEach(people => {
        if (areas.some(area => area === people.area))
          keys.push(people.id)
      })
      const tree = this.$refs.tree
      tree.setCheckedKeys(keys)
      const checkedNodes = tree.getCheckedNodes()
      this.handleCheck(null, { checkedNodes })
    }
  },
}
</script>

<style scoped lang="scss">
.peoples-tree {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  $tree: &;

  &__label {
    font-size: 14px;

    #{$tree + '__date'} {
      color: #ccc;
    }
  }

  .accurate0 {
    color: #F56C6C
  }

  .accurate1 {
    color: #E6A23C
  }

  .accurate2 {
    color: #67C23A
  }
}
</style>
