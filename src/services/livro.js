import api from '../plugins/api'

class LivroService {
  async getAllLivros() {
    const response = await api.get('/livro/')
    return response.data
  }
  async saveLivro(livro) {
    let response
    if (livro.id) {
      response = await api.put(`/livro/${livro.id}/`, livro)
    } else {
      response = await api.post('/livro/', livro)
    }
    return response.data
  }
  async deleteLivro(livro) {
    const response = await api.delete(`/livro/${livro.id}/`)
    return response.data
  }
}

export default new LivroService()