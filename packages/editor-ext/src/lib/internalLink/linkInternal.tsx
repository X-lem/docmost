import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Link } from "react-router-dom";

const InternalLink = ({ node }) => {
  return (
    <NodeViewWrapper>
      <span datatype="link-internal" className="internal-link-icon">
        {node.attrs.pageIcon}
      </span>
      <Link to={node.attrs.url} className="internal-link">
        {node.attrs.pageTitle}
      </Link>
    </NodeViewWrapper>
  );
};
export default InternalLink;
