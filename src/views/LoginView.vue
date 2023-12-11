<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="username">Usuário:</label>
          <input v-model="username" type="text" required>
  
          <label for="password">Senha:</label>
          <input v-model="password" type="password" required>
  
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const username = ref('');
  const password = ref('');
  
  const login = () => {
    // Simulação de autenticação
    if (username.value === 'admin' && password.value === 'password') {
      store.commit('login', username.value);
      router.push('/dashboard'); // Redireciona para a rota protegida
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  