import Header from '@/app/components/header/index'

export default function Pedidos(){
    return(
        <div className='min-h-screen bg-white '>
           <div>
              <Header/>
           </div>
            <div className='text-black mt-5 flex flex-col text-center'>
                <div >
                    <h1 className='font-bold'>Histórico de pedidos</h1>
                </div>
                <div>
                    <h1>Você ainda não possui pedidos nesta loja.</h1>
                </div>
            </div>
        </div>
    )
}