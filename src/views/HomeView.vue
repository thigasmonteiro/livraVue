<template>
    <div class="borrowed-books">
      <h1>Listagem de Empréstimos</h1>
  
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Livro Emprestado</th>
            <th>Data de Devolução</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(borrower, index) in borrowers" :key="index">
            <td>{{ borrower.name }}</td>
            <td>{{ borrower.cpf }}</td>
            <td>{{ borrower.borrowedBook }}</td>
            <td>{{ borrower.returnDate }}</td>
          </tr>
        </tbody>
      </table>
  
      <form @submit.prevent="addBorrower">
        <h2>Adicionar Empréstimo</h2>
        <label for="name">Nome:</label>
        <input v-model="newBorrower.name" required style="width: 100%;">
  
        <label for="cpf">CPF:</label>
        <input v-model="newBorrower.cpf" required style="width: 100%;">
  
        <label for="borrowedBook">Livro Emprestado:</label>
        <input v-model="newBorrower.borrowedBook" required style="width: 100%;">
  
        <label for="returnDate">Data de Devolução:</label>
        <input type="date" v-model="newBorrower.returnDate" required style="width: 100%;">
  
        <button type="submit">Adicionar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const borrowers = ref([
    { name: 'João Silva', cpf: '123.456.789-00', borrowedBook: 'A Arte da Guerra', returnDate: '2023-01-31' },
    { name: 'Maria Souza', cpf: '987.654.321-00', borrowedBook: 'Dom Quixote', returnDate: '2023-02-15' },
  ]);
  
  const newBorrower = ref({
    name: '',
    cpf: '',
    borrowedBook: '',
    returnDate: '',
  });
  
  const addBorrower = () => {
    if (newBorrower.value.name && newBorrower.value.cpf && newBorrower.value.borrowedBook && newBorrower.value.returnDate) {
      borrowers.value.push({ ...newBorrower.value });
      newBorrower.value = { name: '', cpf: '', borrowedBook: '', returnDate: '' };
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: #2296F0;
  }
  .borrowed-books {
    padding: 20px;
    background-color: #2296F0;
    color:#fff ;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    color: #000000;
    font-size: 30px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 10px;
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
