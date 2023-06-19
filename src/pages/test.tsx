import type { NextPage } from "next";
import Head from "next/head";
import { SupabaseAdmin } from 'src/lib/supabase-admin';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";


interface CommentParams {
  id: string;
  page_id:string;
  created_at: string;
  updated_at: string;
  username: string;
  payload: string;
  reply_of?: string;
}

interface EditCommentParams {
  id: string;
  payload:string;
}

const TestComment: NextPage = () => {


  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<CommentParams[]>([]);
  const [editComment, setEditComment] = useState<EditCommentParams>({
    id: "",
    payload: "",
  });

  const onChangeEditComment = (event: ChangeEvent<HTMLInputElement>) => {
    const payload = event.target.value;
    setEditComment({ ...editComment, payload });
  };

  const confirmEdit = async () => {
    const { data, error } = await SupabaseAdmin
      .from("comments")
      .update({
        payload: editComment.payload,
      })
      .match({ id: editComment.id });
    if (!error && data) {
      window.alert("Edited Comment!");
    } else {
      window.alert(error?.message);
    }
  };

  const confirmDelete = async (id: string) => {
    const ok = window.confirm("Delete comment?");
    if (ok) {
      const { data, error } = await SupabaseAdmin.from("comments").delete().match({ id });
      if (!error && data) {
        window.alert("Deleted Comment :)");
      } else {
        window.alert(error?.message);
      }
    }
  };

  const getCommentList = async () => {
    const { data, error } = await SupabaseAdmin.from("comments").select("*");

    if (!error && data) {
      setCommentList(data);
    } else {
      setCommentList([]);
    }
  }

  useEffect(() => {
    getCommentList();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const commentValue = event.target.value;
    setComment(commentValue);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await SupabaseAdmin.from("comments").insert({
      username: "hoonwee@email.com",
      payload: comment,
    });

    if (!error && data) {
        // If succeed
      window.alert("Hooray!");
    } else {
        // If failed
      window.alert(error?.message);
    }
  };
  return (
    <div>
      <Head>
        <title>Comments Page</title>
      </Head>
            <div className="pt-36 flex justify-center">
        <div className="min-w-[600px]">
          <h1 className="text-4xl font-bold ">Comments</h1>
          <form onSubmit={onSubmit} className="mt-8 flex gap-8">
            <input
                onChange={onChange}
                type="text"
                placeholder="Add a comment"
                className="p-2 border-b focus:border-b-gray-700 w-full outline-none"
            />
            <button className="px-4 py-2 bg-green-500 rounded-lg text-white">Submit</button>
          </form>
          <div className="flex flex-col gap-4 pt-12">
            {commentList
              .sort((a, b) => {
                const aDate = new Date(a.created_at);
                const bDate = new Date(b.created_at);
                return +aDate - +bDate;
              })
              .map((comment) => (
                <div key={comment.id} className="border rounded-md p-4">
          <p className="font-semibold mb-2">{comment.username}</p>
          <div className="flex items-center gap-2 justify-between">
            {comment.id === editComment.id ? (
              <input
                type="text"
                value={editComment.payload}
                onChange={onChangeEditComment}
                className="pb-1 border-b w-full"
              />
            ) : (
              <p className="font-light">{comment.payload}</p>
            )}
            <div className="flex gap-2">
              {editComment.id === comment.id ? (
                <>
                  <button type="button" onClick={confirmEdit} className="text-green-500">
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditComment({ id: "", payload: "" })}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEditComment({ id: comment.id, payload: comment.payload })}
                    className="text-green-500"
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => confirmDelete(comment.id)} className="text-gray-700">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </div>
    </div>
  );
};

export default TestComment;