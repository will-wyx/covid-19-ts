<template>
  <el-tree
      node-key="id"
      :default-expanded-keys="expanded"
      show-checkbox
      :data="treeData"
      :props="defaultProps"
      class="peoples-tree"
      v-loading="loading"
      @check="handleCheck"
      @node-click="handleClick"
  >
     <span
         class="peoples-tree__label"
         :class="{
       accurate0: node.level === 3 && !data.accurate,
       accurate1: node.level === 3 && data.accurate===1,
       accurate2: node.level === 3 && data.accurate===2,
     }" slot-scope="{ node, data }">
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
    },
    expanded: {
      type: Array,
      default: () => {
        return []
      }
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
          return {label: e.origin || e.name, ...e}
        })

        list.push({
          id: people.id,
          no: +no,
          label: `${no} ${people.area} (${children.length})`,
          children
        })
      })

      qData.sort((a, b) => a.no - b.no)
      wData.sort((a, b) => a.no - b.no)

      return [
        {id: 'q', label: `确诊 [${qData.length}]`, children: qData},
        {id: 'w', label: `无症状 [${wData.length}]`, children: wData},
      ]
    }
  },
  methods: {
    handleCheck(e, {checkedNodes}) {
      const nodes = checkedNodes.filter(node => !node.children)
      this.$emit('change', nodes)
    },
    handleClick(data) {
      if (data.location) {
        this.$emit('click', data)
      }
    }
  },
}
</script>

<style scoped lang="scss">
.peoples-tree {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  &__label {
    font-size: 14px;
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
