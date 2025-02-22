import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://my-job-task-server-rc2sfzfnv-md-raihans-projects.vercel.app",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;