import {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';

import './App.css';

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  useEffect (() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
    }
    onLoad()
  }, [])

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }

  const isConnected = () => signer !== undefined;

  const getWalletAddress =() => {
    signer.getAddress()
    .then(address => {
      setSignerAddress(address)

      //ToDo: connect weth and uni contracts
    })
  }

  if(signer !== undefined) {
    getWalletAddress()
  }


  return (
    <div className="App">
      <div className='app-nav'>
      <div className='my-2 button-container button-container-top'>
        <PageButton name={"Swap"} isBold={true} />
        <PageButton name={"Pool"} />
        <PageButton name={"Vote"}  />
        <PageButton name={"Charts"}  />

      </div>

      <div className='right-nav'>
        <div className= 'connect-button-container'>
        <ConnectButton 
        provider={provider}
        isConnected={isConnected}
        signerAddress={signerAddress}
        getSigner={getSigner}
        />
        </div>
        <div className="my -2 button-container">
        <PageButton name={"..."} isBold={true}/>
          </div>
        </div>
      </div>

      <div className='app-body'>
        <div className='swap-container'>
          <div className='swap-header'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
