import React, { useState, useEffect, useContext} from 'react';
import { Context } from '../Context';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function CourseDetail () {

    //calling state
    let {id} = useParams();
    let [course, setCourse] = useState('');
    let [user, setUser] = useState('');

    const context = useContext(Context);
    const history = useNavigate();


    useEffect( () => {
            axios.get(`http://localhost:5000/api/courses/${id}`)
                .then(res => {setCourse(res.data);
                                setUser(res.data.user);
                                })
                .catch(err => console.log('Oh No!! Something went wrong fetching the data', err))       
    }, [id];
    
    //Delete the course based on ID
    function deleteCourse (e) {
        e.preventDefault();
        const authCred = btoa( `${context.authenticatedUser.emailAddress} : ${context.authenticatedPassword}`)
        axios.delete(`http://localhost:5000/api/course/${id}`, {
            header: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${authCred}`
            }})
            .then(res => {
                if(res.status === 401){
                    history('/forbidden');
                } else {
                    history('/');
                }
            })
            .catch(err => {
                history('/error');
            });   
    }
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {context.authenticatedUser && context.authenticatedUser.id === courses.userId ? (
                        <span>
                            <Link className="button" to={`/courses/${courses.id}/update`}>Update Course</Link>
                            <Link className="button" to="/" onClick={deleteCourse} >Delete Course</Link>
                        </span>
                    ) : (null)}
                    <Link className = 'button button-secondary' to='/'> Return to List </Link>
                </div>
            </div>

            <div className='wrap' >
                <h2>Course Detail</h2>
                <form>
                    <div className = 'main--flex'>
                        <div>
                            <h3 className = 'course--detail--title'> Course </h3>
                            <h4 className = 'course--name'>{course.title}</h4>
                            <p>By {user.firstName} {user.lastName}</p>
                            
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className='course--detail--title'>Estimated Time</h3>
                            <p>{course.estimatedTime || 'No time provided'}</p>
                            <h3 className = 'course--detail--title'>Materials Needed</h3>
                            <ul className='course--detail--list'>
                                <ReactMarkdown>{course.materialsNeeded || '* Nothing!'}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>

        </main>
    );
}
