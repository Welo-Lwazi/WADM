import { Toaster } from 'react-hot-toast';
import './App.css';
import RouterData from './Router/Router';

function App() {
  return (
    <>
      <RouterData />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#fff',
            color: '#000',
          },
        }}
      />
    </>
  )
}

export default App;
