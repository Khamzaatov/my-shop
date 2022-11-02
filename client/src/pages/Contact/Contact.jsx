import contact from "./contact.module.sass";

const Contact = () => {
  return (
    <div className={contact.container}>
      <h1>Если чем-то недовольны, пишите на почту или в телегу ;) </h1>
      <div className={contact.icon}>
        <a href="https://adamkhamzatov9522@gmail.com">
          <img
            style={{width: '160px'}}
            src="https://img.shields.io/badge/Gmail-20232A?style=for-the-badge&logo=gmail"
            alt=""
          />
        </a>
        <a href="http://telegram.me/Khamzatoff">
          <img
            src="https://img.shields.io/badge/Telegram-20232A?style=for-the-badge&logo=telegram"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default Contact;
