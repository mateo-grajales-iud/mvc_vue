<script>
import { RouterLink, RouterView } from "vue-router";
import CategoriaComponent from "./components/CategoriaComponent.vue";
import NavBarComponent from "./components/NavBarComponent.vue";


export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CategoriaComponent,
    NavBarComponent,
  }
}
</script>

<template>
  <NavBarComponent></NavBarComponent>
  <RouterView />
</template>

<style scoped>

</style>
