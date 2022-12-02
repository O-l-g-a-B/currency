import { useState } from "react";
import Archive from "../components/archive/archive";
import Trading from "../components/trading/trading";
import "./terminal.css";

const TRADING_TAB_INDEX = 1;
const ARCHIVE_TAB_INDEX = 0;

const Terminal = () => {
  const [activeTabIndexTrading, setActiveTabIndex] =
    useState(TRADING_TAB_INDEX);

  return (
    <div className="terminal">
      <nav className="terminal__tab-group">
        <button
          className="terminal__tab"
          onClick={() => setActiveTabIndex(TRADING_TAB_INDEX)}
        >
          Trading
        </button>
        <button
          className="terminal__tab"
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