<script setup></script>

<template>
  <header>
    <nav>
      <div class="nav-container">
        <div class="nav-logo">
          <img class="logo" src="./assets/imgs/biblioteca-sa-corredor.jpg" alt="Logo">
        </div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/acervo">Estoque</router-link>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Pesquisar...">
          <button type="button">Buscar</button>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  margin-right: 1rem;
}

.logo {
  width: 80px;
}

.nav-links {
  display: flex;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 0 1.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
}

input {
  padding: 1rem;
  border: none;
  border-radius: 3px;
  margin-right: 1rem;
  width: 300px;
}

button {
  background-color: #3498db;
  color: #ecf0f1;
  border: none;
  padding: 1rem;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
