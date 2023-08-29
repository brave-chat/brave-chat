import AppRoutes from "./routes";
import { block } from "million/react";

const App = () => {
  return <AppRoutes />;
};

const AppBlock = block(App);

export default AppBlock;
