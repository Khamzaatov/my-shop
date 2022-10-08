import React from "react";

const Map = () => {
  return (
    <div>
      <iframe title="myFrame"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11609.983792255878!2d45.683685035969596!3d43.32481006614081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4051d13abc103637%3A0x8601f7fff1cac51f!2zSW50b2NvZGUgQ29kaW5nIEJvb3RjYW1wIOKAkyDRiNC60L7Qu9CwINC_0YDQvtCz0YDQsNC80LzQuNGA0L7QstCw0L3QuNGP!5e0!3m2!1sru!2sru!4v1656069243959!5m2!1sru!2sru"
        width="100%"
        height="700"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
