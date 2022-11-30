import block from './block.module.sass'

const Block = () => {
    return (
        <div className={block.container} id='block'>
            Самые свежие новинки!
        </div>
    );
};

export default Block;