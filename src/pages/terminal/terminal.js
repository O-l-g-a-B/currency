import { useState } from "react";
import Archive from "../components/archive/archive";
import Trading from "../components/trading/trading";
import "./terminal.css";

const TRADING_TAB_INDEX = 1;
const ARCHIVE_TAB_INDEX = 0;

const Terminal = () => {
  const [activeTabIndexTrading, setActiveTabIndex] =
    useState(TRADING_TAB_INDEX);

  const addIfSelectedClass = (indexToCheck) => {
    return indexToCheck === activeTabIndexTrading
      ? "terminal__tab_selected"
      : "";
  };

  return (
    <div className="terminal">
      <nav className="terminal__tab-group">
        <button
          className={`terminal__tab ${addIfSelectedClass(TRADING_TAB_INDEX)}`}
          onClick={() => setActiveTabIndex(TRADING_TAB_INDEX)}
        >
          Trading
        </button>
        <button
          className={`terminal__tab ${addIfSelectedClass(ARCHIVE_TAB_INDEX)}`}
          onClick={() => setActiveTabIndex(ARCHIVE_TAB_INDEX)}
        >
          Archive
        </button>
      </nav>
      {activeTabIndexTrading ? <Trading></Trading> : <Archive></Archive>}
    </div>
  );
};

export default Terminal;