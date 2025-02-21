import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Banner = () => {
    const axiosPublic = useAxios();
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
                    <button className="btn btn-primary">Edit</button>
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
                    <button className="btn btn-primary">Edit</button>
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
                    <button className="btn btn-primary">Edit</button>
                    <button onClick={()=>standardDelete(task._id)} className="btn btn-primary">Delete</button>
                  </div>
                </div>
              </div>)
            }
            </div>
           
        </div>
    );
};

export default Banner;