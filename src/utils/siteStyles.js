const colors = {
  offBlack: "#535353",
  offGrey: "#aaaaaa",
  offWhite: "#f7f7f7",
  warning: "#F4A867",
  error: "#F07285",

  darkerPurple: "#a16beb",
  primary: "#ad81e8",
  lighterPurple: "#E2D4F5",

  darkerBlue: "#4270DE",
  secondary: "#50a2f1",
  lighterBlue: "#A9C2F8"
};

const styles = {
  colors,

  global: {
    control: {
      border: {
        width: "2px",
        radius: "6px"
      },
      extend: {
        fontWeight: 600
      }
    },
    focus: {
      border: {
        color: "rgba(141, 83, 219, 0.7)"
      }
    }
  },

  font: {
    size: "18px",
    height: "20px"
  },

  button: {
    color: colors.offWhite,
    padding: {
      vertical: "7px"
    },
    primary: {
      color: colors.darkerPurple
    },
    border: {
      radius: "6px",
      color: colors.darkerPurple
    },
    extend: {
      fontWeight: 600
    }
  }
};

export default styles;
