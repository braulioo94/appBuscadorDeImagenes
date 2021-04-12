import React,{useState,useEffect} from 'react';
import Formulario from './Componente/Formulario';
import ListadoImagenes from './Componente/ListadoImagenes';



function App() {

  const [busqueda, guardarBusqueda] = useState('') ;
  const [imagenes, guardarImagenes] = useState([]) ;
  const [paginaActual, guardarPaginaActual] = useState(1) ; //Funciona para cambiar de pagina
  const [totalPaginas , guardarTotalPaginas] = useState(1) ;        //Permite saber la cantidad de paginas se necesitan para mostrar todas las fotos

  useEffect( () => {
    
      const consultarApi = async () => {
        if(busqueda === ''){
          return
        }
        const imagenesPorPagina = 30;
        const key = '20112389-00ec332185eef62e36db2a50e' ;
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
      
      guardarImagenes(resultado.hits)


      //Calcula el total de paginas que tiene que haber dependiendo la cantidad de imagenes disponibles

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina) ;
      
      guardarTotalPaginas(calcularTotalPaginas)
      }

      //Mover la pantalla hacia arriba
      const jumbotron =document.querySelector('.jumbotron') ;
      jumbotron.scrollIntoView({behavior:'smooth'})
      consultarApi()
  }, [busqueda , paginaActual])
  
  //Definir la pagina anterior
  const  paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1 
    
    if(nuevaPaginaActual === 0){
      return ;
    }
    guardarPaginaActual(nuevaPaginaActual) ;
  } ;

  //Definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1 
    
    if(nuevaPaginaActual > totalPaginas ){
      return ;
    }
    guardarPaginaActual(nuevaPaginaActual) ;

  } ;



  return (
    <div className="App">
      <div className='container'>
          <div className='jumbotron'>
            <p className='lead text-center'>Buscador De Imagenes</p>
          <Formulario guardarBusqueda={guardarBusqueda}/>
          </div>

      </div>
      <div className='row justify-content-center'>
          <ListadoImagenes imagenes={imagenes} />

         {( paginaActual === 1) ? null :  <button //Si estamos en la pagina uno, no se muestra el boton anterior
            type='button'
            className='btn btn-info mr-1'
            onClick={paginaAnterior}
            > &laquo;Anterior  </button>}
            
            
            {(paginaActual === totalPaginas) ? null : <button //Si la pagina es igual a la ultima pagina, no muestra el boton Siguiente
            type='button'
            className='btn btn-info mr-1'
            onClick={paginaSiguiente}
            >Siguiente &raquo; </button>}
      </div>
    </div>
  );
}

export default App;
