const LoginContainer = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="form-control mx-auto w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email address:</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control mx-auto w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password:</span>
        </label>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full "
        />
      </div>
      <div className="form-control mx-auto w-full max-w-xs">
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  );
};

export default LoginContainer;
