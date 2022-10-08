import footer from './footer.module.sass'
import { BsInstagram } from 'react-icons/bs'
import { AiOutlineTwitter } from 'react-icons/ai'
import { FaFacebookF, FaYoutube, FaPinterestP } from 'react-icons/fa'


const Footer = () => {
    return (
        <div className={footer.container}>
            <div className={footer.list}>
                <div className={footer.block1}>
                    <h4>About</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Carrers</li>
                        <li>Corporate</li>
                        <li>Where to Buy</li>
                    </ul>
                </div>
                <div className={footer.block2}>
                <h4>Support</h4>
                    <ul>
                        <li>Contact</li>
                        <li>Returns</li>
                        <li>Warranty</li>
                        <li>Product</li>
                        <li>Help</li>
                    </ul>
                </div>
                <div className={footer.block3}>
                <h4>Legal</h4>
                    <ul>
                        <li>Privacy</li>
                        <li>Terms</li>
                        <li>Patents</li>
                    </ul>
                </div>
                <div className={footer.block4}>
                <h4>Other</h4>
                    <ul>
                        <li>Account</li>
                        <li>Affiate Proqram</li>
                    </ul>
                </div>
            </div>
            <div className={footer.social}>
                <div className={footer.icons}>
                    <BsInstagram />
                    <AiOutlineTwitter />
                    <FaFacebookF />
                    <FaPinterestP />
                    <FaYoutube />
                </div>
                <div className={footer.info}>
                    © 2017 Incase © All Rights Reserver Site bi SIDE-Commerce
                </div>
            </div>
        </div>
    );
};

export default Footer;