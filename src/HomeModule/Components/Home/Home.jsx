import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import { Link } from "react-router-dom";

export default function Home({adminData}) {
  return (
    <>
      <Header adminData={adminData} />
      <div className="home-content rounded-5 mt-3 container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div>
              <h3>Fill the <span className="text-success">Recipes</span> !</h3>
              <p className="w-50">you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="text-center">
              <Link to="/dashboard/recipes" className="btn btn-success w-75 my-4">Fill Recipes <i className="fa fa-arrow-right ms-1" aria-hidden="true"></i> </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
