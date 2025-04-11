// landing page with welcoming + news carousel banner, and at least 3 highlights featuring "Our mission/About us", "Success stories" & "Get to know our animals"

import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import bannerVideo from '../images/videos/PAAWS animated banner.mp4';
import pawprintsImage from '../images/paws and drawings.png';

function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handler = () => {
        if (!isMobile) {
            bannerVideo.forEach((video, key) => {
                video.pause();
                video.currentTime = 0;
                video.load();
            });
        }
    };

    return (
        <>
            <div>
                <Carousel
                    controls={false}
                    fade={true}
                    interval={8000}
                    pause={false}
                    className="homeBanner"
                    onSlid={handler}
                >
                    <Carousel.Item>
                        {isMobile ? (
                            // Imagem estática para dispositivos móveis
                            <img
                                className="d-block w-100 mobileBanner"
                                src="/src/images/PAAWS banner_dark version.png"
                                alt="PAAWS banner"
                            />
                        ) : (
                            // Vídeo para desktop
                            <video
                                className="bannerVideo d-block w-100"
                                src={bannerVideo}
                                autoPlay
                                muted
                                loading="lazy"
                                playsInline // Importante para iOS
                                alt="dog's muzzle popping into the page with the text sniff sniff, smells like a good human, PAAWS, sponsor and adopt"
                            />
                        )}
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className='homeSections'>
                <Image src={pawprintsImage} alt="pawprints" className='pawprints' fluid />
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