import { Node } from "@tiptap/core";

export interface LinkInternalOptions {
  HTMLAttributes: Record<string, any>;
  view: any;
}

export interface LinkInternalAttributes {
  pageId?: string;
  getPageById?: (pageInput: Partial<any>) => Promise<any>;
  page?: any;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    linkInternal: {
      setLinkInternal: (attributes?: LinkInternalAttributes) => ReturnType;
    };
  }
}

export const LinkInternal = Node.create<LinkInternalOptions>({
  name: "link-internal",
  inline: false,
  group: "block",
  isolating: true,
  atom: true,
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      pageId: {
        default: "",
      },
      page: {
        default: "", // Define a default value if required
      },
      getPageById: {
        default: undefined,
      },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {},
      view: null,
    };
  },

  parseHTML() {
    console.log("parseHTML", this.editor);
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    console.log("renderHTML", node.attrs, HTMLAttributes);
    return ["div"];
  },

  addCommands() {
    return {
      setLinkInternal:
        (attrs) =>
        ({ commands }) => {
          const page = attrs.getPageById({
            pageId: attrs?.pageId,
          });
          console.log("API response", page);

          console.log("attributes", attrs);

          return commands.insertContent({
            type: "link-internal",
            attrs: {
              ...attrs,
              page: "this is a test",
            },
          });
        },
    };
  },
});
