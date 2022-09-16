
const ConfigModal = props => {

    const {onClose, setDeadlineMinutes, deadlineMinutes,
        setSlippageAmount, slippageAmount
    } = props

    return(
        <div className='modaly' onClick={onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className= 'modal-body'>
                    <h4 className='title-header'>Transaction Settings</h4>

                    <div className='row'>
                        <label className='label-field'>Slippage Tolerance</label>
                    </div>
                    <div className='row'>
                        <div className='col-md-9 field-container'>
                        <input 
                            className='input-field'
                            placeholder="1.0%"
                            value={slippageAmount}
                            onChange={e => setSlippageAmount(e.target.value)}
                            />
                        </div>

                        <div className='col-md-3 input-field-units-container'>
                            <span>%</span>
                        </div>
                    </div>
                    <div className='row'>
                    <label className='label-field'>Transaction Deadline</label>
                    </div>

                    <div className='row'>
                        <div className='col-md-9 field-container'>
                        <input 
                            className='input-field'
                            placeholder="10"
                            value={deadlineMinutes}
                            onChange={e => setDeadlineMinutes(e.target.value)}
                            />
                        </div>

                        <div className='col-md-3 input-field-units-container'>
                            <span>minutes</span>
                        </div>
                    </div>

                    <div className='row'>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default ConfigModal;
