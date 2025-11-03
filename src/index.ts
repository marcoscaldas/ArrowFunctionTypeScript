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


//CRUD INICIO

//ADICIONAR
const adicionarTarefa = (): void =>{
    const descricao = prompt("Digite a decrição da tarefa: ");
    if(!descricao.trim()){
        console.log('Descrição inválida!');
        return;
    }

    const novaTarefa: Tarefa = {
        id: contador++,
        descricao,
        concluida: false
    }

    tarefas.push(novaTarefa);

    salvarTarefas(tarefas);
    console.log(`Tarefa  "${descricao}" adicionada! `);
}
//adicionarTarefa();


//LISTAR
const listarTarefas = ():void =>{

    console.log("\n=== Lista de Tarefas===");
    if(tarefas.length === 0){
        console.log('Nenhum tarefa encontrada.');
        return;
    }

    tarefas.forEach( (t) =>{
        console.log(`[${t.concluida ? "X" : " "}] ${t.id} - ${t.descricao}`);
    });    
}

//listarTarefas();



//CONCLUIR

const concluirTarefa = (): void =>{ 

    const id = Number(prompt("Digite o ID da tarefa para concluir: "));
    const tarefa = tarefas.find((t) => t.id === id);

    if(!tarefa){

        console.log('Tarefa não encontrada! ');
        return;
    }

    if(!tarefa.concluida){
        tarefa.concluida = true;

        salvarTarefas(tarefas);
        console.log(`Tarefa ${tarefa.descricao} concluída`);
    }else{
        console.log(`Tarefa ${tarefa.descricao} já está concluída`);
    }

}
//concluirTarefa()


//REMOVER
const removerTarefa = (): void =>{

     const id = Number(prompt("Digite o ID da tarefa para remover: ")); 
     const antes = tarefas.length;
     tarefas = tarefas.filter( (t) => t.id !== id);

     if(tarefas.length === antes){
        console.log('nenhuma terefa foi removida! ')
     }else{

        salvarTarefas(tarefas);
        console.log(`Tarefa removida (ID ${id})`);
     }
}
//removerTarefa()

//MENU

const exibirMenu = (): void =>{
    console.log(`
    =============================
        GERENCIADOR DE TAREFAS
    =============================
    1 - ADICIONAR
    2 - LISTAR 
    3 - CONCLUIR
    4 - REMOVER
    0 - SAIR        
    `);
}
//exibirMenu();

const iniciar = (): void =>{

    let opcao: string;

    do{
        exibirMenu();
        opcao = prompt('Escolha uma opção: ')

        switch(opcao){

            case "1":
            adicionarTarefa();
            break;

            case "2":
            listarTarefas();
            break;

            case "3":
            listarTarefas();
            concluirTarefa();
            break;

            case "4":
            listarTarefas();
            removerTarefa();
            break;

            case "0":
            console.log('Saindo...');
            break;

            default:
            console.log('Opção inválida!')
            break;
        }        
    }while (opcao !== '0')
}

iniciar();