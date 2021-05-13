import './style.scss'

const Error = ({errormessage}) => {


    return (
        <div className={`error-${errormessage.type}`}>
            <h1>{errormessage.message}</h1>
        </div>
    )
}

export default Error