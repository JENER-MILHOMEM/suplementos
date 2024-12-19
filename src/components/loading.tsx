import { ThreeCircles } from 'react-loader-spinner'

export const Loading = () => {

  return <div className='flex items-center justify-center h-screen'>
    <ThreeCircles
    color='#02CAE8'
    visible={true}
    height="100"
    width="100"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
  /></div>
}