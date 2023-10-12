import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const client = {name,email}
        console.log(client)
        fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(client)
        })
        .then(res=> res.json())
        .then(data=>{
            console.log('data post hoyese',data);
            form.reset();
            location.reload();
        })
    }
    return (
        <div>
            <h1 className='text-6xl font-semibold font-serif text-purple-500 text-center my-10' >To-Do List</h1>

            <form className='text-center' onSubmit={handleSubmit} >

                <input type="text" name='name' className='input input-bordered' placeholder='Your Name...' /> <br />
                <input type="email" name='email' className='input input-bordered my-2' placeholder='Your Email' /> <br />
                <button className='btn btn-warning'>Submit</button>
            </form>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;