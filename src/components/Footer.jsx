import React from "react";

const Footer = () => {

    return (
        <>
            <footer  >
                <div className="row">
                    <div className="col-md-6">
                        <p>Copyright 2023 - Designed by <a href="https://github.com/Rominaqr" target="_blank">Romina Quispe Real</a></p>
                    </div>
                    <div className="col-md-4 ms-auto">
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item"><a href="https://twitter.com/" target="_blank"><i className="fab fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                            <li className="list-inline-item"><a href="https://ar.pinterest.com/" target="_blank"><i className="fab fa-pinterest"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <ul className="list-inline quicklinks">
                            <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="#">Terms of Use</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer