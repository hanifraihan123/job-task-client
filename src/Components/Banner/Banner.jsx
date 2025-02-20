
const Banner = () => {
    return (
        <div>
            <h3>To Do</h3>
           <div
            className="card bg-yellow-100 mx-4 my-6 shadow-xl"
          >
              <div className="card-body">
              <h2 className="card-title">Title: </h2>
                <p>Description: </p>
                <p>Timestamp: </p>
                <p>Category: </p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary">Add</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-secondary">Delete</button>
                </div>
              </div>
          </div>
            <h3>In Progress</h3>
           <div
            className="card bg-yellow-100 mx-4 my-6 shadow-xl"
          >
              <div className="card-body">
                <h2 className="card-title">Title: </h2>
                <p>Description: </p>
                <p>Timestamp: </p>
                <p>Category: </p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary">Add</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-secondary">Delete</button>
                </div>
              </div>
          </div>
            <h3>Done</h3>
           <div
            className="card bg-yellow-100 mx-4 my-6 shadow-xl"
          >
              <div className="card-body">
              <h2 className="card-title">Title: </h2>
                <p>Description: </p>
                <p>Timestamp: </p>
                <p>Category: </p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary">Add</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-secondary">Delete</button>
                </div>
              </div>
          </div>
        </div>
    );
};

export default Banner;