import React from 'react'

const Carousel = () => {
    return (
        <section className="row">
            <div className="col-md-12">
                {/* a division containing carousel content */}
                <div className="carousel slide" id="mycarousel" data-bs-ride="carousel">
                    {/* division containing images */}
                    <div className="carousel-inner">
                        {/* div with image 1 */}
                        <div className="carousel-item active">
                            <img 
                                src="images/bsf fertilizers.jpg" 
                                alt="slide 1" 
                                width="1500px" 
                                height="500px" 
                            />
                        </div>
                        {/* div with image 2 */}
                        <div className="carousel-item">
                            <img 
                                src="images/dried.jpg" 
                                alt="slide 2" 
                                width="1500px" 
                                height="500px" 
                            />
                        </div>
                        {/* div with image 3 */}
                        <div className="carousel-item">
                            <img 
                                src="images/carousel nn.jpg" 
                                alt="slide 3" 
                                width="1500px" 
                                height="500px" 
                            />
                        </div>
                        {/* div with image 4 */}
                        <div className="carousel-item">
                            <img 
                                src="images/carousel mg 2.jpg" 
                                alt="slide 4" 
                                width="1500px" 
                                height="500px" 
                            />
                        </div>
                    </div>
                    {/* previous control */}
                    <a href="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-danger"></span>
                    </a>
                    {/* next control */}
                    <a href="#mycarousel" className="carousel-control-next" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-danger"></span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Carousel