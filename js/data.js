// Dados das acomodações. Para trocar/adicionar fotos: coloque os arquivos em img/<slug>/ e ajuste "fotos".
window.SITE = {
  whatsapp: "5512997197509",
  whatsappLabel: "(12) 99719-7509",
  whatsapp2: "5512981084618",
  whatsapp2Label: "(12) 98108-4618",
  telefone: "(12) 3832-3661",
  email: "celiolocacoes@hotmail.com",
  instagram: "ubatuba_celiolocacoes",
};

// tipo: casa | apto | kitnet
// extras: itens exibidos no card · capa: fotos de destaque (a primeira é a capa do card; as fotos já estão ordenadas da melhor para a pior)
window.ACOMODACOES = [
  { slug: "aconchego", nome: "Aconchego", tipo: "casa", destaque: "Casa com piscina", quartos: "13 suítes", pessoas: 50, local: "Praia Grande", extras: ["Piscina", "Churrasqueira"], fotos: 13, capa: [1, 2, 3] },
  { slug: "nosso-lar", nome: "Nosso Lar", tipo: "casa", destaque: "Casa para grupos", quartos: "10 suítes", pessoas: 50, local: "Praia Grande", extras: [], fotos: 12, capa: [1, 2, 3] },
  { slug: "mar-azul", nome: "Mar Azul", tipo: "casa", destaque: "Casa para grupos", quartos: "8 suítes", pessoas: 50, local: "Praia Grande", extras: [], fotos: 11, capa: [1, 2, 3] },
  { slug: "sonho-meu", nome: "Sonho Meu", tipo: "casa", destaque: "Casa com piscina", quartos: "12 quartos", pessoas: 50, local: "Praia Grande", extras: ["Piscina"], fotos: 16, capa: [1, 2, 3] },
  { slug: "casa-bela", nome: "Casa Bela", tipo: "casa", destaque: "Casa com piscina", quartos: "6 quartos", pessoas: 30, local: "Praia Grande", extras: ["Piscina", "Ar-condicionado"], fotos: 29, capa: [1, 2, 3] },
  { slug: "recanto-do-sol", nome: "Recanto do Sol", tipo: "casa", destaque: "Casa com piscina", quartos: "5 quartos", pessoas: 30, local: "Praia Grande", extras: ["Piscina", "Ar-condicionado"], fotos: 15, capa: [1, 2, 3] },
  { slug: "tijolinho", nome: "Tijolinho", tipo: "casa", destaque: "Casa a 100 m do mar", quartos: "5 quartos", pessoas: 25, local: "Praia Grande", extras: [], fotos: 16, capa: [1, 2, 3] },
  { slug: "nosso-recanto", nome: "Nosso Recanto", tipo: "casa", destaque: "Casa com piscina", quartos: "5 quartos", pessoas: 22, local: "Entre Tenório e Praia Grande", extras: ["Piscina", "Ar-condicionado"], fotos: 12, capa: [1, 2, 3] },
  { slug: "dois-irmaos-4q", nome: "Dois Irmãos", variante: "4 quartos", tipo: "casa", destaque: "Casa", quartos: "4 quartos · 3 banheiros", pessoas: 18, local: "Praia Grande", extras: [], fotos: 11, capa: [1, 2, 3] },
  { slug: "turquesa", nome: "Turquesa", tipo: "apto", destaque: "Apartamento", quartos: "2 quartos · 2 banheiros", pessoas: 10, local: "Praia Grande", extras: [], fotos: 12, capa: [1, 2, 3] },
  { slug: "dois-irmaos-2q", nome: "Dois Irmãos", variante: "2 quartos", tipo: "apto", destaque: "Apartamento a 100 m da praia", quartos: "2 quartos · 2 banheiros", pessoas: 8, local: "Praia Grande", extras: [], fotos: 6, capa: [1, 2, 3] },
  { slug: "caminho-do-mar-2q", nome: "Caminho do Mar", variante: "2 quartos", tipo: "apto", destaque: "Apartamento", quartos: "2 quartos · 2 banheiros", pessoas: 8, local: "Entre Tenório e Praia Grande · 100 m", extras: [], fotos: 18, capa: [1, 2, 3] },
  { slug: "apoema", nome: "Residencial Apoema", tipo: "apto", destaque: "Apartamento vista mar", quartos: "3 suítes", pessoas: 8, local: "Centro", extras: ["Vista mar", "Ar-condicionado"], fotos: 17, capa: [1, 2, 3] },
  { slug: "dois-irmaos-kitnet", nome: "Dois Irmãos", variante: "Kitnet", tipo: "kitnet", destaque: "Kitnet", quartos: "Quarto, banheiro e cozinha", pessoas: 4, local: "Praia Grande", extras: ["Ar-condicionado"], fotos: 3, capa: [1, 2, 3] },
  { slug: "caminho-do-mar-kitnet", nome: "Caminho do Mar", variante: "Kitnet", tipo: "kitnet", destaque: "Kitnet", quartos: "Kitnet", pessoas: 4, local: "Entre Tenório e Praia Grande · 100 m", extras: [], fotos: 18, capa: [1, 2, 3] },
];

// Depoimentos. Troque os exemplos pelos depoimentos reais dos hóspedes (e remova "exemplo: true").
window.DEPOIMENTOS = [
  { exemplo: true, nome: "Nome do hóspede", cidade: "Cidade", casa: "Aconchego", texto: "Casa espaçosa, bem localizada e perfeita para reunir a família toda. O atendimento do proprietário foi rápido e sem complicação." },
  { exemplo: true, nome: "Nome do hóspede", cidade: "Cidade", casa: "Turquesa", texto: "Apartamento limpo e confortável, a poucos passos da praia. Reservar direto pelo WhatsApp foi simples e prático." },
  { exemplo: true, nome: "Nome do hóspede", cidade: "Cidade", casa: "Nosso Recanto", texto: "Fomos em grupo grande e coube todo mundo com conforto. A piscina fez a diferença. Pretendemos voltar na próxima temporada." }
];
