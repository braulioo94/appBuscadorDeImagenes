import React,{useState} from 'react'
import Error from './Error'

const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('')
    const [error, guardarError] = useState(false)


    const buscarImagen = e => {
        e.preventDefault();

        if(termino.trim()===''){
            return    guardarError(true) ;
        }
        guardarError(false)

        //Enviar el termino de busqueda al componente principal
        guardarBusqueda(termino)







    }


    return ( 
        <form action=""
            onSubmit={buscarImagen}
        >
            {error ? <Error  mensaje='No se envio el nombre a buscar'/>   : null}
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input 
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='Busca una imagen, ejemplo: Futbol o café'
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>

                <div className='form-group col-md-4'>
                    <input 
                        className='btn btn-lg btn-danger btn-block'
                        type="submit"
                        value='Buscar'
                    />
                </div>
            </div>
        </form>
    );
}

export default Formulario;