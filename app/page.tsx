'use client'
import { useState } from 'react'

export default function Home() {
  const [produtos, setProdutos] = useState<{nome: string, qtd: number}[]>([])
  const [nome, setNome] = useState('')
  const [qtd, setQtd] = useState('')

  const adicionar = () => {
    if(nome && qtd) {
      setProdutos([...produtos, {nome, qtd: Number(qtd)}])
      setNome('')
      setQtd('')
    }
  }

  return (
    <main style={{padding: '20px'}}>
      <h1>Controle de Estoque</h1>
      <input 
        placeholder="Nome do produto" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        style={{margin: '5px', padding: '8px'}}
      />
      <input 
        placeholder="Quantidade" 
        type="number"
        value={qtd} 
        onChange={(e) => setQtd(e.target.value)} 
        style={{margin: '5px', padding: '8px'}}
      />
      <button onClick={adicionar} style={{margin: '5px', padding: '8px 16px'}}>Adicionar</button>
      
      <ul>
        {produtos.map((p, i) => (
          <li key={i}>{p.nome} - {p.qtd}</li>
        ))}
      </ul>
    </main>
  )
}
