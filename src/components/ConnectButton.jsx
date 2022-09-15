import PageButton from './PageButton';


const ConnectButton = props => {
    const {provider, isConnected, signerAddress, getSigner} = props;
    const displayAddress = `${signerAddress?.substring(0,10)}...`

    return (
        <>
        {isConnected() ? (
            <div className='button-container'>
            <PageButton name={displayAddress}/>
            </div>
        ): (
            <div className='btn my-2 connect-button'
            onClick={() => getSigner(provider)}>
            Connect Wallet
            </div>
        )}
        </>
    )


}

export default ConnectButton;
