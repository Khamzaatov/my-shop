import BlockAbout from '../../components/Block/BlockAbout';
import kross from '../../assets/images/kross1.jpg'
import nike from '../../assets/images/sneak2.jpg'
import about from './about.module.sass'
import Footer from '../../components/Footer/Footer';


const About = () => {
    return (
        <div className={about.container}>
             <BlockAbout />
             <div className={about.row1}>
                <div className={about.image}>
                    <img src={nike} alt="" />
                </div>
                <div className={about.info}>
                    <h3>Важно</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dignissimos distinctio illum excepturi neque placeat molestias quae amet odit quisquam, debitis quod pariatur fugiat reprehenderit. Accusantium est minus illo? Veritatis assumenda, accusamus voluptatibus laborum quaerat, a ut perspiciatis porro id iure consectetur architecto, recusandae repellat doloremque! Numquam, quidem eius? Delectus?</p>
                </div>
             </div>
             <div className={about.row2}>
                <div className={about.info}>
                    <h3>Важно!!!</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dignissimos distinctio illum excepturi neque placeat molestias quae amet odit quisquam, debitis quod pariatur fugiat reprehenderit. Accusantium est minus illo? Veritatis assumenda, accusamus voluptatibus laborum quaerat, a ut perspiciatis porro id iure consectetur architecto, recusandae repellat doloremque! Numquam, quidem eius? Delectus?</p>
                </div>
                <div className={about.image}>
                    <img src={kross} alt="" />
                </div>
             </div>
             <Footer />
        </div>
    );
};

export default About;