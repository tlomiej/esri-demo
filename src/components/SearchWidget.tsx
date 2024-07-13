// src/components/SearchWidget.tsx
import Widget from "@arcgis/core/widgets/Widget";
import { createRoot } from "react-dom/client";
import SearchComponents from "./SearchComponents";

export default class SearchWidget extends Widget {
  container: HTMLDivElement;

  constructor() {
    super();
    this.container = document.createElement("div");
    this.createReactComponent();
  }

  createReactComponent() {
    const root = createRoot(this.container!);
    //root.render(<SearchComponents />);
  }

  render() {
    return this.container;
  }
}
