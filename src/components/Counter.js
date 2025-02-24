import useMainStore from "../stores/MainStore.ts";

function Counter() {
  const { count, inc } = useMainStore();
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  );
}

export default Counter;
