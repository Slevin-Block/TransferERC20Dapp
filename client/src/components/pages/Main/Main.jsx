import Header from "../../blocs/Header/Header";
import Logs from "../../blocs/Logs/Logs";
import ControlPanel from "../../blocs/ControlPanel/ControlPanel";
import { useChange } from "./useChange";

function Main() {
    const [change, makeChange] = useChange()

    return (
        <div id="App">
            <Header />
            <ControlPanel update={makeChange}/>
            <Logs change={change}/>
        </div>
    );
}

export default Main;
