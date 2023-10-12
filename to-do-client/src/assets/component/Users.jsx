
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const Users = () => {
    const users = useLoaderData([]);

    const handleDelete =  _id => {
        console.log(_id)
        fetch(`http://localhost:3000/users/${_id}`,{
            method:'DELETE'
        })
        .then(res=> res.json())
        .then(data=>{
            console.log('data deleted successfully',data)
            location.reload();
        })
    }
  return (
    <div>
      <h1 className="text-6xl font-semibold font-serif text-green-500 text-center my-10">
        User List:{users.length}
      </h1>
      <div className="overflow-x-auto max-w-screen-xl mx-auto">
        <table className="table table-zebra w-3/5 mx-auto">
            
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th> 
              <th>Action</th> 

            </tr>
          </thead>
          <tbody>
            
            {
                users.map(user =>
                <>
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/users/${user._id}`}> <button className="btn btn-warning btn-sm">Update</button></Link>
                            <button className="btn btn-error btn-sm ml-2" onClick={()=>handleDelete(user._id)}>delete</button>
                        </td>
                     </tr>
                </>
                    )
            }
             
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
