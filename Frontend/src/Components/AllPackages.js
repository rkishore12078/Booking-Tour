import { BlobServiceClient } from "@azure/storage-blob";
import { Input } from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Css/AllPackages.css'

function AllPackages() {
    const breakpoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ]

    const [images, setImages] = useState([
        "D:\Tour-Management\FrontEnd\tour-management\src\Images\queensland1.jpg",
        "D:\Tour-Management\FrontEnd\tour-management\src\Images\marina2.jpg",
        "D:\Tour-Management\FrontEnd\tour-management\src\Images\marina1.jpg",
        "D:\Tour-Management\FrontEnd\tour-management\src\Images\mahabalipuram2.jpg",
        "D:\Tour-Management\FrontEnd\tour-management\src\Images\mahabalipuram1.jpg"
    ]);

    const AZURITE_BLOB_SERVICE_URL = 'http://localhost:10000';
    const ACCOUNT_NAME = 'devstoreaccount1';
    const ACCOUNT_KEY = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';

    const [image, setImage] = useState([]);

    const submit = () => {
        const blobServiceClient = new BlobServiceClient(
            "http://127.0.0.1:10000/devstoreaccount1/tour?sv=2018-03-28&st=2023-08-05T12%3A31%3A44Z&se=2023-08-06T12%3A31%3A44Z&sr=c&sp=racwdl&sig=Vepsl%2F7x43ROvGIWvCdwotmTsYEcgJSfHJlLzW7G8NY%3D",
            "sv=2018-03-28&st=2023-08-05T12%3A31%3A44Z&se=2023-08-06T12%3A31%3A44Z&sr=c&sp=racwdl&sig=Vepsl%2F7x43ROvGIWvCdwotmTsYEcgJSfHJlLzW7G8NY%3D"
        );
        const containerClient = blobServiceClient.getContainerClient('tour');

        console.log(image, "imgae");
        for (let i = 0; i < image.length; i++) {
            const blobClient = containerClient.getBlobClient(image[i].name);
            const blockBlobClient = blobClient.getBlockBlobClient();
            const result = blockBlobClient.uploadBrowserData(image[i], {
                blockSize: 4 * 1024 * 1024,
                concurrency: 20,
                onProgress: ev => console.log(ev)
            });
            console.log(result, "result");
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,        // Enable automatic sliding
        autoplaySpeed: 3000
    };


    return (
        <div className="all-body">
            <div className="carousel-container">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="http://127.0.0.1:10000/devstoreaccount1/tour/tour/tourLogo.jpg" alt="Image 1" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="http://127.0.0.1:10000/devstoreaccount1/tour/tour/mahabalipuram1.jpg" alt="Image 2" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="http://127.0.0.1:10000/devstoreaccount1/tour/tour/newlogo.webp" alt="Image 3" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>

                <Input onChange={(event) => setImage(event.target.files)} type='file' variant="outlined" multiple />
                {/* <button onClick={submit}>submit</button>
                {/* <img src={`http://127.0.0.1:10000/devstoreaccount1/tour/'${image[0].name}`}/> */}
                <p>hhi </p>
                <img src={'http://127.0.0.1:10000/devstoreaccount1/tour/tour/tourLogo.jpg'} />
            </div>
        </div>
    )
}

export default AllPackages;