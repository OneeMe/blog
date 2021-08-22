
export class TreeNode {
  tag = ''
  children = {}
  levels = {
    黄金: 0,
    白银: 0,
    青铜: 0,
  }
  url;


  constructor(tag = 'root') {
    this.tag = tag;
  }

  addChild = (node) => {
    this.children[node.tag] = node;
  }

  addChildByPath = (path, level) => {
    const splitedPath = path.split('-')
    let current = this;
    splitedPath.forEach(pathSegment => {
      let child = current.children[pathSegment];
      if (!child) {
        child = new TreeNode(pathSegment, level);
        current.addChild(child);
      }
      child.levels[level] = child.levels[level] + 1;
      current = child;
    })
    current.url = `/tag/${path}`;
  }

  dump = () => {
    return {
      id: this.tag,
      ...this.levels,
      url: this.url,
      children: Object.values(this.children).map(e => e.dump()),
    };
  }
}
