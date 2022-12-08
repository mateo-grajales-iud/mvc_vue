import CategoriaComponentVue from "@/components/CategoriaComponent.vue";
import PostComponentVue from "@/components/PostComponent.vue";
import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "categorias",
      component: CategoriaComponentVue
    },
    {
      path: "/categoria",
      name: "categorias",
      component: CategoriaComponentVue
    },
    {
      path: "/post",
      name: "posts",
      component: PostComponentVue
    },

    {
      path: "/:pathMatch(.*)*",
      name: "categorias",
      component: CategoriaComponentVue
    },
  ],
});

export default router;
