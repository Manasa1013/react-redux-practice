import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editThePost } from "./postsSlice";
import "../../index.css";
import { useHistory } from "react-router";
import { selectPostForEdit } from "./postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const EditPost = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postID } = match.params;
  const editablePost = useSelector((state) => selectPostForEdit(state, postID));
  const [editPost, setEditPost] = useState(editablePost);
  const [editRequestStatus, setEditRequestStatus] = useState("idle");

  if (!editablePost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  const onSavePostClicked = async (editPost) => {
    try {
      if (editPost.title && editPost.caption && editRequestStatus === "idle") {
        setEditRequestStatus("pending");
        const editPostAction = await dispatch(editThePost(editPost));
        unwrapResult(editPostAction);
        history.push(`/posts/${postID}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditRequestStatus("idle");
    }
  };

  return (
    <div>
      <section className="edit-post--container">
        <label htmlFor="title-id">Title</label>
        <input
          type="text"
          id="title-id"
          placeholder="Edit title"
          className="input title"
          value={editPost.title}
          onChange={(e) =>
            setEditPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label htmlFor="caption-id">Caption</label>
        <textarea
          placeholder="Edit caption"
          id="caption-id"
          className="input caption"
          onChange={(e) =>
            setEditPost((prev) => ({ ...prev, caption: e.target.value }))
          }
          value={editPost.caption}
        ></textarea>
        <button
          type="button"
          className="button button__primary"
          onClick={() => {
            onSavePostClicked({ ...editPost, date: new Date().toISOString() });
          }}
        >
          Save
        </button>
      </section>
    </div>
  );
};
