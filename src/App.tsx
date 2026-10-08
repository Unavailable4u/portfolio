import { Suspense } from "react";
import { useLayout } from "./layouts/layoutContext";
import LayoutProvider from "./layouts/LayoutProvider";

/** Renders the active style. Non-default styles are lazy, so show their background while they load. */
function ActiveLayout() {
  const { current } = useLayout();
  return (
    <Suspense fallback={<div aria-busy="true" className="min-h-screen" style={{ background: current.themeColor }} />}>
      <current.Component />
    </Suspense>
  );
}

function App() {
  return (
    <LayoutProvider>
      <ActiveLayout />
    </LayoutProvider>
  );
}

export default App;
