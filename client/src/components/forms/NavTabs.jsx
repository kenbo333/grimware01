import React from "react";

const NavTabs = (props) => {
  const { tabs, activeTab, setActiveTab } = props;

  return (
    <ul className="nav nav-tabs">
      {tabs.map((tab) => (
        <li className="nav-item" key={tab}>
          <button
            className={`nav-link ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NavTabs;
