import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import '../Css/Home.css'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "kishore@gmail.com",
            "password": "",
            "role": sessionStorage.getItem('role'),
            "token": ""
        }
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    const images = [
        '../Images/home1.jpg',
        '../Images/home2.jpg',
        '../Images/home3.jpg'
    ]

    useEffect(()=>{
        sessionStorage.clear('');
    },[]);

    const [packageCount, setPackageCount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5028/api/Package/AllPackages",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var mydata = await data.json();
                    setPackageCount(mydata.length);
                    console.log(packageCount, "packageCount");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            <Navbar user={user} />
            <div className="home-header">
            </div>
            <div className="home-body">
                <div className="home-carousel">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img className="home-carousel" src={require(`../Images/home${index + 1}.jpg`)} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="home-count-cards">
                <div className="package-count">
                    <h4>No of Packages</h4>
                    <p>{packageCount}</p>
                </div>
            </div>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                        <div className="footer-links">
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
                        <p>Contact: kishore1207india@gmail.com</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home;