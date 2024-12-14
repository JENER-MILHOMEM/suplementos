export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    precoDesconto?: number;
    categoria: 'proteina' | 'creatina' | 'termogenico';
    imagem: string;
  }
  
  export const produtos: Produto[] = [
    {
      id: '1',
      nome: 'Whey Protein Isolado',
      descricao: 'Proteína de alta qualidade para crescimento muscular',
      preco: 159.99,
      precoDesconto: 139.99,
      categoria: 'proteina',
      imagem: 'https://cdn.awsli.com.br/600x700/488/488434/produto/42764883/8c7fc1a374.jpg',
    },
    {
      id: '2',
      nome: 'Creatina Monohidratada',
      descricao: 'Aumente força e desempenho muscular',
      preco: 89.99,
      categoria: 'creatina',
      imagem: 'https://cdn.awsli.com.br/600x700/488/488434/produto/42764883/8c7fc1a374.jpg',
    },
    {
      id: '3',
      nome: 'Termogênico Fat Burner',
      descricao: 'Melhore o metabolismo e a queima de gordura',
      preco: 99.99,
      precoDesconto: 89.99,
      categoria: 'termogenico',
      imagem: 'https://cdn.awsli.com.br/600x700/488/488434/produto/42764883/8c7fc1a374.jpg',
    },
    {
      id: '4',
      nome: 'Proteína Caseína',
      descricao: 'Proteína de liberação lenta para recuperação noturna',
      preco: 149.99,
      categoria: 'proteina',
      imagem: 'https://cdn.awsli.com.br/600x700/488/488434/produto/42764883/8c7fc1a374.jpg',
    },
    {
      id: '5',
      nome: 'Creatina HCL',
      descricao: 'Creatina avançada para melhor absorção',
      preco: 109.99,
      precoDesconto: 99.99,
      categoria: 'creatina',
      imagem: 'https://cdn.awsli.com.br/600x700/488/488434/produto/42764883/8c7fc1a374.jpg',
    },
    {
      id: '6',
      nome: 'Termogênico Natural',
      descricao: 'Acelerador de metabolismo à base de plantas',
      preco: 119.99,
      categoria: 'termogenico',
      imagem: 'https://cdn.awsli.com.br/600x700/488/488434/produto/42764883/8c7fc1a374.jpg',
    },
  ];
  
  