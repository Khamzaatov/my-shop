import block from './block.module.sass'

const BlockCart = () => {
    return (
        <div className={block.cart}>
            <div className={block.img}>Продукт</div>
            <div className={block.name}>Описание товара</div>
            <div className={block.price}>Цена</div>
            <div className={block.amount}>Количество</div>
            <div className={block.total}>Итого</div>
            <div className={block.remove}></div>
        </div>
    );
};

export default BlockCart;