import { React, useState } from "../deps.ts";
import ContainedButtons from "./ContainedButtons.tsx"
import FloatingActionButton from "./FloatingActionButton.tsx"
import PersistentDrawerRight from "./PersistentDrawerRight.tsx"


function App() {
  const [thing, setThing] = useState(0);
  return (
    <div className='app'>some {thing}
    <PersistentDrawerRight></PersistentDrawerRight>
    <FloatingActionButton></FloatingActionButton>
      <ContainedButtons></ContainedButtons>
    </div>
  );
}



export { App };
