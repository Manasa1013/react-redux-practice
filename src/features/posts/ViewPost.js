import React from "react";
import { Link } from "react-router-dom";
import { Reactions } from "./Reactions";
import "../../../src/index.css";
import { PostAuthor } from "./PostAuthor";

export const ViewPost = ({ post }) => {
  return (
    <div>
      <div className="post-container">
        <article key={post.postID} className="post">
          <PostAuthor userID={post.userID} />
          <div className="caption"> {post.caption} </div>
          <Reactions post={post} />
          <div>
            <Link
              style={{ padding: "0.5rem" }}
              className="button__Link"
              to={`/editPost/${post.postID}`}
            >
              Edit
            </Link>

            <Link style={{ padding: "0.5rem" }} className="button__Link" to="/">
              Go back
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
