const CurrencyField = props => {

const getPrice = (value) => {
    props.getSwapPrice(value)
}
    return (
        <div className='row currency-input'>
            <div className='col-md-6 number-container'>
            {props.loading? (
                <div className='spinner-container'>
                    <props.spinner />
                </div>

            ): (
                <input 
                className='currency-input-field'
                placeholder='0.0'
                value={props.value}
                onBlur={e => (props.field === 'input' ? getPrice(e.target.value): null)} />
            )}
            </div>

            <div className='col-md-6 token-container'>
            <span className='token-name'>{props.tokenName}</span>
            <div className='balance-container'>
            <span className='balance-amount'>Balance: {props.balance?.toFixed(3)}</span>
            </div>
            </div>
        </div>
    )
}


export default CurrencyField;