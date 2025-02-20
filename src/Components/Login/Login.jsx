
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from '../../firebase/firebase.init';
import useAxios from '../Hooks/useAxios';

const Login = () => {
    
const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxios();
  const from = location.state || "/"

      const handleGoogle = async() => {
        signInWithPopup(auth, provider)
        .then(async(res)=>{
          if(res.user){
            const userInfo = {
                name: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL
              }
             const result =  await axiosPublic.post('/add-user', userInfo)
              console.log(result.data)
            navigate(from)
            toast.success('User Login Successfully')
          }
        })
        .catch(error=>{
          toast.error(error.message)
        })
        //  await axiosPublic.post('/users', userInfo)
      }

    return (
        <div className='lg:flex gap-4'>
        <div className='flex-1'>
        <form className="card-body mx-auto w-1/2 pt-2">
            <h3 className="text-center font-bold text-3xl pt-4">Login Now</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
      </form>
      <div className='text-center mx-7'>
      <button onClick={handleGoogle} className="btn btn-secondary mb-4">Login With Google</button>
      </div>
        </div>
        </div>
    );
};

export default Login;