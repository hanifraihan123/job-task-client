import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";
import { useState } from "react";

const Banner = () => {
    const axiosPublic = useAxios();
    const [categori,setCategory] = useState();
    const [task,setTask] = useState({})
    const {data: tasks = [], refetch} = useQuery({
        queryKey: ['tasks'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/tasks');
            return res.data;
        }
    })
  
    const todos = tasks.filter(task=>task.category === 'To-Do');
    const inProgress = tasks.filter(task=>task.category === 'In Progress');
    const done = tasks.filter(task=>task.category === 'Done');

    const handleSubmit = async(e) => {
      e.preventDefault();
      const form = e.target;
      const title = form.title.value;
      const details = form.details.value;
      const category = categori;
      const updateInfo = {title,details,category};
      const res = await axiosPublic.patch(`/task/${task._id}`, updateInfo)
      if(res.data.modifiedCount > 0){
        refetch();
        toast.success('Task Info Updated Successfully')
      }
     }

    const handleUpdate = async (id) => {
      document.getElementById("submit_modal").showModal();
      await axiosPublic.get(`/task/${id}`)
      .then((res) => {
        setTask(res.data);
      });
    };

    const handleDelete = async(id) => {
         const res = await axiosPublic.delete(`/task/${id}`);
         if(res.data.deletedCount > 0){
          toast.success('Task Deleted Successfully');
          refetch();
         }
    }

    const standardDelete = (id) => {
      toast((t) => (
        <div className="flex items-center gap-2 justify-center">
          <div>
            <p>
              Are You <b>Sure?</b>
            </p>
          </div>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
            className="px-3 py-1 rounded-md text-white bg-red-400"
          >
            Yes
          </button>
          <button
            className="px-3 py-1 rounded-md text-white bg-green-400"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      ));
    };

    return (
        <div>
            <h3 className="font-bold text-4xl text-center pb-4">To Do</h3>
            <div className="grid grid-cols-3 gap-4 pb-6 pl-4">
            {
              todos.map(task=><div key={task._id} task={task} className="card bg-lime-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{task.title}</h2>
                  <p>Category: {task.category}</p>
                  <p>Description: {task.description}</p>
                  <div className="card-actions justify-center">
                    <button onClick={()=>handleUpdate(task._id)} className="btn btn-primary">Edit</button>
                    <button onClick={()=>standardDelete(task._id)} className="btn btn-primary">Delete</button>
                  </div>
                </div>
              </div>)
            }
            </div>
            <h3 className="font-bold text-4xl text-center pb-4">In Progress</h3>
            <div className="grid grid-cols-3 gap-4 pb-6 pl-4">
            {
              inProgress.map(task=><div key={task._id} task={task} className="card bg-lime-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{task.title}</h2>
                  <p>Category: {task.category}</p>
                  <p>Description: {task.description}</p>
                  <div className="card-actions justify-center">
                    <button onClick={()=>handleUpdate(task._id)} className="btn btn-primary">Edit</button>
                    <button onClick={()=>standardDelete(task._id)} className="btn btn-primary">Delete</button>
                  </div>
                </div>
              </div>)
            }
            </div>
            <h3 className="font-bold text-4xl text-center pb-4">Done</h3>
            <div className="grid grid-cols-3 gap-4 pb-6 pl-4">
            {
              done.map(task=><div key={task._id} task={task} className="card bg-lime-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{task.title}</h2>
                  <p>Category: {task.category}</p>
                  <p>Description: {task.description}</p>
                  <div className="card-actions justify-center">
                    <button onClick={()=>handleUpdate(task._id)} className="btn btn-primary">Edit</button>
                    <button onClick={()=>standardDelete(task._id)} className="btn btn-primary">Delete</button>
                  </div>
                </div>
              </div>)
            }
            </div>
            <dialog id="submit_modal" className="modal sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title: </span>
              </label>
              <input defaultValue={task?.title} name="title"
                type="text"
                placeholder="Title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Details: </span>
              </label>
              <input defaultValue={task?.description} name="details"
                type="text"
                placeholder="Title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Submission Details: </span>
              </label>
              <select 
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                 <option disabled>Select One</option>
                <option selected={task.category === 'To-Do'? true : false} value="To-Do">To-Do</option>
                <option selected={task.category === 'In Progress'? true : false} value="In Progress">In Progress</option>
                <option selected={task.category === 'Done'? true : false} value="Done">Done</option>
              </select>
            </div>
            <div className="form-control mt-2">
          <button className="btn btn-primary">Update</button>
        </div>
          </form>
          <div className="modal-action mt-0 mr-5">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        </div>
    );
};

export default Banner;