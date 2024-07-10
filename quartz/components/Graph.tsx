import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
  removeTags: string[]
  showTags: boolean
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true,
    zoom: false,
    depth: 3,
    scale: 1.8,
    repelForce: 0.3,
    centerForce: 0.6,
    linkDistance: 25,
    fontSize: 0.4,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 2.5,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1.2,
    showTags: true,
    removeTags: [],
  },
}

export default ((opts?: GraphOptions) => {
  const Graph: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    return (
      <div class={classNames(displayClass, "graph")}>
        <div class="graph-outer">
          <div id="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
 

        </div>

        <div id="global-graph-outer">

          <div id="global-graph-container" data-cfg={JSON.stringify(globalGraph)}></div>

        </div>
      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script

  return Graph
}) satisfies QuartzComponentConstructor
