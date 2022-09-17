import {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';
import ConfigModal from './components/ConfigModal';
import { GearFill } from 'react-bootstrap-icons';
import BeatLoader from 'react-spinners/BeatLoader';
import './App.css';
import {getWethContract, getUniContract, getPrice, runSwap } from './AlphaRouterService';
import CurrencyField from './components/CurrencyField';


function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  
  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);

  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract]= useEffect(undefined);
  const [weiAmount, setWeiAmount] = useEffect(undefined);
  const [uniAmount, setUniAmount] = useEffect(undefined);




  useEffect (() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const wethContract = getWethContract()
      setWethContract(wethContract)

      const uniContract = getUniContract()
      setUniContract(uniContract)
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
      wethContract.balanceOf(address)
      .then(res => {
        setWeiAmount( Number(ethers.utils.formatEther(res)))
      })

      uniContract.balanceOf(address)
      .then(res => {
        setUniAmount( Number(ethers.utils.formatEther(res)))
      })
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
            <span className='swap-text'>Swap</span>
            <span className='gear-container' onClick={()=>setShowModal(true)}>
            <GearFill />
            </span>
            {showModal && (
              <ConfigModal 
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount} />

            )}
          </div>
              <div className='swap-body'>
                <CurrencyField
                field='input'
                tokenName='WETH'
                getSwapPrice={getSwapPrice}
                signer={signer}
                balance={wethAmount}
                />

                <CurrencyField
                field='output'
                tokenName='UNI'
                value={outputAmount}
                
                signer={signer}
                balance={uniAmount}
                spinner={BeatLoader}
                loading={loading}
                />

              </div>
        </div>
      </div>
    </div>
  );
}

export default App;
