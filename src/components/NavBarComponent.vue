<script>
import { RouterLink } from "vue-router";

export default {};
</script>

<template lang="">
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink class="nav-link" :class="{active: $route.name==='categorias'}" to="/categoria">Categorias</RouterLink>
          <RouterLink class="nav-link" :class="{active: $route.name==='posts'}" to="/post">Posts</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang=""></style>
