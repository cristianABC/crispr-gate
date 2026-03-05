import CrearFeedback from "./componentes/CrearFeedback";
import Visualization from "./components/visualization";
import MediaDevices from "./media_devices";

export default function GenomaIdPage() {
  return (
    <div>
      <Visualization></Visualization>
      <CrearFeedback></CrearFeedback>
      <MediaDevices></MediaDevices>
    </div >
  );
}