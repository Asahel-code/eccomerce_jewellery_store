import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';

export default function TopContent () {

    const location = useLocation();

    return (
        <div className='m-0 p-0'>
            {location.pathname === '/' ?
                <div className="top-header">
                    <div className="row py-4">
                        <div className="col-6 px-5 md:px-24 xs:px-10">
                            <h1 className="capitalize pb-3" data-aos="fade-down">Beauty in Simplicity!</h1>
                            <span className="" data-aos="fade-down">Super Deal! Get free shipping for goods worth ksh.2500 and above.</span>
                            <div className="py-5" data-aos="fade-down">
                                <Button variant="dark">
                                    <Link to="#products" className="text-white text-decoration-none">Get started</Link>
                                </Button>
                            </div>
                            <div className="row">
                                <div data-aos="fade-up" className="col-4">
                                    <div className="d-flex items-center gap-1">
                                        <span className="fw-bold fs-5 text">200</span>
                                        <span className="fw-bold fs-5 text text-primary">
                                            +
                                        </span>
                                    </div>
                                    <p className="text-secondary fs-6 text">Stock</p>
                                </div>
                                <div data-aos="fade-up" className="col-4">
                                    <div className="d-flex items-center gap-1">
                                        <span className="fw-bold fs-5 text">500</span>
                                        <span className="fw-bold fs-5 text text-primary">
                                            +
                                        </span>
                                    </div>
                                    <p className="text-secondary fs-6 text">Happy customers</p>
                                </div>
                                <div data-aos="fade-up" className="col-4">
                                    <div className="d-flex items-center gap-1">
                                        <span className="fw-bold fs-5 text">1500</span>
                                        <span className="fw-bold fs-5 text text-primary">
                                            +
                                        </span>
                                    </div>
                                    <p className="text-secondary fs-6 text">Reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="top-section-bgImage col-6" data-aos="zoom-in">
                        </div>
                    </div>
                </div>
            : <div></div>}
        </div>

    )
}

