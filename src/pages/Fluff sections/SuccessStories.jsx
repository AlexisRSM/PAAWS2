import { Row, Col, Button, Card, Image, Container } from "react-bootstrap";

function SuccessStories() {
    return ( 
        <div className="storiesPage">
            <div className="pageHeader storiesHeader">
                <h1>Success stories</h1>
                <p className="pageHeaderText">Read about some heartwarming success cases</p>
            </div>
            <div className="storiesDesc">
                <p>
                    At <strong style={{ color: "#6bffb8"}}>PAAWS</strong>, we believe that every animal deserves a second chance at life, love, and happiness. Through the generous support of our sponsors and adopters, countless cats and dogs have found their forever homes and experienced the care they so desperately needed. Below are just a few of the many heartwarming stories that show the incredible difference sponsorship and adoption can make. Meet three beautiful souls who were given a new lease on life thanks to people like you.
                </p>
            </div>
            <Row className="storiesRow">
                <Col className="storyOne">
                    <h1 className="StoryTitle" lg="4">
                        Bella's New Beginning
                    </h1>
                    <div>
                        <Image className="storyImg" src="https://dogster.com/wp-content/uploads/2024/03/golden-cocker-retriever-puppy.jpg" rounded />
                    </div>
                    <div className="storyText">
                        <p>
                            Bella, a sweet golden retriever mix, was found abandoned at a local park, scared and malnourished. She had clearly been on her own for a while and needed urgent medical attention. Thanks to our dedicated sponsors, Bella received the medical care, nutritious food, and love she desperately needed to heal.
                        </p>
                        <p>
                            It wasn’t long before a loving family found Bella through our adoption program. They instantly fell in love with her gentle nature and brought her into their home. Today, Bella is thriving in her new life, enjoying endless belly rubs, long walks, and playtime with her new best friend—an 8-year-old boy named Ethan. Bella went from living a life of uncertainty to becoming an irreplaceable part of a happy family.
                        </p>
                    </div>
                    <div className="">
                        <Image className="storyImg storyImgAfterOne" src="https://animalcorner.org/wp-content/uploads/2023/01/golden-retriever-mixes-1502701.png" rounded />
                    </div>
                        
                </Col>
                <Col className="storyTwo" lg="4">
                    <h1 className="StoryTitle storyTitleTwo">
                        Milo's Marvellous Miracle
                    </h1>
                    <div>
                        <Image className="storyImg " src=" https://st2.depositphotos.com/1428633/45840/i/450/depositphotos_458408070-stock-photo-little-tabby-domestic-kitten-home.jpg " rounded />
                    </div>
                    <div className="storyText">
                        <p>
                        Milo, a tiny tabby kitten, was born with a rare congenital defect that made it difficult for him to walk. Most shelters didn’t think Milo would find a home due to his special needs, but our sponsorship program made all the difference. Thanks to the generous support of our sponsors, Milo received physical therapy, special care, and a chance to grow strong.
                    </p>
                    <p>
                        One of our kind-hearted foster families fell in love with Milo's playful spirit and determination. After fostering him for several months, they knew they couldn't let him go and made the decision to adopt him permanently. Now, Milo is living his best life, running around the house with his furry siblings and showing that with a little help, even the smallest and most fragile of creatures can overcome great challenges.
                        </p>
                    </div>
                    <Image className="storyImg storyImgAfterTwo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVjueTxHJ-q-zVuaCv3Vj96jnLytaAIYSHw&s" rounded />
                </Col>
                <Col className="storyThree" lg="4">
                    <h1 className="StoryTitle storyTitleThree">
                        Luna's Second Chance
                    </h1>   
                    <div>
                        <Image className="storyImg" src="https://st2.depositphotos.com/3432847/5873/i/950/depositphotos_58738135-stock-photo-cute-black-cat-lying-on.jpg" rounded />
                    </div>                   
                    <div className="storyText">  
                        <p>
                            Luna, a shy black cat with striking green eyes, was overlooked in the shelter for months simply because of the color of her fur. Many potential adopters passed her by due to the superstitions associated with black cats. But Luna's luck changed when one of our wonderful sponsors decided to fund her care and share her story on social media.
                        </p>
                        <p>
                            Luna’s story caught the attention of a young couple who were drawn to her calm, loving demeanor. They decided to meet her, and it was love at first sight. Today, Luna is the queen of her new home, spending her days lounging in sunny spots and being pampered by her adoring family. Thanks to sponsorship and adoption, Luna was able to find the loving home she deserved after months of waiting.
                        </p>
                    </div>
                    <Image className="storyImg storyImgAfterThree" src="https://www.catster.com/wp-content/uploads/2023/11/black-bombay-cat-sitting-on-grass_xiclography-Pixabay.jpg" rounded />
                </Col>
            </Row>
            <div className="storiesConclusion">
                <p>
                    These stories reflect the profound impact that sponsorship and adoption can have on the lives of animals. With the help of caring individuals, animals like <strong style={{ color: "#ffa69e"}}>Bella</strong>, <strong style={{ color: "#ffa69e"}}>Milo</strong>, and <strong style={{ color: "#ffa69e"}}>Luna</strong> are given a second chance to find love, safety, and happiness. Ready to make a difference?
                </p>
            </div>
            <Button className="primaryButton cTABtn" href="/ourpets">Check out our pets</Button>
    </div>
    );
}

export default SuccessStories;