import { fileExtension } from "@/filetreedata.js";
import VueFileIcon from "@/components/Icons/VueFileIcon.vue";
import ShellFileIcon from "@/components/Icons/ShellFileIcon.vue";
import LinkFileIcon from "@/components/Icons/LinkFileIcon.vue";
import MarkdownFileIcon from "@/components/Icons/MarkdownFileIcon.vue";

const FILE_ICONS = {
  vue: VueFileIcon,
  sh: ShellFileIcon,
  url: LinkFileIcon,
  md: MarkdownFileIcon,
};

export function iconForFile(name) {
  return FILE_ICONS[fileExtension(name)] ?? MarkdownFileIcon;
}
