import React from "react";
import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import InternalLink from "./linkInternal";

export interface LinkInternalOptions {
  HTMLAttributes: Record<string, any>;
  view: any;
}

export interface LinkInternalAttributes {
  pageId?: string;
  slugId?: string;
  pageTitle?: string;
  pageIcon?: string;
  url?: string;
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
      url: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-url"),
        renderHTML: (attributes) => ({
          "data-url": attributes.url,
        }),
      },
      pageTitle: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-title"),
        renderHTML: (attributes) => ({
          "data-title": attributes.pageTitle,
        }),
      },
      pageIcon: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-icon"),
        renderHTML: (attributes) => ({
          "data-icon":
            attributes.pageIcon !== null ? attributes.pageIcon : "",
        }),
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
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  // renderHTML({ node, HTMLAttributes }) {
  //   console.log("renderHTML", node.attrs, HTMLAttributes);
  //   return [
  //     "div",
  //     mergeAttributes(
  //       {
  //         "data-type": this.name,
  //       },
  //       this.options.HTMLAttributes,
  //       HTMLAttributes
  //     ),
  //     [
  //       "span",
  //       {
  //         class: "internal-link-icon",
  //       },
  //       `${HTMLAttributes["data-icon"]}`,
  //     ],
  //     [
  //       "a",
  //       {
  //         href: HTMLAttributes["data-url"],
  //         class: "internal-link",
  //         target: "_self",
  //       },
  //       `${HTMLAttributes["data-title"]}`,
  //     ],
  //   ];
  // },

  addNodeView() {
    return ReactNodeViewRenderer(InternalLink);
  },

  addCommands() {
    return {
      setLinkInternal:
        (attrs: LinkInternalAttributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "link-internal",
            attrs: attrs,
          });
        },
    };
  },
});

