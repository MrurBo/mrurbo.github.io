// theme toggle (light/dark) persists
(function () {
	const key = "term-theme";
	const root = document.documentElement;
	const initial = localStorage.getItem(key);
	if (initial) root.setAttribute("data-theme", initial);
	const btn = document.getElementById("theme-toggle");
	if (!btn) return;
	btn.addEventListener("click", () => {
		const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
		if (next === "dark") root.removeAttribute("data-theme");
		else root.setAttribute("data-theme", "light");
		localStorage.setItem(key, next);
	});
})();
