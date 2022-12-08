<template lang="">
  <div>
    <div class="alert alert-danger" role="alert" v-if="onError">
      {{ onError }}
    </div>
    <div class="alert alert-success" role="alert" v-if="onExito">
      {{ onExito }}
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="p-5">
          <form @submit.prevent="crearPost()">
            <h5>Crear post</h5>
            <label class="form-label">Categoria</label>
            <select v-model="categoriaCrear" required class="form-control">
              <option
                v-for="data in dataCategorias"
                :key="data.id"
                :value="data"
              >
                {{ data.id + ": " + data.name }}
              </option>
            </select>
            <label class="form-label">Nombre</label>
            <input
              type="text"
              required
              v-model="nameCrear"
              class="form-control"
            />
            <label class="form-label">Descripción</label>
            <input
              type="text"
              required
              v-model="descriptionCrear"
              class="form-control"
            />
            <label class="form-label">Contenido</label>
            <textarea class="form-control" rows=5 required v-model="contenidoCrear"> </textarea>
            <input
              type="submit"
              value="Crear"
              class="btn btn-primary mb-3 mt-3"
            />
          </form>
        </div>
      </div>

      <div class="col">
        <div class="p-5">
          <h5>Editar post</h5>
          <label class="form-label">Post</label>
          <input type="text" class="form-control" v-model="idEditar" />
          <button
            @click="cambioPost(idEditar)"
            class="btn btn-primary mb-3 mt-3 btn-block"
          >
            Buscar
          </button>
          <form @submit.prevent="editarCategoria()">
            <label class="form-label" for="test">Categoria</label>
            <select
              v-model="categoriaEditar"
              required
              class="form-control"
              id="test"
            >
              <option
                v-for="data in dataCategorias"
                :key="data.id"
                :value="data"
              >
                {{ data.id + ": " + data.name }}
              </option>
            </select>
            <label class="form-label">Nombre</label>
            <input
              type="text"
              required
              v-model="nameEditar"
              class="form-control"
            />
            <label class="form-label">Descripción</label>
            <input
              type="text"
              v-model="descriptionEditar"
              class="form-control"
            />
            <label class="form-label">Contenido</label>
            <textarea class="form-control" rows=5 v-model="contenidoEditar"> </textarea>
            <label class="form-label">Estado</label>
            <select required v-model="estadoEditar" class="form-control">
              <option value="No Publicado">No publicado</option>
              <option value="Publicado">Publicado</option>
            </select>
            <input
              type="submit"
              value="Editar"
              class="btn btn-primary mb-3 mt-3"
            />
          </form>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Contenido</th>
              <th>Estado</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in dataPosts" :key="data.id" :value="data">
              <td>{{ data.id }}</td>
              <td>{{ data.name }}</td>
              <td>
                {{
                  dataCategorias.find(
                    (categoria) => categoria.id == data.category_id
                  ).name
                }}
              </td>
              <td>{{ data.description }}</td>
              <td>{{ data.content }}</td>
              <td>{{ data.state }}</td>
              <td>{{ data.created_at }}</td>
              <td>{{ data.updated_at }}</td>
              <td>
                <button @click="borrar(data)" class="btn btn-primary">
                  Borrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categoriaCrear: "",
      nameCrear: "",
      descriptionCrear: "",
      categoriaEditar: "",
      idEditar: "",
      nameEditar: "",
      descriptionEditar: "",
      estadoEditar: "No Publicado",
      dataPosts: [],
      dataCategorias: [],
      error: "",
      exito: "",
      contenidoCrear: "",
      contenidoEditar: "",
    };
  },
  computed: {
    onError() {
      return this.error;
    },
    onExito() {
      return this.exito;
    },
  },
  methods: {
    crearPost() {
      console.log("Crear post");
      var url = "http://vue-api-template.test/api/post/store";
      var nuevoPost = {
        category_id: this.categoriaCrear.id,
        name: this.nameCrear,
        description: this.descriptionCrear,
        content: this.contenidoCrear,
        state: "No publicado",
      };
      console.log(nuevoPost);
      axios
        .post(url, nuevoPost, {})
        .then((res) => {
          this.getAllCategorias();
          this.getAllPosts();
          this.error = "";
          this.exito = "Se creo exitosamente el elemento";
          this.categoriaCrear = "";
          this.nameCrear = "";
          this.descriptionCrear = "";
          this.contenidoCrear = "";
        })
        .catch((err) => {
          this.error = "Error creando elemento: " + err.message;
          this.exito = "";
        });
    },
    editarCategoria() {
      console.log("Editar categoria");
      var editarCategoria = {
        category_id: this.categoriaEditar.id,
        name: this.nameEditar,
        description: this.descriptionEditar,
        content: this.contenidoEditar,
        state: this.estadoEditar,
      };
      var url =
        "http://vue-api-template.test/api/post/" + this.idEditar + "/update";
      console.log(editarCategoria);
      axios
        .put(url, editarCategoria, {})
        .then((res) => {
          this.getAllCategorias();
          this.getAllPosts();
          this.error = "";
          this.exito = "Se edito exitosamente el elemento";
          this.idEditar = "";
          this.contenidoEditar = "";
          this.categoriaEditar = "";
          this.nameEditar = "";
          this.descriptionEditar = "";
        })
        .catch((err) => {
          this.error = "Error creando elemento: " + err.message;
          this.exito = "";
        });
    },
    async cambioPost() {
      console.log("Se cambio de post");
      console.log(this.idEditar);
      var dataPost = await this.getPost(this.idEditar);
      console.log("dataPost: ", dataPost);
      this.categoriaEditar = this.dataCategorias.find(
        (categoria) => categoria.id == dataPost.category_id
      );
      this.nameEditar = dataPost.name;
      this.descriptionEditar = dataPost.description;
      this.estadoEditar = dataPost.state;
      this.contenidoEditar = dataPost.content;
    },
    borrar(data) {
      console.log("Borrar id: ", data);
      var url = "http://vue-api-template.test/api/post/" + data.id + "/destroy";
      console.log(url);
      axios
        .delete(url)
        .then((res) => {
          this.getAllCategorias();
          this.getAllPosts();
          this.error = "";
          this.exito = "Se borró correctamente el elemento";
        })
        .catch((err) => {
          this.error = "Error borrando elemento: " + err.message;
          this.exito = "";
        });
    },

    async getPost(id) {
      var url = "http://vue-api-template.test/api/post/" + id + "/edit";
      const post = await axios
        .get(url)
        .then((res) => {
          console.log(res.data.data);
          return res.data.data;
        })
        .catch((err) => {
          this.error = err.message;
          this.exito = "";
        });
      return post;
    },

    async getAllCategorias() {
      const allCat = await axios
        .get("http://vue-api-template.test/api/category/all")
        .catch((err) => {
          this.error = err.message;
          this.exito = "";
        });
      console.log(allCat.data.data);
      this.dataCategorias = allCat.data.data;
      return this.dataCategorias;
    },

    async getAllPosts() {
      const allPosts = await axios
        .get("http://vue-api-template.test/api/post/all")
        .catch((err) => {
          this.error = err.message;
          this.exito = "";
        });
      console.log(allPosts.data.data);
      this.dataPosts = allPosts.data.data;
      return this.dataPosts;
    },

    async mounted() {
      await this.getAllCategorias();
      await this.getAllPosts();
    },
  },
  mounted: function () {
    this.mounted();
  },
};
</script>
<style lang=""></style>
