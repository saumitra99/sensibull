import React from "react";
import { Spin } from "antd";
import "./styles.scss";

function PageLoader() {
  return (
    <div className="progress-wrapper">
      {Spin && (
        <div className="logo">
          <svg viewBox="0 0 79 53" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="nonzero" fill="none">
              <path
                d="M52.418 34.839l4.654 5.232-2.115 4.141-11.731-.565-.193-3.2 3.847.754 5.384.376.193-1.318-7.116-3.388zM9.186 21.624l-6.538 2.259-1.539-1.695-.77.189 1.732 3.2 8.461-2.259zM28.37 44.49l1.231 3.17 6.349 2.823.545 1.806h3.147l-1.609-3.37-5.577-3.013.193-9.788-13.847-4.141-.577 2.259z"
                fill="#EA4403"
              ></path>
              <path
                d="M52.457 52.29H49.38l-1.923-2.995L51.495 34.8l3.462-.188-4.188 14.413zM9.379 29.153v8.283l-2.116.188 2.885 14.683h3.27l-.385-2.26-1.539-8.47 7.334-7.497 1.32-1.35z"
                fill="#FF5000"
              ></path>
              <path
                d="M70.534 31.224v1.694l-6.442 6.306H61.11v-6.118l-8.693 2.11-13.808 3.349L9.378 29.34l-.192-7.717 14.808-7.341L50.918.165l19.616 19.012v7.34h8.077z"
                fill="#FF5000"
              ></path>
            </g>
          </svg>
        </div>
      )}
      <br />
      <Spin />
    </div>
  );
}

export default PageLoader;
