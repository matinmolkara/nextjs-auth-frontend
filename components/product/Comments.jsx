import Link from "next/link";
import React from "react";
const Comments = ({ comments }) => {
  return (
    <div>
      <div id="comments" className="tabcontent">
        <h5>نظرات کاربران</h5>
        <h6 className="mt-3">برای افزودن نظر وارد حساب کاربری خود شوید.</h6>
        <div className="type-2 mt-3">
          <div className="bt-2">
            <button
              className="btn btn-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <span className="txt">ارسال دیدگاه جدید</span>
              <span className="round">
                <i className="bi bi-chevron-right"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="container mx-auto">
          {comments.map((comment, index) => (
            <div className="row comment-row" key={index}>
              <div className="col-sm-12 col-md-3">
                <div className="user_info_comment">
                  <p>{comment.user}</p>
                  <p>{comment.date}</p>
                </div>
              </div>
              <div className="col-sm-12 col-md-8 comment-col">
                <div className="nazar_wraper">
                  <div className="brand-cart-ranking-star">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${
                          i < comment.rating ? "bi-star-fill" : "bi-star"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <div className="matn_nazar">{comment.text}</div>
                  {comment.response && (
                    <div className="response">
                      <h6>پاسخ:</h6>
                      <p>{comment.response}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="row mt-4">
            <div className="pagination p9 mx-auto">
              <ul>
                {[...Array(6)].map((_, i) => (
                  <li key={i}>
                    <Link href={`#`}  className={i === 3 ? "is-active" : ""}>
                      {i + 1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
