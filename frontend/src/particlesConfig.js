const particlesConfig = {
  particles: {
    number: {
      value: 60, // Adjust particle count
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#87cefa", // Light sky blue for particles
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
      random: true,
    },
    size: {
      value: 2,
      random: true,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#87cefa", // Light sky blue for connections
      opacity: 0.2,
      width: 1,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_opacity: 0.5,
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
};

export default particlesConfig;