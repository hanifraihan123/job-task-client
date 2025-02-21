import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";


const AddTask = () => {

    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxios();
    const onSubmit = async(data) => {

        const taskInfo = {
            title: data.title,
            description: data.description,
            timestamp: new Date(),
            category: data.category
        }
        const res = await axiosPublic.post('/add-task', taskInfo)
        if(res.data.insertedId){
            toast.success("Task Added Successfully")
        }
    }

    return (
        <div>        
            <h3 className="font-bold text-3xl text-center py-4">Add New Task</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-0 w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Title</span>
          </label>
          <input type="text" {...register("title")} placeholder="Enter Title Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text" {...register("description")} placeholder="Enter Description" className="input input-bordered" required />
        </div>
        <div className="lg:flex md:flex gap-4">
        <div className="lg:w-1/3 md:w-1/3">
        <label className="label">
            <span className="label-text">Category</span>
          </label>
        <select defaultValue='default' {...register("category")} className="select select-bordered w-full">
  <option disabled value="default">Select One</option>
  <option>To-Do</option>
  <option>In Progress</option>
  <option>Done</option>
</select>
        </div>
        </div>
        <div className="form-control lg:mt-6 mt-2">
          <button className="btn btn-primary">Add Task</button>
        </div>
      </form>
        </div>
    );
};

export default AddTask;