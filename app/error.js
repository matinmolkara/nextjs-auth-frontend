"use client";
export default function Error({ error, reset }) {
  console.error("خطای رخ داده:", error); // برای debugging

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title text-danger">⚠️ خطایی رخ داده است</h2>
              <p className="card-text">
                متأسفانه مشکلی در بارگذاری صفحه رخ داده است.
              </p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => reset()}>
                  🔄 تلاش مجدد
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => (window.location.href = "/")}
                >
                  🏠 بازگشت به خانه
                </button>
              </div>
              {process.env.NODE_ENV === "development" && (
                <details className="mt-3">
                  <summary>جزئیات خطا (فقط در حالت توسعه)</summary>
                  <pre className="text-start mt-2 p-2 bg-light">
                    {error.message}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
