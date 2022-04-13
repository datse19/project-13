import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

export default function UserSignIn() {
    

    const context = useContext (Context);
    let history = useNavigate();
    
    //state
    const [emailAddress, setEmailAddress ] = useState('');
    const [password, setPassword] = useState('');

    //Obtain the user through context
    const handleSubmit = (e) => {
        e.preventDefault();
        context.actions.signIn(emailAddress, password)
          .then( (user) => {
            if (user === null) {
                return {errors: ['Sign in was unsuccessful']};
            } else {
                history('/');
            }
          })
          .catch( (error) => {
              console.log(error);
              history('/error');
          })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history('/');
    }

    return (
        <div>
            <main>
                <div className='form--centered' >
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor='emailAddress'> Email Address </label>
                        <input onChange={(e) => setEmailAddress(e.target.value)} id='emailAddress' name='emailAddress' type='email' value={emailAddress} required/>
                        <label htmlFor='password' > Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} id='password' name='password' type='password' value={password} required/>
                        <button className='button' type='submit' onClick={handleSubmit} > Sign In</button>
                        <button className='button button-secondary' onClick={handleCancel}> Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <Link to='/signup' >Sign Up </Link>!</p>
                </div>
            </main>
        </div>
    );
}



