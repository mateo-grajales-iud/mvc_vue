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
          <form @submit.prevent="crearCategoria">
            <h5>Crear categoria</h5>
            <label class="form-label">Nombre</label>
            <input
              class="form-control"
              type="text"
              required
              v-model="nameCrear"
            />
            <label class="form-label">Descripción</label>
            <input
              class="form-control"
              type="text"
              v-model="descriptionCrear"
            />
            <input
              class="btn btn-primary mb-3 mt-3"
              type="submit"
              value="Crear"
            />
          </form>
        </div>
      </div>

      <div class="col">
        <div class="p-5">
          <h5>Editar categoria</h5>
          <label class="form-label">Elija categoria</label>
          <input class="form-control" type="text" v-model="idEditar" />
          <button
            @click="cambioCategoria(idEditar)"
            class="btn btn-primary mb-3 mt-3 btn-block"
          >
            Buscar
          </button>
          <form @submit.prevent="editarCategoria()">
            <label class="form-label">Nombre</label>
            <input
              class="form-control"
              type="text"
              required
              v-model="nameEditar"
            />
            <label class="form-label">Descripción</label>
            <input
              class="form-control"
              type="text"
              v-model="descriptionEditar"
            />
            <input
              class="btn btn-primary mb-3 mt-3"
              type="submit"
              value="Editar"
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
              <th>Descripción</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in dataCategorias" :key="data.id" :value="data">
              <td>{{ data.id }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.description }}</td>
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
      nameCrear: "",
      descriptionCrear: "",
      idEditar: "",
      nameEditar: "",
      descriptionEditar: "",
      dataCategorias: [],
      error: "",
      exito: "",
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
    crearCategoria(e) {
      console.log("Crear categoria");
      console.log(e);
      var url = "http://vue-api-template.test/api/category/store";
      var nuevaCategoria = {
        name: this.nameCrear,
        description: this.descriptionCrear,
      };
      console.log(nuevaCategoria);
      axios
        .post(url, nuevaCategoria, {})
        .then((res) => {
          this.getAllCategorias();
          this.error = "";
          this.exito = "Se creo exitosamente el elemento";
          this.nameCrear = "";
          this.descriptionCrear = "";
        })
        .catch((err) => {
          this.error = "Error creando elemento: " + err.message;
          this.exito = "";
        });
    },
    editarCategoria() {
      console.log("Editar categoria");
      var url =
        "http://vue-api-template.test/api/category/" +
        this.idEditar +
        "/update";
      var editarCategoria = {
        name: this.nameEditar,
        description: this.descriptionEditar,
      };
      console.log(editarCategoria);
      axios
        .put(url, editarCategoria, {})
        .then((res) => {
          this.getAllCategorias();
          this.error = "";
          this.exito = "Se edito exitosamente el elemento";
          this.idEditar = "";
          this.nameEditar = "";
          this.descriptionEditar = "";
        })
        .catch((err) => {
          this.error = "Error creando elemento: " + err.message;
          this.exito = "";
        });
    },
    async cambioCategoria() {
      console.log("Se cambio de categoria ", this.idEditar);
      var dataCat = await this.getCategoria(this.idEditar);
      console.log("dataPost: ", dataCat);
      this.nameEditar = dataCat.name;
      this.descriptionEditar = dataCat.description;
    },
    borrar(data) {
      console.log("Borrar id: ", data);
      var url =
        "http://vue-api-template.test/api/category/" + data.id + "/destroy";
      axios
        .delete(url)
        .then((res) => {
          this.getAllCategorias();
          this.error = "";
          this.exito = "Se borró correctamente el elemento";
        })
        .catch((err) => {
          this.error = "Error borrando elemento: " + err.message;
          this.exito = "";
        });
    },

    async getCategoria(id) {
      var url = "http://vue-api-template.test/api/category/" + id + "/edit";
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

    async mounted() {
      this.getAllCategorias();
    },
  },
  mounted: function () {
    this.mounted();
  },
};
</script>

<style lang=""></style>
