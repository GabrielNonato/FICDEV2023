import 'bootstrap-icons/font/bootstrap-icons.css';

export function Dashboard() {

    return (
       <div className='p-5 bg-light'>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-currency-dollar fs-1 text-success"></i>
                        <div>
                            <p>Lorem ipsum</p>
                            <h2>Lorem ipsum</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-truck fs-1 text-danger"></i>
                        <div>
                            <p>Lorem ipsum</p>
                            <h2>Lorem ipsum</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-graph-up-arrow fs-1 text-primary"></i>
                        <div>
                            <p>Lorem ipsum</p>
                            <h2>Lorem ipsum</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-graph-up-arrow fs-1 text-warning"></i>
                        <div>
                            <p>Lorem ipsum</p>
                            <h2>Lorem ipsum</h2>
                        </div>
                    </div>
                </div>

            </div>
       </div>
    );

}

export default Dashboard