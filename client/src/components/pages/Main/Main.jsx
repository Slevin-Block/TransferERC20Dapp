import Header from "../../blocs/Header/Header";
import Logs from "../../blocs/Logs/Logs";
import ControlPanel from "../../blocs/ControlPanel/ControlPanel";

function Main() {

    return (
        <div id="App">
            <Header />
            <ControlPanel/>
            <Logs/>
        </div>
    );
}

export default Main;
