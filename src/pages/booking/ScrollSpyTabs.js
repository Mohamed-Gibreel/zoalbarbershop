import React from "react";
import throttle from "lodash/throttle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { fadeInUp, fadeOutDown } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

const tabHeight = 69;

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  fadeOutDown: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeOutDown, "fadeOutDown"),
  },
};
const StyledTabs = withStyles({
  tab: {
    minWidth: 600, // a number of your choice
    width: 600, // a number of your choice
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      maxWidth: 30,
      width: "100%",
      backgroundColor: "white",
    },
  },
})((props) => {
  return (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <div /> }}
      variant="scrollable"
      scrollButtons="auto"
    />
  );
});

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    height: tabHeight,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  indicator: {
    padding: theme.spacing(1),
  },
  demo2: {
    backgroundColor: "rgb(16,25,40)",
    color: "white",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
  },
}));

/******* This is the scroll spy magic */
/*
Credits: Material UI
Source: 
https://github.com/mui-org/material-ui/blob/404c2ba16816f5c7ab7d8b2caf6bbc3d2218b820/docs/src/modules/utils/textToHash.js
*/
const makeUnique = (hash, unique, i = 1) => {
  const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

  if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUnique(hash, unique, i + 1);
};

const textToHash = (text, unique = {}) => {
  return makeUnique(
    encodeURI(
      text
        .toLowerCase()
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, "")
        // eslint-disable-next-line no-useless-escape
        .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    ),
    unique
  );
};
const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) return undefined;

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

function ScrollSpyTabs(props) {
  const [activeState, setActiveState] = React.useState(null);
  const { tabsInScroll, selectedServices } = props;

  const [sum, setSum] = React.useState(0);

  let itemsServer = tabsInScroll.map((tab) => {
    const hash = textToHash(tab.text);
    return {
      icon: tab.icon || "",
      text: tab.text,
      component: tab.component,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8 +
            tabHeight
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
      if (window)
        window.scrollTo({
          top:
            document.getElementById(hash).getBoundingClientRect().top +
            window.pageYOffset -
            150,
          behavior: "smooth",
        });
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  const classes = useStyles();

  return (
    <div className="relative">
      {selectedServices.length > 0 ? (
        <StyleRoot>
          <div
            className="h-20 fixed w-screen bg-white bottom-0 border-t"
            style={styles.fadeInUp}
          >
            <div className="w-[92%] mx-auto flex h-full justify-between items-center">
              <div>
                <div className="text-secondary-grey text-lg">
                  {selectedServices.length}{" "}
                  {selectedServices.length == 1 ? "service" : "services"}
                </div>
                <div className="font-bold text-lg">
                  AED{" "}
                  {selectedServices.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.price;
                  }, 0)}
                </div>
              </div>
              <Link to="/select-staff">
                <button className="h-12 w-28 bg-black text-white rounded font-bold text-lg">
                  Book now
                </button>
              </Link>
            </div>
          </div>
        </StyleRoot>
      ) : (
        <StyleRoot>
          <div
            className="h-20 fixed w-screen bg-white bottom-0 border-t"
            style={{ ...styles.fadeOutDown, opacity: "0" }}
          >
            <div className="w-[92%] mx-auto flex h-full justify-between items-center">
              <div>
                <div className="text-secondary-grey text-lg">No services</div>
                <div className="font-bold text-lg">Free</div>
              </div>
              <div className="h-12 w-28 bg-slate-300 text-white rounded font-bold text-lg flex justify-center items-center">
                Book now
              </div>
            </div>
          </div>
        </StyleRoot>
      )}
      <div>
        <nav className={classes.demo2}>
          <div className="w-[90%] mx-auto flex items-center h-20 justify-between">
            <div className="flex items-center gap-x-4">
              <button>
                <FontAwesomeIcon icon={solid("chevron-left")} color={"white"} />
              </button>
              <span className="text-white font-bold text-xl">
                Select Services
              </span>
            </div>
            <button>
              <FontAwesomeIcon icon={solid("xmark")} size="xl" />
            </button>
          </div>
          <StyledTabs value={activeState ? activeState : itemsServer[0].hash}>
            {itemsServer.map((item2) => (
              <StyledTab
                key={item2.hash}
                label={item2.text}
                onClick={handleClick(item2.hash)}
                value={item2.hash}
              />
            ))}
          </StyledTabs>
        </nav>
        <div className="mx-auto w-[90%]">
          {itemsServer.map((item1) => (
            <article id={item1.hash} key={item1.text}>
              {item1.component}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollSpyTabs;
