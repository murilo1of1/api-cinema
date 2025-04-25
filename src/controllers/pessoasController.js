const pessoas = [
    { id: 1, nome: "Ana", idade: 25 },
    { id: 2, nome: "Bruno", idade: 30 },
    { id: 3, nome: "Carla", idade: 22 },
    { id: 4, nome: "Diego", idade: 28 },
    { id: 5, nome: "Eduarda", idade: 26 },
    { id: 6, nome: "Felipe", idade: 33 },
    { id: 7, nome: "Giovana", idade: 24 },
    { id: 8, nome: "Henrique", idade: 27 },
    { id: 9, nome: "Isabela", idade: 29 },
    { id: 10, nome: "João ", idade: 31 }
  ];

const getAll = (req, res) => {
    const {idade} = req.query;

    if(idade) {
        const idadeN = parseInt(idade);
        const filtradas = pessoas.filter(p => p.idade === idadeN);
        return res.status(200).json(filtradas);
    }

    return res.status(200).json(pessoas);
}

const getId = (req, res) => {
    const {id} = req.params;
    const idN = parseInt(id);

    const pessoa = pessoas.find(p => p.id === idN);

    if(!pessoa) {
        return res.status(404).json({
            erro : "pessoa nao encontrada"
        });
    }

    return res.status(200).json(pessoa);
}

const getMaioridade = (req, res) => {
    const { nome } = req.body;
    const { idade } = req.params;

    const idadeNumero = parseInt(idade, 10);
    
    if (!nome || isNaN(idadeNumero)) {
        return res.status(400).json({ error: "Nome ou idade inválidos." });
    }

    const deMaior = idadeNumero >= 18;

    return res.status(200).json({
        nome,
        idade: idadeNumero,
        deMaior
    });
}

export default {
    pessoas,
    getAll,
    getId,
    getMaioridade, 
}