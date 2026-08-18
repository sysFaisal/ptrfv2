export default function ThemeScript() {
  const code = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : prefersLight
          ? "light"
          : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}