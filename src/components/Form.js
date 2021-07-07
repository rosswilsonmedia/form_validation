import React, { useReducer } from 'react';
 
const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};
 
function reducer(state, action) {
    return {
        ...state,
        [action.type]: {
            value: action.payload['value'],
            error: action.payload['error']
        }
    };
}
 
export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);
 
    function handleChange(e, error) {
        const name=e.target.name;
        const value=e.target.value;
        const reducerInfo = {
            'name': name,
            'values':{
                'value':value,
                'error':error
            }
        };
        dispatch({
            type: reducerInfo['name'],
            payload: reducerInfo['values']
        });
    }

    const handleFirstName = (e) => {
        let error=null;
        if(e.target.value.length==1){
            error = '*first name must be at least two characters';
        }
        handleChange(e, error);
    }

    const handleLastName = (e) => {
        let error=null;
        if(e.target.value.length==1){
            error = '*last name must be at least two characters';
        }
        handleChange(e, error);
    }

    const handleEmail = (e) => {
        let error=null;
        let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(e.target.value.length>0 && (!(e.target.value.match(emailRegex)))){
            error = '*must be a valid email address';
        }
        handleChange(e, error);
    }

    return (
        <form onSubmit={(e)=>e.preventDefault()}>
            {/* {JSON.stringify(state)} */}
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={state.firstName.value}
                    onChange={handleFirstName}
                />
                {
                    state.firstName.error ?
                    <p style={{color:'red'}}>{state.firstName.error}</p>:
                    ''
                }
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={state.lastName.value}
                    onChange={handleLastName}
                />
                {
                    state.lastName.error ?
                    <p style={{color:'red'}}>{state.lastName.error}</p>:
                    ''
                }
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input
                    type="email"
                    id='email'
                    name="email"
                    value={state.email.value}
                    onChange={handleEmail}
                />
                {
                    state.email.error ?
                    <p style={{color:'red'}}>{state.email.error}</p>:
                    ''
                }
            </div>
        </form>
    );
}