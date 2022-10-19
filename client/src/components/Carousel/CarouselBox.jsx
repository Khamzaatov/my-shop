import Carousel from "react-bootstrap/Carousel";
import sneak8 from "../../assets/sneak1.jpg";
import sneak5 from "../../assets/sneak5.jpg";
import sneak1 from "../../assets/sneak8.jpg";
import sneak9 from "../../assets/sneak9.jpg";
import nike from '../../assets/nike.jpg'
import carousel from "./carousel.module.sass";

const CarouselBox = () => {
  return (
    <>
      <Carousel className={carousel.container} id='carusel'>
        <Carousel.Item>
          <img
            style={{ height: "700px" }}
            className="d-block w-100"
            src={sneak1}
            alt=""
          />
          <Carousel.Caption>
            <h3>Приходите к нам!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              sunt natus fugiat harum necessitatibus aliquam.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "700px" }}
            className="d-block w-100"
            src={nike}
            alt=""
          />
          <Carousel.Caption>
            <h3>Приходите к нам!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              sunt natus fugiat harum necessitatibus aliquam.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "700px" }}
            className="d-block w-100"
            src={sneak5}
            alt=""
          />
          <Carousel.Caption>
            <h3>Приходите к нам!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              sunt natus fugiat harum necessitatibus aliquam.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "700px" }}
            className="d-block w-100"
            src={sneak8}
            alt=""
          />
          <Carousel.Caption>
            <h3>Приходите к нам!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              sunt natus fugiat harum necessitatibus aliquam.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ height: "700px" }}
            className="d-block w-100"
            src={sneak9}
            alt=""
          />
          <Carousel.Caption>
            <h3>Приходите к нам!</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              sunt natus fugiat harum necessitatibus aliquam.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselBox;
