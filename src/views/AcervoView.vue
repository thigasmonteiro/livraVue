<script setup>
import { ref, reactive, onMounted } from 'vue'

import Loading from 'vue-loading-overlay'
import LivroService from '../services/livro'
import imageService from '../services/images.js'
import CategoriaService from '../services/categorias'
import EditoraService from '../services/editoras'

const coverUrl = ref('')
const file = ref(null)
const livros = ref([])
const categorias = ref([])
const editoras = ref([])
const isLoading = ref(false)

const currentLivro = reactive({
  titulo: '',
  isbn: '',
  categoria: '',
  editora: ''
})

const currentCategoria = reactive({
  descricao: ''
})

const currentEditora = reactive({
  nome: '',
  site: ''
})

function onFileChange(e) {
  file.value = e.target.files[0]
  coverUrl.value = URL.createObjectURL(file.value)
}

onMounted(async () => {
  isLoading.value = true
  const data = await LivroService.getAllLivros()
  livros.value = data
  isLoading.value = false
})
onMounted(async () => {
  const data = await CategoriaService.getAllCategorias()
  categorias.value = data
})
onMounted(async () => {
  const data = await EditoraService.getAllEditoras()
  editoras.value = data
})

async function save() {
  isLoading.value = true
  const image = await imageService.uploadImage(file.value)
  currentLivro.capa_attachment_key = image.attachment_key
  await LivroService.saveLivro(currentLivro)
  Object.assign(currentLivro, {
    titulo: '',
    isbn: '',
    categoria: '',
    editora: ''
  })
  const data = await LivroService.getAllLivros()
  livros.value = data
  isLoading.value = false
}

async function saveCategoria() {
  isLoading.value = true
  await CategoriaService.saveCategoria(currentCategoria)
  Object.assign(currentCategoria, {
    descricao: ''
  })
  const data = await CategoriaService.getAllCategorias()
  categorias.value = data
  isLoading.value = false
}

async function saveEditora() {
  isLoading.value = true
  await EditoraService.saveEditora(currentEditora)
  Object.assign(currentEditora, {
    nome: '',
    site: ''
  })

  const data = await EditoraService.getAllEditoras()
  editoras.value = data
  isLoading.value = false
}

async function deleteLivro(livro) {
  isLoading.value = true
  await LivroService.deleteLivro(livro)
  const data = await LivroService.getAllLivros()
  livros.value = data
  isLoading.value = false
}

function editLivro(livro) {
  currentLivro.value = { ...livro }
}
</script>

<template>
  <Loading v-model:active="isLoading" is-full-page class="loading" />
  <div class="main">
    <div class="bookform">
      <form @submit.prevent="save">
        <input v-model="currentLivro.titulo" placeholder="Titulo" />
        <input v-model="currentLivro.isbn" type="number" placeholder="ISBN" />
        <select v-model="currentLivro.categoria">
          <option disabled value="">Selecione a Categoria</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.descricao }}
          </option>
        </select>
        <select v-bind="currentLivro.categoria">
          <option disabled value="">Selecione a Categoria</option>
          <option v-for="editora in editoras" :key="editora.id" :value="editora.id">
            {{ editora.nome + ' - ' + editora.site }}
          </option>
        </select>
        <input type="file" @change="onFileChange" accept="image/png, image/jpeg">
        <button type="submit">Salvar</button>
      </form>

      <h1 class="Title">Livros no Acervo</h1>
      <div class="bookWeek">
        <div v-for="livro in livros" :key="livro.id" class="bookBox">
          <img class="bookPic" v-bind:src="livro.capa.url" alt="fotoLivro" />
          <p class="bookTitle">{{ livro.titulo }}</p>
          <p class="bookGenre">{{ livro.isbn }}</p>
          <p class="bookGenre">{{ livro.editora }}</p>
          <p class="bookAuthor">{{ livro.categoria }}</p>
          <button @click="deleteLivro(livro)">Deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  color: white;
}
input,
select {
  padding: 2%;
}

button {
  padding: 2%;
  background-color: #f89c3c;
  margin-top: 10% !important;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  padding: 2%;
  background-color: #c27c31;
  transition: all 0.2s ease-in-out;
  margin-top: 10% !important;
  color: white;
  border: none;
  cursor: pointer;
}

.select-label {
  margin-bottom: 1%;
  color: white;
}
.file-input {
  padding-left: 20%;
}
#preview {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.autor {
  display: flex;
  align-items: normal !important;
}
.input-col {
  display: flex;
  flex-direction: column;
  margin-right: 5%;
  width: 25%;
  padding-bottom: 2%;
}
.img {
  width: 100%;
  aspect-ratio: 6/8;
}
.cover {
  max-width: 60%;
  aspect-ratio: 6/8;
}
.form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.form-col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  justify-content: space-between;
}
input {
  margin-top: 1%;
}
button {
  margin-top: 1%;
}
.bookform {
  margin-top: 2%;
  padding: 1% 15%;
  background-color: #0b5394;
  margin-bottom: 2%;
}
.Title {
  margin-left: 15%;
  margin-top: 2%;
}
.bookBox {
  width: 15%;
  box-shadow: 1px 2px 5px 1px gray;
  display: flex;
  flex-direction: column;
  padding: 1%;
  background-color: #f1f1f1;
  border-radius: 1vh;
  margin-bottom: 2%;
}
.hero {
  width: 100%;
}
.heroImg {
  width: 100%;
}

.bookPic {
  width: 100%;
  aspect-ratio: 6/8;
  outline: 1px solid black;
}
.bookTitle {
  font-size: large;
  font-weight: bold;
}
.bookGenre,
.bookAuthor {
  opacity: 80%;
  line-height: 1%;
}
.main {
  width: 100%;
}
.bookWeek {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0% 15%;
  gap: 5%;
}
</style>
