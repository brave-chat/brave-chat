import Typed from "typed.js";
import { useEffect, useRef } from "react";

const TypedText = ({
  strings,
  startDelay,
  typeSpeed,
  backSpeed,
  backDelay,
  loop,
}) => {
  const element = useRef(null);

  useEffect(() => {
    const typed = new Typed(element.current, {
      strings: strings,
      startDelay: startDelay,
      typeSpeed: typeSpeed,
      backSpeed: backSpeed,
      backDelay: backDelay,
      loop: loop,
    });

    return () => {
      typed.destroy();
    };
  }, [strings, startDelay, typeSpeed, backSpeed, backDelay, loop]);

  return (
    <div>
      <span ref={element}></span>
    </div>
  );
};

export default TypedText;
