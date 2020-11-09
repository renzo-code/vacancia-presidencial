import Axios from 'axios'
import React from 'react'
import { datosVacanciaVizcarra } from '../constantes'

import './style.scss'

const N_CONGRESISTAS = 130

class BarraVacancia extends React.Component{
  state = {
    datosVacancia : [],
    proyeccion: '',
    aFavor : {},
    evaluacion : {},
    enContra : {}
  }

  componentDidMount(){
    this.obtenerDatosVacancia()
  }

  obtenerDatosVacancia = async () => {
    try{
      const datosObtenidosVacancia = await Axios.get(datosVacanciaVizcarra)
      this.formatearDatos(datosObtenidosVacancia.data.values)
    }
    catch(e){
      console.error(e)
    }
  }
  
  formatearDatos = (array) => {
    const names = ["aFavor", "evaluacion", "enContra"]

    array.forEach((item, i) => {
      if (i !== 0 && i < 4) {
        this.setState({
          [names[i - 1]]: {
            estado: item[0],
            voto: item[1],
            color: item[2]
          }
        })
      } else if (i === 4) {
        this.setState({
          proyeccion: item[1]
        })
      }
      
    })
  }

  calcular = (voto) => {
    const resultado = voto * 100 / N_CONGRESISTAS
    console.log('resultado',resultado)
    return `${resultado}%`
  } 

  render(){
    const { aFavor,evaluacion,enContra, proyeccion } = this.state
    console.log('datosVacancia',aFavor)
    console.log('proyeccion',proyeccion)
    return(
      <>
        <div className="container-barra">
      <p className="cont-proyeccion">{proyeccion} </p>
          <div
            style={{
              width : this.calcular(aFavor.voto) ,
              backgroundColor : aFavor.color
            }}
            className="barra barra-favor"
          >
          {aFavor.voto}
          </div>

          <div
            className="barra barra-evaluacion"
            style={{
              width : this.calcular(evaluacion.voto),
              backgroundColor : evaluacion.color
            }}
          >
            {evaluacion.voto}
          </div>

          <div
            className="barra barra-contra"
            style={{
              width : this.calcular(enContra.voto),
              backgroundColor : enContra.color
            }}
          >
            {enContra.voto}
          </div>
        </div>
      </>
    )
  }
}

export default BarraVacancia