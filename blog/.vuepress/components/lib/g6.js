import G6 from "@antv/g6";

let isRegister = false;
const registerCardNode = () => {
  if (isRegister) {
    return;
  }
  isRegister = true;
  G6.registerNode("card-node", {
    draw: (cfg, group) => {
      const isNotLeaf = cfg.children && cfg.children.length > 0;
      const total = (cfg.青铜 || 0) + (cfg.白银 || 0) + (cfg.黄金 || 0);
      const descriptionArray = [
        `共计 ${total} 篇文章`,
        cfg.青铜 ? `🥉青铜阶段 ${cfg.青铜} 篇` : "",
        cfg.白银 ? `🥈白银阶段 ${cfg.白银} 篇` : "",
        cfg.黄金 ? `🥇黄金阶段 ${cfg.黄金} 篇` : "",
      ].filter(Boolean);
      const description = descriptionArray.join("\n");

      const r = 2;
      const color = "#5B8FF9";
      const w = 100;
      const h = 20 + 8 + descriptionArray.length * 10;

      // main box
      const shape = group.addShape("rect", {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w,
          height: h,
          stroke: color,
          radius: r,
          fill: "#fff",
          shadowColor: "#fff",
          shadowBlur: 20,
          shadowOffsetX: -1,
          shadowOffsetY: -1,
          cursor: isNotLeaf ? "auto" : "pointer",
        },
        name: "main-box",
      });
      // title box
      group.addShape("rect", {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w,
          height: 20,
          fill: color,
          radius: [r, r, 0, 0],
          cursor: isNotLeaf ? "auto" : "pointer",
        },
        name: "title-box",
      });
      // title text
      group.addShape("text", {
        attrs: {
          textBaseline: "top",
          x: -w / 2 + 4,
          y: -h / 2 + 4,
          lineHeight: 16,
          text: cfg.id,
          fill: "#fff",
          fontSize: 10,
          cursor: isNotLeaf ? "auto" : "pointer",
        },
        name: "title",
      });
      // descrription text
      group.addShape("text", {
        attrs: {
          textBaseline: "top",
          x: -w / 2 + 8,
          y: -h / 2 + 24,
          lineHeight: 10,
          text: description,
          fill: "grey",
          fontSize: 10,
          cursor: isNotLeaf ? "auto" : "pointer",
        },
        name: `description`,
      });

      return shape;
    },
    setState: (name, value, item) => {
      const group = item.getContainer();
      const mainBox = group.get("children")[0];
      if (name === "hover") {
        mainBox.attr("shadowColor", value ? "#5B8FF9" : "#fff");
      }
    },
  });
}

export const createGraph = (width, height) => {
  height = height ? height : width;
  registerCardNode();
  const graph = new G6.TreeGraph({
    container: "graph",
    minZoom: 0.4,
    width: width,
    height: height,
    modes: {
      default: [
        {
          type: 'drag-canvas',
          enableOptimize: true,
        },
        {
          type: 'zoom-canvas',
          enableOptimize: true,
          optimizeZoom: 0.01,
        },
      ],
    },
    layout: {
      type: "dendrogram",
      direction: "LR",
      nodeSep: 60,
      rankSep: 150,
    },
    nodeStateStyles: {
      hover: {},
    },
    defaultNode: {
      type: "card-node",
    },
    animate: false,
    defaultEdge: {
      type: "cubic",
      style: {
        endArrow: true,
        color: "rgb(154,196.251)",
      },
    },
  });

  graph.on("node:mouseenter", (evt) => {
    graph.setItemState(evt.item, "hover", true);
  });
  graph.on("node:mouseleave", (evt) => {
    graph.setItemState(evt.item, "hover", false);
  });
  graph.node((node) => {
    if (node.id === "root") {
      // 根节点为圆形
      return {
        ...node,
        type: "cubic",
        size: [16],
        label: '🤩',
      };
    }
    return node;
  });
  return graph;
};
