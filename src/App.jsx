import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { fotmatearDinero, calcularTotalPagar } from "./helpers"

/* el uso de los hooks se definen siempre antes del return de la app o componente */
function App() {
  /* useState nos retorna un arreglo por eso haremos el destructing al hook de dos valores que retorna
  cantidad = estado
  setCantidad = funcion */
  const [cantidad, setCantidad] = useState(10000);

  const [meses, setMeses] = useState(6);

  const [total,setTotal] = useState(calcularTotalPagar(cantidad,meses));

  const [pago,setPago]= useState(0);

  /* cuando cambien las variables de cantidad y meses se ejecutara el codigo que calcula el total a pagar */
  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad,meses);

    setTotal(resultadoTotalPagar);

    
  },[cantidad,meses])

  useEffect(() => {
    //calcular el pago mensual
    setPago(total/meses)
  },[total]);

  /* declaramos variables globales (nunca cambiaran) */
  const min = 0;
  const max = 20000;
  const step = 100;
  
  function handleChange(e){
    /* con el simbolo + comvertimos el e.target.value en numero ya que es un string  */
    setCantidad(+e.target.value)//actualizamos el estado cantidad
  }
  function handleClickDecremento(){
    const valor = cantidad - step;

    if(valor < min){
      alert('Cantidad no valida')
      return;
    }
    setCantidad(valor);
  }

  function handleClickIncremento(){
    const valor = cantidad + step;

    if(valor > max){
      alert('Cantidad no valida')
      return;
    }
    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div className="flex justify-between my-6">
        <Button 
        operador='-'
        fn = {handleClickDecremento}/>

        <Button 
        operador='+'
        fn = {handleClickIncremento}/>
      </div>

      <input type="range" className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent.lime-600" onChange={handleChange}
      min={min}
      max={max}
      step={step}
      value = {cantidad}/>
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{fotmatearDinero(cantidad)}</p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">Elige un <span className="text-indigo-600">Plazo</span> a pagar</h2>

      <select className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
      value = {meses}
      onChange={e => setMeses(e.target.value)}>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">Resumen <span className="text-indigo-600">de pagos</span></h2>

        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{fotmatearDinero(total)}Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{fotmatearDinero(pago)} Mensuales</p>
      </div>


    </div>
    
  )
}

export default App
