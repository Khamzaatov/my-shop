import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import CarouselBox from "./../../components/Carousel/CarouselBox";
import Block from "./../../components/Block/Block";
import main from "./main.module.sass";
import BlockMap from "../../components/Block/BlockMap";
import Map from './../../components/Map/Map';
import Footer from './../../components/Footer/Footer';
import Info from "../../components/Info/Info";


const Main = () => {  
  
  return (
    <>
      <CarouselBox />
      <div className={main.section}>
        <Info />
        <Block />
        <div className={main.prod_cat}>
          <div className={main.category}>
            <Category />
          </div>
          <div className={main.products}>
            <Product /> 
          </div>
        </div>
        <BlockMap />
        <Map />
        <Footer />
      </div>
    </>
  );
};

export default Main;
