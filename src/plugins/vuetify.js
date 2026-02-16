/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// Extras
import { es } from "vuetify/locale";

// General Theme
const customUnamTheme = {
  dark: false,
  colors: {
    primary: "#00589c",
    secondary: "#004179",
    accent: "#c5911e",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "customUnamTheme",
    themes: {
      customUnamTheme,
    },
  },
  locale: {
    locale: "es",
    messages: { es },
  },
});
