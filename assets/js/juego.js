const miModulo=(() => {

    'use strict'
    
    let deck         =[];
    const tipos      =['C','H','D','S'],
          especiales =['A','J','Q','K'];
    
    let puntosJugadores=[];
  
    
    // Referencias del HTML
    const btnNuevo             =document.querySelector('#btnNuevo'),
          btnPedir             =document.querySelector('#btnPedir'),
          btnDetener           =document.querySelector('#btnDetener');

    const divCartasJugadores=document.querySelectorAll('.divCartas');

    const puntosHTML           =document.querySelectorAll('small');
    
    // Esta función inicializa el juego
    const inicializarJuego=(numJugadores=2)=>{
        deck=crearDeck();

        puntosJugadores=[];

        for (let i=0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText=0);
        divCartasJugadores.forEach(elem =>elem.innerHTML='');

    
        btnPedir.disabled   =false;
        btnDetener.disabled =false;

   
        
    }
    
    // Esta función crea una nueva baraja (deck)
    const crearDeck=()=>{
        for(let i=2;i<=10;i++){
            for (let tipo of tipos){
                deck.push(i+tipo);
            }
          
        }
    
        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp+tipo);
            }
        }
    

    
        return _.shuffle(deck);
    
       
    }
    
    
    // Esta función toma una carta de la baraja
    
    const pedirCarta=()=>{
        if (deck.length===0){
            throw 'No hay cartas';
        }
    
        return deck.pop();
    
    }
    
    // pedirCarta();
    
    const valorCarta=(carta) =>{
        const valor=carta.substring(0,carta.length-1);
    
        return (isNaN(valor))?
                (valor==='A')?11:10
                :valor*1;
    
    
        // let puntos=0;
    
        // if (isNaN(valor)){
        //     puntos=(valor==='A')?11:10;
        // }
        // else{
        //     puntos=valor*1;
        // }
    
        // console.log(puntos);
    
    }


    //Turno: 0 = primer jugador y el último será la computadora

    const acumularPuntos=(carta,turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno]+valorCarta(carta);
        puntosHTML[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta=(carta,turno)=>{
        const imgCarta=document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador=() =>{
        const [puntosMinimos,puntosComputadora]=puntosJugadores;

        setTimeout(() => {
    
            if (puntosMinimos === puntosComputadora) {
                alert("Nadie gana");
            } 
            else if (puntosComputadora>21){
                alert("Has ganado");
            }
            else if (puntosMinimos>21){
                alert("Ha perdido");
            }
            else{
                alert("Computadora gana")
            }
    
           
        }, 500);

    }
    
    // turno computadora

    const turnoComputadora=(puntosMinimos)=>{
        let puntosComputadora=0;

        do{
    
            const carta = pedirCarta();

            puntosComputadora=acumularPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);
         
    
            
        }while(puntosComputadora<puntosMinimos && puntosMinimos<=21);

        determinarGanador();
    

    
    }
    
    // let valor=valorCarta(pedirCarta());
    
    // console.log({valor});
    
    // Eventos
    
    btnPedir.addEventListener('click',() => {
        const carta = pedirCarta();

        const puntosJugador=acumularPuntos(carta,0);
        crearCarta(carta,0);
    
        if (puntosJugador>21){
            console.warn("Lo siento,perdiste");
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
    
        } 
        else if (puntosJugador===21){
            console.warn ("21, genial");
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }
    
    });
    
    btnDetener.addEventListener('click',() => {
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugadores[0]);
        
    });
    
    btnNuevo.addEventListener('click',() => {
   
    
        inicializarJuego();
    
        
    });

    return{
        nuevoJuego:inicializarJuego
    };
        
})();

