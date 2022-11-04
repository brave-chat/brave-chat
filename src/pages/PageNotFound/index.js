import "./style.css";

const PageNotFound = () => {
  return (
    <div className="main-wrapper bg-dark dark-body">
      <div className="error-box">
        <div className="error-body text-center">
          <h1 className="error-title text-danger">404</h1>
          <h3 className="text-uppercase error-subtitle bg-light">
            PAGE NOT FOUND !
          </h3>
          <p className="text-muted mt-30 mb-30">
            YOU SEEM TO BE TRYING TO FIND YOUR WAY HOME
          </p>
          <a href="/" className="btn btn-danger rounded text-white">
            Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
