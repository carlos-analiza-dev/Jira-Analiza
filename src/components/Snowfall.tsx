import React from "react";

const Snowfall = () => {
  return (
    <div aria-hidden="true">
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 200}vw`,
            animationDuration: `${Math.random() * 3 + 10}s`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
