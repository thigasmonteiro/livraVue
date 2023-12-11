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
      <!-- Formulário para adicionar livros -->
      <div class="form">
        <form @submit.prevent="save">
          <div class="form-col">
            <div class="input-col">
              <label for="titulo">Título:</label>
              <input v-model="currentLivro.titulo" placeholder="Título" />
            </div>
            <div class="input-col">
              <label for="isbn">ISBN:</label>
              <input v-model="currentLivro.isbn" type="number" placeholder="ISBN" />
            </div>
            <div class="input-col">
              <label for="categoria">Categoria:</label>
              <select v-model="currentLivro.categoria">
                <option disabled value="">Selecione a Categoria</option>
                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                  {{ categoria.descricao }}
                </option>
              </select>
            </div>
            <div class="input-col">
              <label for="editora">Editora:</label>
              <select v-model="currentLivro.editora">
                <option disabled value="">Selecione a Editora</option>
                <option v-for="editora in editoras" :key="editora.id" :value="editora.id">
                  {{ editora.nome + ' - ' + editora.site }}
                </option>
              </select>
            </div>
            <div class="input-col file-input">
              <label for="capa">Capa:</label>
              <input type="file" @change="onFileChange" accept="image/png, image/jpeg">
            </div>
          </div>
          <div id="preview" v-if="coverUrl">
            <img class="cover" :src="coverUrl" alt="Preview da Capa" />
          </div>
          <div class="button-row">
            <button type="submit" class="save-button">Salvar Livro</button>
          </div>
        </form>
      </div>

      <!-- Formulário para adicionar categorias -->
      <div class="form">
        <form @submit.prevent="saveCategoria">
          <div class="input-col">
            <label for="descricao">Descrição da Categoria:</label>
            <input v-model="currentCategoria.descricao" placeholder="Descrição" />
          </div>
          <div class="button-row">
            <button type="submit" class="save-button">Salvar Categoria</button>
          </div>
        </form>
      </div>

      <!-- Formulário para adicionar editoras -->
      <div class="form">
        <form @submit.prevent="saveEditora">
          <div class="input-col">
            <label for="nome">Nome da Editora:</label>
            <input v-model="currentEditora.nome" placeholder="Nome" />
          </div>
          <div class="input-col">
            <label for="site">Site da Editora:</label>
            <input v-model="currentEditora.site" type="url" placeholder="Site" />
          </div>
          <div class="button-row">
            <button type="submit" class="save-button">Salvar Editora</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Lista de livros -->
    <h1 class="Title">Livros no Estoque</h1>
    <div class="bookWeek">
      <div v-for="livro in livros" :key="livro.id" class="bookBox">
        <img class="bookPic" :src="livro.capa.url" alt="Foto do Livro" />
        <p class="bookTitle">{{ livro.titulo }}</p>
        <p class="bookGenre">{{ livro.isbn }}</p>
        <p class="bookGenre">{{ livro.editora }}</p>
        <p class="bookAuthor">{{ livro.categoria }}</p>
        <div class="button-row">
          <button @click="deleteLivro(livro)" class="delete-button">Deletar Livro</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-col {
  margin-bottom: 1.5rem;
  color:#fff;
  font-size: 20px;
  font-weight: bold;
}

input,
select {
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  margin: 5px;

}

.button-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 20px;
}

button {
  padding: 1rem;
  background-color: #f89c3c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

button:hover {
  background-color: #000000;
  transition: all 0.2s ease-in-out;
  
}

.bookform {
  padding: 2% 15%;
  background-color: #0b5394;
  margin-bottom: 2%;
}

.Title {
  margin-left: 15%;
  margin-top: 2%;
  color: white;
}

.bookBox {
  width: 15%;
  box-shadow: 1px 2px 5px 1px gray;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #f1f1f1;
  border-radius: 1.5vh;
  margin-bottom: 2%;
}

.bookPic {
  width: 100%;
  aspect-ratio: 6/8;
  outline: 1px solid black;
}

.cover {
  max-width: 100%;
  aspect-ratio: 6/8;
}

.main {
  width: 100%;
}

.bookWeek {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0% 15%;
  gap: 2%;
}
</style>
