import promptSync from "prompt-sync";
import fs from 'fs';

const prompt = promptSync();

//TIPAGEM
type Tarefa = {
    id: number;
    descricao: string;
    concluida: boolean;
}

//CAMINHO DO ARQUIVO JSON
const caminhoArquivo = "./tarefas.json";

// FUNCOES UTILITARIAS
const carregarTarefas = (): Tarefa[] => {
    try {
        const dados = fs.readFileSync(caminhoArquivo, "utf-8");
        return JSON.parse(dados);
        
    } catch (error) {
        console.error("Erro ao carregar tarefas, iniciando lista vazia...");
        return [];
    }
}


const salvarTarefas = (tarefas: Tarefa[]):void =>{
    try {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(tarefas, null, 2));       
        
    } catch (error) {
        console.error("Erro ao salvar as tarefas!")
    }
}

//DADOS
let tarefas: Tarefa[] = carregarTarefas();
let contador = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;


