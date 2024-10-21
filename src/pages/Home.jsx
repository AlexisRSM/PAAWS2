// landing page with welcoming + news carousel banner, and at least 3 highlights featuring "Our mission/About us", "Success stories" & "Get to know our animals"

import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';


function Home() {
    const bannerVideo = "src/images/videos/PAAWS animated banner.mp4";
    const handler = () => {
    bannerVideo.forEach((video, key) => {
        video.pause();
        video.currentTime = 0;
        video.load();
    })};


  return (
    <>
        <div>
            {/* <Carousel data-bs-theme="dark" className='homeBanner'>
                <Carousel.Item interval={8000}>
                    <video
                    className="d-block w-100"
                    src="src/images/videos/PAAWS animated banner.mp4"
                    alt="a cat and a dog looking to the front with text saying impossible to resist that face"
                    autoplay loop muted
                    />
                </Carousel.Item> */}
                <Carousel
                controls={false}
                fade={true}
                interval={8000}
                pause={false}
                className="homeBanner"
                onSlid={handler}
                >
                <Carousel.Item>
                    <video
                    className="bannerVideo d-block w-100"
                    src={bannerVideo}
                    autoPlay
                    /* loop */
                    muted
                    loading="lazy"
                    alt="dog's muzzle popping into the page with the text sniff sniff, smells like a good human, PAAWS, sponsor and adopt"
                    />
                </Carousel.Item>
{/*                 <Carousel.Item>
                    <img
                    className="slider-video"
                    src="/src/images/PAAWS banner_dark version.png"
                    loading="lazy"
                    alt="a cat and a dog looking to the front with text saying impossible to resist that face"
                    />
            </Carousel.Item> */}
            </Carousel>
        </div>

        <div className='homeSections'>
           <Image src="src\images\paws and drawings.png" alt="pawprints" className='pawprints' fluid />
            <div className="meetYourCompaawnion sectionText" >
                <h1 className='sectionTitle'>
                    <Link to="/ourpets" className='sectionTitle'>
                        <p>Meet your</p> <p>compawnion</p>
                    </Link>
                </h1>
            </div>

            <div className="aboutUs sectionText">
                <h1 className='sectionTitle'>
                    <Link to="/aboutus" className='sectionTitle'>
                            About Us
                    </Link>
                </h1>
            </div>

            <div className="successStories sectionText">
            <h1 className='sectionTitle'>
                    <Link to="/successstories" className='sectionTitle'>
                        <p>Success</p> <p>Stories</p>
                    </Link>
                </h1>
            </div>
        </div>
    </>
  );
}

export default Home;