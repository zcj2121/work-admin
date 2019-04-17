<template>
  <div class="menu-wrapper">
    <template
      v-for="item in routes"
      v-if="!item.hidden&&item.children"
    >
      <router-link
        v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
        :key="item.children[0].name"
        :to="item.path+'/'+item.children[0].path"
        class="p-left-20"
      >
        <el-menu-item
          :index="item.path+'/'+item.children[0].path"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <i :class="'fa fa-'+item.children[0].meta.icon" />
          <span
            v-if="item.children[0].meta&&item.children[0].meta.title"
            slot="title"
          >{{ item.children[0].meta.title }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu
        v-else
        :key="item.name"
        :index="item.name||item.path"
      >
        <template slot="title">
          <i :class="'fa fa-'+item.meta.icon" />
          <span
            v-if="item.meta&&item.meta.title"
            slot="title"
          >{{ item.meta.title }}</span>
        </template>

        <template
          v-for="child in item.children"
          v-if="!child.hidden"
        >
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :key="child.path"
            :is-nest="true"
            class="nest-menu"
            :routes="[child]"
          />

          <router-link
            v-else
            :key="child.name"
            :to="item.path+'/'+child.path"
          >
            <el-menu-item :index="item.path+'/'+child.path">
              <i
                class="fa"
                style="width: 0px;"
              />
              <span
                v-if="child.meta&&child.meta.title"
                slot="title"
              >{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  updated() {
    // for (const item of this.routes) {
    //   if (item.children.length > 0) {
    //     this.$router.push({ path: `/${item.path}/${item.children[0].path}` })
    //     return
    //   }
    // }
  }
};

</script>
<style>
  .p-left-20 li{
    padding-left:20px !important;
  }
</style>
