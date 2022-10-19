import block from './block.module.sass'

const BlockAbout = () => {
    return (
        <div className={block.about} id='about'>
            <div className={block.title}>Качество товаров</div>
            <div className={block.paragraf}>Мы работаем над повышением качества товара — это наш ключевой приоритет во взаимоотношениях с клиентами</div>
            <button>ПОДРОБНЕЕ</button>
        </div>
    );
};

export default BlockAbout;