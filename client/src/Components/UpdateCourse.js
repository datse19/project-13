import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../Context';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

export default function UpdateCourse () {
    const context = useContext(Context);

    let history = useNavigate();
    let {id} = useParams()

    const [title, setTitle] = useState ('');
    const [description, setDescription] = useState ('');
    const [estimatedTime, setEstimatedTime] = useState ('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState( [] );

    //Function updates course in the API database
    async function UpdateCourse(e) {
        e.preventDefault();
        setErrors([]);
        const authCred = btoa(`${context.authenticatedUser.emailAddress}:${context.authenticatedPassword}`)
        const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${authCred}`
            },
            body: JSON.stringify({
                title,
                description,
                estimatedTime,
                materialsNeeded}),
        });

        if (res.status === 204) {
            history('/');
          } else if (res.status === 403) {
            history('/forbidden');
          } else if (res.status === 400) {
            res.json()
              .then(data => {
                setErrors(data.errors)
                console.log(data);
              });
          } else {
            throw new Error();
          }
    }


    //Retrieves the course from the database that user wishes to update bades on ID
    useEffect( () => {
       axios.get(`http://localhost:5000/api/courses/${id}`)             
        .then(res => {
            setTitle(res.data.title);
            setDescription(res.data.description);
            setEstimatedTime(res.data.estimatedTime);
            setMaterialsNeeded(res.data.materialsNeeded);
            })
        .catch(err => {console.log('Oh No! Something went wrong fetching the data', err);})
        }, [id]);
               

    //Function updates the state of the element when user inputs text
    const handleCancel = (e) => {
        e.preventDefault();
        history(`/courses/${id}`);
    }

    const errorHandler = errors.length ? 
    (<div className='validation--errors' >
        <h3>Validation Errors</h3>
        <ul>{errors.map((error, i) => {return (<li key={i}>{error}</li>)})}</ul>
    </div>
    ): (
        null
        )



    //Conditional checks if there are any errors. If error, then throw error message from the API backend
    return (
        <main>
            <div className='wrap'>
                <h2> Update Course</h2>
                    {errorHandler}
                <form>
                    <div className='main--flex' >
                        <div>
                            <label htmlFor='courseTitle' >Course Title</label>
                            <input onChange={(e) => setTitle(e.target.value)} id='courseTitle' name='courseTitle' type='text' value={title} />
                            <p>By {context?.authenticatedUser ? `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` : ''} </p>

                            <label htmlFor='courseDescription' > Course Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} id='courseDescription' name='courseDescription' value={description} > {description} </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime" > Estimated Time </label>
                            <input onChange={(e) => setEstimatedTime(e.target.value)} id='estimatedTime' name='estimatedTime' type='text' value={estimatedTime} />

                            <label htmlFor='materialsNeeded' >Materials Needed</label>
                            <textarea onChange={(e) => setMaterialsNeeded(e.target.value)} id='materialsNeeded' name='materialsNeeded' value={materialsNeeded} >{materialsNeeded}</textarea>
                            
                        </div>
                    </div>
                    <button className='button' type='submit' onClick={UpdateCourse}>Update Course</button>
                    <button onClick={handleCancel} className='button button-secondary' >Cancel</button>
                </form>
            </div>
        </main>
    );
}
