import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  const handleGmail = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=shirisjbasjyal@gmail.com"
    );
  };

  return (
    <section className="footer mt-5">
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-body-secondary fs-2">
              © 2025 YY Electronics
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex fs-1">
            <li className="ms-5">
              <a
                className="text-body-secondary fs-1"
                href="https://www.facebook.com/shirish.bashyal.5"
                target="_blank"
              >
                <FaFacebook className="text-dark" />
              </a>
            </li>
            <li className="ms-5">
              <div
                onClick={handleGmail}
                className=" fs-1"
                style={{ cursor: "pointer" }}
              >
                <SiGmail />
              </div>
            </li>
            <li className="ms-5">
              <a
                className="text-body-secondary fs-1"
                href="https://github.com/shirishbashyalJS?tab=repositories"
                target="_blank"
              >
                <FaGithub className="text-dark" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
};
