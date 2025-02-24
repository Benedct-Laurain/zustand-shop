import { useEffect, useState } from "react";
import useShopStore from "../stores/shopStore.ts";

function Message() {
  const { messageText, type } = useShopStore((state) => state.message);
  const setMessage = useShopStore((state) => state.setMessage);
  const [show, setShow] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
      setMessage(undefined);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  // If show is true this will be returned
  return <p className={`message ${type}`}>{messageText}</p>;
}

export default Message;
