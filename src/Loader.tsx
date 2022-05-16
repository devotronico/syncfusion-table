import { useEffect } from "react";
import { createSpinner, showSpinner } from "@syncfusion/ej2-popups";
export default function Loader() {
  useEffect(() => {
    createSpinner({
      target: document.getElementById("container") as HTMLElement
    });
    showSpinner(document.getElementById("container")!);
  }, []);

  return (
    <div className="control-pane">
      <div
        id="container"
        className="control-section col-lg-12 spinner-target"
      ></div>
    </div>
  );
}
