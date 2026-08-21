import { reactive } from "vue";

const tree = {
  name: "michael-iordanou",
  type: "folder",
  label: "michael-iordanou",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "pages",
          type: "folder",
          children: [
            { name: "Home.vue", type: "file", route: "/" },
            { name: "AboutMe.vue", type: "file", route: "/about-me" },
            { name: "Projects.vue", type: "file", route: "/projects" },
            { name: "Services.vue", type: "file", route: "/services" },
            { name: "Contact.vue", type: "file", route: "/contact" },
          ],
        },
      ],
    },
    {
      name: "links",
      type: "folder",
      children: [
        { name: "github.url", type: "file", href: "https://github.com/EclipsedMango" },
        { name: "linkedin.url", type: "file", href: "https://www.linkedin.com/in/michael-iordanou-79126237a/" },
      ],
    },
  ],
};

function assignPaths(node, parentPath = "") {
  node.path = parentPath ? `${parentPath}/${node.name}` : node.name;
  node.children?.forEach((child) => assignPaths(child, node.path));
  return node;
}

export const fileTree = assignPaths(tree);

export const expandedPaths = reactive(new Set([
  fileTree.path,
  `${fileTree.path}/src`,
  `${fileTree.path}/src/pages`,
]));

export function isExpanded(path) {
  return expandedPaths.has(path);
}

export function toggleFolder(path) {
  if (expandedPaths.has(path)) {
    expandedPaths.delete(path);
  } else {
    expandedPaths.add(path);
  }
}

function findAncestors(node, route, trail = []) {
  if (node.route === route) {
    return trail;
  }

  for (const child of node.children ?? []) {
    const found = findAncestors(child, route, [...trail, node.path]);
    if (found) {
      return found;
    }
  }

  return null;
}

export function revealRoute(route) {
  findAncestors(fileTree, route)?.forEach((path) => expandedPaths.add(path));
}

export function fileExtension(name) {
  return name.slice(name.lastIndexOf(".") + 1);
}
