export const colors = {
  offBlack: "#474747",
  offGrey: "#aaaaaa",
  offWhite: "#f7f7f7",
  warning: "#F4A867",
  error: "#F07285",

  darkerPurple: "#904feb",
  primary: "#a16beb",
  lighterPurple: "#E2D4F5",

  darkerBlue: "#4270DE",
  secondary: "#50a2f1",
  lighterBlue: "#A9C2F8"
};

export const app = {
  font: {
    family: "SF Pro Display",
    size: "18px",
    height: "20px"
  },
  border: {
    width: "2px",
    radius: "6px"
  }
};

const grommetStyles = {
  colors,
  app,

  global: {
    colors: {
      black: colors.offBlack,
      brand: colors.primary,
      focus: "rgba(141, 83, 219, 0.7)"
    },
    control: {
      border: {
        width: app.border.width,
        radius: app.border.radius
      },
      extend: {
        fontWeight: 600
      }
    },
    font: {
      family: app.font.family
    }
  },

  font: {
    size: app.font.size,
    height: app.font.height
  },

  button: {
    color: colors.offWhite,
    padding: {
      vertical: "7px"
    },
    primary: {
      color: colors.primary
    },
    border: {
      radius: app.border.radius,
      color: colors.primary
    },
    extend: {
      fontWeight: 600
    }
  }
};

export default grommetStyles;
