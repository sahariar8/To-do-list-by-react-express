import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {

    const {_id,name,email} = useLoaderData();
    const navigate = useNavigate()

    const handleUpdate = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const client = {name,email}
        console.log(client);
        fetch(`http://localhost:3000/users/${_id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(client)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('data updated successfully',data);
            navigate('/');
            
        })

    }
   
    return (
        <div>
            <h1 className="text-6xl font-semibold font-serif text-green-500 text-center my-10">Users Update Form</h1>

            <form className='text-center' onSubmit={handleUpdate}>
                <input type="text" name='name' className='input input-bordered' defaultValue={name} /> <br />
                <input type="email" name='email' className='input input-bordered my-2' defaultValue={email} /> <br />
                <button className='btn btn-warning'>Update</button>
            </form>
        </div>
    );
};

export default Update;