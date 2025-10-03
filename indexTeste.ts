import promptSync from "prompt-sync";
const prompt = promptSync();

interface IEscolha {
    texto: string;
    proximaPagina: number;
}

interface IPagina {
    id: number;
    texto: string;
    escolhas: IEscolha[];
    executar(): void;
}

//Página base para herança
abstract class PaginaBase implements IPagina {
    constructor(
        public id: number,
        public texto: string,
        public escolhas: IEscolha[] = []

    ) { }

    abstract executar(): void;

    protected mostrarEscolhas(): void {
        console.log("\n--- Suas Opções ---");
        this.escolhas.forEach((escolha, index) => {
            console.log(`${index + 1}. ${escolha.texto}`);
        });
    }
}

//Item que se adiquire
class Item {
    constructor(
        public nome: string,
        public descricao: string
    ) { }
    usar(): void {
        console.log(`Usando item: ${this.nome}`);
    };
}

//Seu personagem
class Personagem {
    constructor(
        public nome: string,
        public vida: number,
        public ataque: number,
        public Item: number,
        public inventario: Inventario = new Inventario()
    ) {
        ;
    }
}


//----------------  FRASES DO JOGO   -----------------



//Página de batalha onde o personagem enfrenra um inimigo
class PaginaBatalha extends PaginaBase {
    constructor(
        id: number,
        texto: string,
        escolhas: IEscolha[],
        public inimigo: Personagem,
        public recompensa: Item[]
    ) {
        super(id, texto, escolhas);
    }

    executar(): void {
        console.log(`Enfrentando: ${this.inimigo}!`);
        // Sistema de batalha aqui!
    }
}

//Inventário do personagem


class Inventario {
    private itens: Item[] = [];

    adicionarItem(item: Item): void {
        this.itens.push(item);
        console.log(`${item.nome} adicionado ao inventário!`);
    }

    usarItem(nome: string): boolean {

        const itemIndex = this.itens.findIndex(item => item.nome === nome);


        if (itemIndex > -1) {
            this.itens[itemIndex]?.usar();
            this.itens.splice(itemIndex, 1);
            return true;
        }
        return false;
    }
}


//Pagina exploração onde o personagem faz escolhas
class PaginaExploracao extends PaginaBase {
    constructor(
        id: number,
        texto: string,
        escolhas: IEscolha[]
    ) {
        super(id, texto, escolhas);
    }
    executar(): void {
        console.log(this.texto);
        this.mostrarEscolhas();
    }
}

//-----------------PAGINAS DO LIVRO-----------------
// ---------------- FLORESTA ----------------
const pagina1 = new PaginaExploracao(
    1,
    "Você está na Floresta de Fangorn. Árvores ancestrais sussurram segredos...",
    [
        { texto:  "Seguir o som da água", proximaPagina: 2 },
        { texto: "Investigar os sussurros", proximaPagina: 15 },
        { texto: "Descansar sob a grande árvore", proximaPagina: 7 }
    ]
);

const pagina2 = new PaginaExploracao(
    2,
    "Você encontra um riacho cristalino. A água parece esconder algo mágico...",
    [
        { texto: "Adentrar na água para procurar", proximaPagina: 3 },
        { texto: "Seguir o riacho", proximaPagina: 4 },
        { texto: "Voltar para a floresta", proximaPagina: 1 }
    ]
);

const pagina3 = new PaginaExploracao(
    3,
    "Ao entrar na água, você é sugado por uma correnteza mágica que o leva a um reino subaquático...",
    [
        { texto: "Explorar o reino subaquático", proximaPagina: 5 },
        { texto: "Tentar voltar para a superfície", proximaPagina: 6 }
    ]
);

const pagina4 = new PaginaExploracao(
    4,
    "Seguindo o riacho, você encontra uma ponte antiga que leva a um castelo abandonado...",
    [
        { texto: "Explorar o castelo", proximaPagina: 8 },
        { texto: "Voltar para a floresta", proximaPagina: 1 }
    ]
);

// ---------------- REINO SUBAQUÁTICO ----------------
const recompensaReinoSubaquatico: Item[] = [
    new Item("Escama de sereia", "Permite respirar debaixo d'água por 1 hora"),
    new Item("Tridente de Poder", "Aumenta o ataque em 10 pontos")
];

const pagina5 = new PaginaExploracao(
    5,
    "No reino subaquático, você encontra sereias gentis, que lhe dão um item mágico que te possibilita respirar debaixo d'água e um tridente de poder.",
    [
        { texto: "Agradecer e voltar para a Grande Árvore com a permissão das sereias", proximaPagina: 7 },
        { texto: "Tentar voltar para a superfície", proximaPagina: 6 }
    ]
);

const pagina6 = new PaginaExploracao(
    6,
    "Você tenta voltar para a superfície, mas por não ser grato com as sereias, você acaba se perdendo e morrendo afogado.",
    []
);

// ---------------- ELFOS ----------------

const recompensaElfo: Item[] = [
    new Item("Poção de Vida", "Restaura 20 pontos de vida"),
    new Item("Elixir de Força", "Aumenta o ataque em 5 pontos por 10 minutos")
];

const pagina7Batalha = new PaginaBatalha(
    7,
    "Você decide lutar contra os elfos, mas eles são muitos e você acaba sendo dominado e capturado.",
    [
        { texto: "Tentar fugir", proximaPagina: 9 },
        { texto: "Aceitar o destino e esperar o que vai acontecer", proximaPagina: 12 }
    ],
    new Personagem("Elfo Guerreiro", 50, 15, 0),
    recompensaElfo
);

const pagina7 = new PaginaExploracao(
    7,
    "Após um breve descanso, você acorda com luzes em seu rosto. São elfos, e eles estão tentando descobrir quem você é.",
    [
        { texto: "Lutar contra os elfos", proximaPagina: pagina7Batalha.id },
        { texto: "Manter a calma e deixar que o revistem e interroguem", proximaPagina: 11 },
        { texto: "Tentar fugir", proximaPagina: 9 }
    ]
);

const pagina9 = new PaginaExploracao(
    9,
    "Você decide fugir dos elfos, mas no meio do caminho você tropeça e se machuca. Porém, avista uma vila próxima e também um castelo.",
    [
        { texto: "Ir para a vila", proximaPagina: 10 },
        { texto: "Ir para o castelo", proximaPagina: 8 }
    ]
);

//---------------- VILA ----------------
const pagina10 = new PaginaExploracao(
    10,
    "Você decide investigar a vila. Lá encontra uma população de reptilianos. Em busca de abrigo, você descobre que há um mago muito sábio na vila.",
    [
        { texto: "Ir atrás do mago", proximaPagina: 21 },
        { texto: "Apenas passar a noite", proximaPagina: 22 }
    ]
);

const pagina11 = new PaginaExploracao(
    11,
    "Você decide manter a calma, mas durante a noite, em um acampamento próximo, você escuta barulhos estranhos e vê olhos brilhantes na escuridão. São lobisomens que te atacam!",
    [
        { texto: "Lutar contra os lobisomens", proximaPagina: 13 }
    ]
);

const pagina12 = new PaginaExploracao(
    12,
    "Você é levado até a vila dos reptilianos, onde é apresentado ao mago Valemor. Ele lhe oferece duas opções: resolver um enigma ou ser banido da vila.",
    [
        { texto: "Aceitar o desafio do enigma", proximaPagina: 21 },
        { texto: "Recusar e ser banido", proximaPagina: 23 }
    ]
);

const pagina13 = new PaginaBatalha(
    13,
    "Você decide lutar contra o lobisomem!",
    [
        { texto: "Lutar com todas as suas forças", proximaPagina: 14 }
    ],
    new Personagem("Lobisomem", 60, 20, 0),
    [new Item("Dente de Lobisomem", "Amuleto de proteção contra criaturas meio-animais")]
);

const pagina14 = new PaginaExploracao(
    14,
    "Você derrota o lobisomem e arranca um dente dele, que pode ser usado como amuleto de proteção contra criaturas meio-animais.",
    [
        { texto: "Continuar sua jornada para o castelo", proximaPagina: 8 }
    ]
);

const pagina15 = new PaginaExploracao(
    15,
    "Após investigar os sussurros, você percebe que eles o alertavam sobre um grande perigo. As vozes o guiam até uma pequena vila coberta de neblina.",
    [
        { texto: "Investigar a vila e passar a noite", proximaPagina: 10 },
        { texto: "Armar um acampamento próximo à vila", proximaPagina: 11 },
        { texto: "Seguir seu próprio caminho, ignorando as vozes", proximaPagina: 9 }
    ]
);

// ---------------- CASTELO ----------------
const pagina8 = new PaginaExploracao(
    8,
    "Você chega ao castelo e encontra um Orc Gigante que está protegendo um anel misterioso...",
    [
         { texto: "Explorar o castelo para achar armas", proximaPagina: 20 },
         { texto: "Lutar contra o Orc Gigante", proximaPagina: 18 },
         { texto: "Tentar roubar o anel sem ele ver", proximaPagina: 19 }
    ]
);

const pagina18 = new PaginaExploracao(
    18,
    "Você derrota o Orc Gigante e ganha o anel de poder. O anel fala com você...",
    [
        { texto: "Colocar o anel e ver o que acontece", proximaPagina: 16 },
        { texto: "Guardar o anel e continuar a aventura", proximaPagina: 17 }
    ]
);

const pagina19 = new PaginaExploracao(
    19,
    "Você tenta roubar o anel sem que o Orc perceba, mas ele escuta um barulho, encontra você e te acerta uma paulada fatal.",
    []
);

const pagina20 = new PaginaExploracao(
    20,
    "Explorando o castelo, você encontra uma sala de armas. Lá, pega uma espada mágica que brilha com uma luz azul.",
    [
        { texto: "Continuar a aventura pelo castelo", proximaPagina: 8 }
    ]
);

const pagina16 = new PaginaExploracao(
    16,
    "Você coloca o anel. Ele exige que você vá até a Terra do Fogo, onde encontrará um exército à sua disposição. Você tenta resistir, mas é impossível.",
    [
        { texto: "Ir para a Terra do Fogo", proximaPagina: 29 }
    ]
);

const pagina17 = new PaginaExploracao(
    17,
    "Você guarda o anel e continua sua aventura. No corpo do Orc Gigante, encontra um mapa para a Terra do Fogo.",
    [
        { texto: "Seguir o mapa para a Terra do Fogo", proximaPagina: 30 }
    ]
);

// ---------------- MAGO ----------------
const pagina21 = new PaginaExploracao(
    21,
    "O mago Valemor coloca à sua frente quatro portas: A, B, C e D. Cada porta tem uma placa com uma frase. Ele declara: 'Exatamente uma destas placas diz a verdade. Abra a porta segura — se errar, morrerá.'",
    [
        { texto: "Aceitar e correr o risco", proximaPagina: 24 },
        { texto: "Recusar", proximaPagina: 23 }
    ]
);

const pagina22 = new PaginaExploracao(
    22,
    "voce passa a noite e ao amanhecer, você se despede dos reptilianos e continua sua aventura para o castelo.",
    [
        { texto: "Seguir para o castelo", proximaPagina: 8 }
    ]
);

const pagina23 = new PaginaExploracao(
    23,
    "Você recusa o desafio do mago e é banido da vila. Vagando pela floresta, acaba encontrando a Terra do Fogo.",
    [
        { texto: "Seguir para a Terra do Fogo", proximaPagina: 30 }
    ]
);

const pagina24 = new PaginaExploracao(
    24,
    "O mago dá uma dica: 'Teste cada possibilidade e conte quantas placas ficariam verdadeiras.'",
    [
        { texto: "Porta A: 'A porta segura é A'", proximaPagina: 25 },
        { texto: "Porta B: 'A porta segura é B'", proximaPagina: 26 },
        { texto: "Porta C: 'A porta segura é C'", proximaPagina: 27 },
        { texto: "Porta D: 'A porta segura é A ou B'", proximaPagina: 28 }
    ]
);

const pagina25 = new PaginaExploracao(
    25,
    "Você escolheu a porta A. Ao abri-la, encontra um poço sem fundo e cai nele para sempre.",
    []
);

const pagina26 = new PaginaExploracao(
    26,
    "Você escolheu a porta B. Ao abri-la, encontra um dragão adormecido que acorda e o devora.",
    []
);

const pagina27 = new PaginaExploracao(
    27,
    "Você escolheu a porta C. Dentro dela, encontra um tesouro escondido. O mago parabeniza sua sabedoria e lhe dá a Varinha do Gelo.",
    [
        { texto: "Agradecer e continuar a aventura para o castelo", proximaPagina: 8 }
    ]
);

const pagina28 = new PaginaExploracao(
    28,
    "Você escolheu a porta D. Ao abri-la, ativa uma armadilha mortal e morre instantaneamente.",
    []
);

// ---------------- TERRA DO FOGO ----------------

const pagina29 = new PaginaExploracao(
    29,
    "Na Terra do Fogo, você encontra um exército de criaturas prontas para obedecê-lo. O anel começa a brilhar intensamente e sua cabeça começa a doer. Ele manda você conquistar toda a Terra-Média fazendo imensos massacres. Você tenta resistir, mas é impossível.",
    [
        { texto: "Cumprir as ordens do anel e conquistar a Terra-Média", proximaPagina: 32 }
    ]
);

const pagina30 = new PaginaExploracao(
    30,
    "Na Terra do Fogo, você encontra um exército de criaturas infurecidas. Você observa que existe um conjunto de elfos e anões lutando contra eles, comandados por um grande mago.",
    [
        { texto: "Ajudar os elfos e anões na batalha", proximaPagina: 31 },
        { texto: "Ignorar e ir embora", proximaPagina: 35 }
    ]
);

const pagina31 = new PaginaBatalha(
    31,
    "Você decide ajudar os elfos e anões na batalha contra o exército de criaturas da Terra do Fogo.",
    [
        { texto: "Lutar com todas as suas forças", proximaPagina: 33 }
    ],
    new Personagem("Comandante das Criaturas da Terra do Fogo", 100, 25, 0),
    [new Item("Coroa de Comando", "Permite controlar pequenas criaturas")]
);

const pagina32 = new PaginaExploracao(
    32,
    "Você aceita as ordens do anel e vê que um exército de elfos e anões se aproxima para tentar impedir você. Você os derrota facilmente, derruba um por um, até que o mago aparece. Ele tenta lutar com você, mas o anel é muito poderoso e você o derrota facilmente. Ele implora que você lute contra o anel, pois ele está corrompendo você. Que você vai destruir todo o bem que existe na Terra-Média. O anel continua insistindo para que mate o mago, você reluta contra isso, tentando resistir.",
    [
        { texto: "Ceder ao anel e matar o mago", proximaPagina: 34 },
        { texto: "Resistir ao anel e poupar o mago", proximaPagina: 36 }
    ]
);

const pagina33 = new PaginaExploracao(
    33,
    "Você derrota o comandante das criaturas da Terra do Fogo, junto do mago Gandalf, e você entrega o anel para ele, que promete destruí-lo. Assim mantendo a paz na Terra-Média.",
    []
);

const pagina34 = new PaginaExploracao(
    34,
    "Você cede ao anel e mata o mago. Com isso, você se torna o senhor da Terra-Média, é consumido pelo poder do anel, após massacrar todos que se opuseram a você. Depois de ter conquistado tudo, percebe que não restou nada do que você amava, você está sozinho, com o poder do anel, mas vazio por dentro. Você se arrepende amargamente de suas escolhas. Então decide se jogar em uma cratera de lava, destruindo o anel e a si mesmo. Com a esperança de que se existe alguma bondade em alguma criatura, possa se reconstruir tudo que existia de bom na Terra-Média.",
    []
);

const pagina35 = new PaginaExploracao(
    35,
    "Você decide ignorar o conflito e ir embora. Depois disso, a Terra-Média é consumida pelo fogo e pela escuridão, e você se arrepende amargamente de sua decisão de não ajudar. Até que os exércitos das criaturas da Terra do Fogo te encontram e você é morto.",
    []
);

const pagina36 = new PaginaExploracao(
    36,
    "Você resiste ao anel e poupa o mago. Juntos, vocês conseguem derrotar o exército das criaturas da Terra do Fogo que você comandava. O mago Gandalf pega o anel e promete destruí-lo, salvando a Terra-Média da escuridão.",
    []
);


// ---------------- RODAR DO JOGO ----------------

const paginas: { [id: number]: IPagina } = {
    1: pagina1,
    2: pagina2,
    3: pagina3,
    4: pagina4,
    5: pagina5,
    6: pagina6,
    7: pagina7,
    8: pagina8,
    9: pagina9,
    10: pagina10,
    11: pagina11,
    12: pagina12,
    13: pagina13,
    14: pagina14,
    15: pagina15,
    16: pagina16,
    17: pagina17,
    18: pagina18,
    19: pagina19,
    20: pagina20,
    21: pagina21,
    22: pagina22,
    23: pagina23,
    24: pagina24,
    25: pagina25,
    26: pagina26,
    27: pagina27,
    28: pagina28,
    29: pagina29,
    30: pagina30,
    31: pagina31,
    32: pagina32,
    33: pagina33,
    34: pagina34,
    35: pagina35,
    36: pagina36
};

function jogarHistoria() {
    let paginaAtual: IPagina = pagina1;
    let historico: string[] = []; 

while (true) {
    console.clear();
    paginaAtual.executar();

    if (paginaAtual.escolhas.length === 0) {
        console.log("\n=== FIM DA AVENTURA ===");
        console.log("\n📜 Suas escolhas foram:");
        historico.forEach((escolha, i) => {
            console.log(`${i + 1}. ${escolha}`);
        });

        const reiniciar = prompt("\nDeseja jogar novamente? (s/n): ").toLowerCase();
        if (reiniciar === "s") {
            paginaAtual = pagina1;   
            historico = [];          
            continue;               
        } else {
            console.log("\nObrigado por jogar!");
            break; 
        }
    }

    const resposta = prompt("\nEscolha uma opção: ");
    const escolhaIndex = parseInt(resposta) - 1;

    if (isNaN(escolhaIndex) || escolhaIndex < 0 || escolhaIndex >= paginaAtual.escolhas.length) { //isNaN = Not a Number
        console.log("Opção inválida. Pressione ENTER para tentar novamente...");
        prompt("");
        continue;
    }

    const escolhaFeita = paginaAtual.escolhas[escolhaIndex];
    historico.push(escolhaFeita.texto);
    paginaAtual = paginas[escolhaFeita.proximaPagina];
}
}

// ---------------- INICIAR ----------------
jogarHistoria();